-- Required activation gate: enable Supabase Cron (pg_cron), then apply this file.
-- Verify the active job and check cron.job_run_details after the first run.
begin;
create extension if not exists pg_cron with schema pg_catalog;
select cron.schedule('kritrna-website-retention', '17 2 * * *', 'select public.web_privacy_cleanup();');
commit;
