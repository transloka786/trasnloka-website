import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

test('reporting SQL: restricted access, confirmation transitions, counts and retention',async()=>{
  const db=new PGlite();
  try {
    await db.exec('create role anon; create role authenticated; create role service_role with bypassrls;');
    await db.exec(await readFile('supabase/migrations/20261017_website_privacy.sql','utf8'));
    // Rerunning the migration must not discard data or fail.
    await db.exec(await readFile('supabase/migrations/20261017_website_privacy.sql','utf8'));
    await db.exec('set role anon;');
    await assert.rejects(()=>db.query('select * from public.web_newsletter_subscribers'),/permission denied/);
    await assert.rejects(()=>db.query('select public.web_reporting_summary(30)'),/permission denied/);
    await db.exec('reset role; set role service_role;');
    const register=await db.query<{ok:boolean}>("select public.web_newsletter_register('person@example.test','confirmation','unsubscribe','2026-10-17') ok");assert.equal(register.rows[0].ok,true);
    const c1=await db.query<{ok:boolean}>("select public.web_newsletter_confirm('confirmation') ok");assert.equal(c1.rows[0].ok,true);
    const c2=await db.query<{ok:boolean}>("select public.web_newsletter_confirm('confirmation') ok");assert.equal(c2.rows[0].ok,false);
    const duplicate=await db.query<{ok:boolean}>("select public.web_newsletter_register('person@example.test','new','newunsub','2026-10-17') ok");assert.equal(duplicate.rows[0].ok,false);
    await db.exec("select public.web_increment_enquiry(); insert into public.web_analytics_events(event,path,source) values('page_view','/science','LinkedIn');");
    const result=await db.query<{report:any}>('select public.web_reporting_summary(7) report');const report=result.rows[0].report;
    assert.equal(report.pageViews,1);assert.equal(report.enquiries,1);assert.equal(report.subscriptions,1);assert.equal(report.activeSubscribers,1);assert.equal(report.daily.length,7);assert.equal(JSON.stringify(report).includes('person@example.test'),false);
    for(let i=0;i<2;i++)assert.equal((await db.query<{ok:boolean}>("select public.web_newsletter_unsubscribe('unsubscribe') ok")).rows[0].ok,true);
    assert.equal((await db.query<{email:null}>('select email from public.web_newsletter_subscribers')).rows[0].email,null);
    await db.exec("select public.web_newsletter_register('expired@example.test','expired','expiredu','2026-10-17'); update public.web_newsletter_subscribers set confirmation_expires_at=now()-interval '1 hour' where email='expired@example.test';");
    assert.equal((await db.query<{ok:boolean}>("select public.web_newsletter_confirm('expired') ok")).rows[0].ok,false);
    await db.exec("insert into public.web_analytics_events(event,path,created_at) values('page_view','/',now()-interval '91 days'); insert into public.web_consent_events(analytics,policy_version,decided_at) values(true,'old',now()-interval '181 days'); select public.web_privacy_cleanup();");
    assert.equal((await db.query<{count:number}>('select count(*)::int count from public.web_analytics_events')).rows[0].count,1);
    assert.equal((await db.query<{count:number}>('select count(*)::int count from public.web_consent_events')).rows[0].count,0);
    assert.equal((await db.query<{count:number}>("select count(*)::int count from public.web_newsletter_subscribers where status='pending'")).rows[0].count,0);
  }finally{await db.close();}
});
