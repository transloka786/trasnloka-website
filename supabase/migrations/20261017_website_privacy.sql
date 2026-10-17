-- Apply to the reporting project, not blindly to an unknown production database.
-- New web_* objects only. No changes to recruitment, CVs or existing contact rows.
begin;
create table if not exists public.web_analytics_events (
  id bigint generated always as identity primary key,
  event text not null check (event in ('page_view','cta_click')),
  path text not null, label text not null default '', source text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists web_analytics_created on public.web_analytics_events(created_at);
create table if not exists public.web_consent_events (
  id bigint generated always as identity primary key,
  analytics boolean not null, policy_version text not null, decided_at timestamptz not null
);
create table if not exists public.web_daily_operations (
  day date primary key, enquiries bigint not null default 0, subscriptions bigint not null default 0
);
create table if not exists public.web_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(), email text unique,
  status text not null check(status in ('pending','subscribed','unsubscribed')),
  confirmation_hash text unique, confirmation_expires_at timestamptz,
  unsubscribe_hash text unique not null, policy_version text not null,
  created_at timestamptz not null default now(), confirmed_at timestamptz, unsubscribed_at timestamptz
);
alter table public.web_analytics_events enable row level security;
alter table public.web_consent_events enable row level security;
alter table public.web_daily_operations enable row level security;
alter table public.web_newsletter_subscribers enable row level security;
revoke all on public.web_analytics_events, public.web_consent_events, public.web_daily_operations, public.web_newsletter_subscribers from public, anon, authenticated;
grant all on public.web_analytics_events, public.web_consent_events, public.web_daily_operations, public.web_newsletter_subscribers to service_role;
grant usage, select on sequence public.web_analytics_events_id_seq, public.web_consent_events_id_seq to service_role;

create or replace function public.web_increment_enquiry() returns void language sql set search_path = '' as $$
  insert into public.web_daily_operations(day,enquiries) values ((now() at time zone 'Asia/Kolkata')::date,1)
  on conflict(day) do update set enquiries=public.web_daily_operations.enquiries+1;
$$;

create or replace function public.web_newsletter_register(p_email text, p_confirmation_hash text, p_unsubscribe_hash text, p_policy_version text)
returns boolean language plpgsql set search_path = '' as $$
declare result_id uuid;
begin
  insert into public.web_newsletter_subscribers(email,status,confirmation_hash,confirmation_expires_at,unsubscribe_hash,policy_version)
  values (p_email,'pending',p_confirmation_hash,now()+interval '24 hours',p_unsubscribe_hash,p_policy_version)
  on conflict(email) do update set confirmation_hash=excluded.confirmation_hash, confirmation_expires_at=excluded.confirmation_expires_at,
    unsubscribe_hash=excluded.unsubscribe_hash,policy_version=excluded.policy_version,created_at=now()
  where public.web_newsletter_subscribers.status='pending'
  returning id into result_id;
  return result_id is not null;
end $$;

create or replace function public.web_newsletter_confirm(p_hash text) returns boolean language plpgsql set search_path = '' as $$
declare result_id uuid;
begin
  update public.web_newsletter_subscribers set status='subscribed',confirmed_at=now(),confirmation_hash=null,confirmation_expires_at=null
  where confirmation_hash=p_hash and status='pending' and confirmation_expires_at>now() returning id into result_id;
  if result_id is null then return false; end if;
  insert into public.web_daily_operations(day,subscriptions) values ((now() at time zone 'Asia/Kolkata')::date,1)
  on conflict(day) do update set subscriptions=public.web_daily_operations.subscriptions+1;
  return true;
end $$;

create or replace function public.web_newsletter_unsubscribe(p_hash text) returns boolean language plpgsql set search_path = '' as $$
declare result_id uuid;
begin
  update public.web_newsletter_subscribers set status='unsubscribed',email=null,confirmation_hash=null,confirmation_expires_at=null,
    unsubscribed_at=coalesce(unsubscribed_at,now())
  where unsubscribe_hash=p_hash returning id into result_id;
  return result_id is not null;
end $$;

create or replace function public.web_reporting_summary(p_days integer default 30) returns jsonb language plpgsql set search_path = '' as $$
declare first_day date; last_day date; result jsonb;
begin
  if p_days not in (7,30,90) then raise exception 'Invalid reporting period'; end if;
  last_day := (now() at time zone 'Asia/Kolkata')::date;
  first_day := last_day - (p_days-1);
  with events as (
    select event,path,label,source,(created_at at time zone 'Asia/Kolkata')::date as day
    from public.web_analytics_events where created_at >= (first_day::timestamp at time zone 'Asia/Kolkata')
  ), ops as (select * from public.web_daily_operations where day between first_day and last_day),
  daily as (
    select d::date as day, (select count(*) from events e where e.day=d::date and e.event='page_view') as views,
      coalesce(o.enquiries,0) as enquiries,coalesce(o.subscriptions,0) as subscriptions
    from pg_catalog.generate_series(first_day::timestamp,last_day::timestamp,interval '1 day') d
    left join ops o on o.day=d::date
  )
  select jsonb_build_object(
    'days',p_days,'generatedAt',now(),
    'pageViews',(select count(*) from events where event='page_view'),
    'clicks',(select count(*) from events where event='cta_click'),
    'enquiries',(select coalesce(sum(enquiries),0) from ops),
    'subscriptions',(select coalesce(sum(subscriptions),0) from ops),
    'activeSubscribers',(select count(*) from public.web_newsletter_subscribers where status='subscribed'),
    'pages',coalesce((select jsonb_agg(t order by t.count desc,t.name) from (select path as name,count(*) as count from events where event='page_view' group by path) t),'[]'::jsonb),
    'sources',coalesce((select jsonb_agg(t order by t.count desc,t.name) from (select source as name,count(*) as count from events where event='page_view' group by source) t),'[]'::jsonb),
    'buttons',coalesce((select jsonb_agg(t order by t.count desc,t.name) from (select label as name,count(*) as count from events where event='cta_click' group by label) t),'[]'::jsonb),
    'daily',(select jsonb_agg(daily order by day) from daily)
  ) into result;
  return result;
end $$;

create or replace function public.web_privacy_cleanup() returns void language plpgsql set search_path = '' as $$
begin
  delete from public.web_analytics_events where created_at < now()-interval '90 days';
  delete from public.web_consent_events where decided_at < now()-interval '180 days';
  delete from public.web_daily_operations where day < (now() at time zone 'Asia/Kolkata')::date-interval '12 months';
  delete from public.web_newsletter_subscribers where (status='pending' and confirmation_expires_at < now())
    or (status='unsubscribed' and unsubscribed_at < now()-interval '30 days');
end $$;

revoke all on function public.web_increment_enquiry(), public.web_newsletter_register(text,text,text,text), public.web_newsletter_confirm(text), public.web_newsletter_unsubscribe(text), public.web_reporting_summary(integer), public.web_privacy_cleanup() from public, anon, authenticated;
grant execute on function public.web_increment_enquiry(), public.web_newsletter_register(text,text,text,text), public.web_newsletter_confirm(text), public.web_newsletter_unsubscribe(text), public.web_reporting_summary(integer), public.web_privacy_cleanup() to service_role;
commit;
