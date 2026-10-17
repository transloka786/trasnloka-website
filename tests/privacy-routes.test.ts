import test from 'node:test';
import assert from 'node:assert/strict';
import { POST as analytics } from '../src/app/api/analytics/route';
import { POST as preferences } from '../src/app/api/privacy/preferences/route';
import { GET as summary } from '../src/app/api/reporting/summary/route';
import { POST as login } from '../src/app/api/reporting/session/route';
import { POST as subscribe } from '../src/app/api/newsletter/route';
import { POST as confirm, GET as legacyConfirm } from '../src/app/api/newsletter/confirm/route';
import { POST as unsubscribe } from '../src/app/api/newsletter/unsubscribe/route';
import { CONSENT_COOKIE, CONSENT_MAX_AGE, encodePreference, parsePreference } from '../src/lib/privacy';

const originalFetch=globalThis.fetch;
const writes: {url:string;body:any}[]=[];
let user:any={email:'owner@example.test',email_confirmed_at:'2026-10-17'};
let rpcResult:unknown=false;
let failStorage=false;
function request(path:string,body:unknown={},cookie='',origin='https://example.test') {
  return new Request(`https://example.test${path}`,{method:'POST',headers:{origin,'content-type':'application/json',cookie},body:JSON.stringify(body)});
}
function optIn() { return `${CONSENT_COOKIE}=${encodePreference(true)}`; }

test.before(()=>{
  process.env.REPORTING_SUPABASE_URL='https://database.example.test';process.env.REPORTING_SUPABASE_SERVICE_ROLE_KEY='test-key';process.env.WEBSITE_REPORTING_ADMINS='owner@example.test';
  globalThis.fetch=async(input,init)=>{
    const url=String(input);
    if(url.endsWith('/auth/v1/user'))return Response.json(user);
    if(url.includes('/auth/v1/token'))return Response.json({user,access_token:'test-access-token',expires_in:3600});
    if(failStorage)return new Response('',{status:503});
    writes.push({url,body:init?.body?JSON.parse(String(init.body)):null});
    return url.includes('/rpc/')?Response.json(rpcResult):new Response(null,{status:201});
  };
});
test.after(()=>{globalThis.fetch=originalFetch;});
test.beforeEach(()=>{writes.length=0;failStorage=false;user={email:'owner@example.test',email_confirmed_at:'2026-10-17'};rpcResult=false;});

test('first visit, refusal, expired choice and cross-origin requests never write analytics',async()=>{
  for(const cookie of ['',`${CONSENT_COOKIE}=${encodePreference(false)}`,`${CONSENT_COOKIE}=${encodePreference(true,Date.now()-(CONSENT_MAX_AGE+1)*1000)}`]) {
    assert.equal((await analytics(request('/api/analytics',{event:'page_view',path:'/'},cookie))).status,204);
  }
  await analytics(request('/api/analytics',{event:'page_view',path:'/'},optIn(),'https://other.test'));
  assert.equal(writes.length,0);
});
test('accepted analytics stores only allowed fields and excludes form/token/account paths',async()=>{
  await analytics(request('/api/analytics',{event:'page_view',path:'/science',source:'LinkedIn',email:'private@example.test',message:'secret'},optIn()));
  assert.deepEqual(writes[0].body,{event:'page_view',path:'/science',label:'',source:'LinkedIn'});
  for(const path of ['/admin/website','/newsletter/confirm','/search?q=medical','/unknown/person'])await analytics(request('/api/analytics',{event:'page_view',path},optIn()));
  await analytics(request('/api/analytics',{event:'form_submit',path:'/partners'},optIn()));
  await analytics(request('/api/analytics',{event:'cta_click',path:'/contact',label:'someone@example.test'},optIn()));
  assert.equal(writes.length,1);
});
test('withdrawal cookie prevents subsequent collection; preference receipt contains no IP or identity',async()=>{
  const response=await preferences(request('/api/privacy/preferences',{analytics:false},optIn()));
  const cookie=response.headers.get('set-cookie')!.split(';')[0];
  assert.equal(parsePreference(cookie.split('=')[1])?.analytics,false);
  assert.deepEqual(Object.keys(writes[0].body).sort(),['analytics','decided_at','policy_version']);
  const before=writes.length;
  await analytics(request('/api/analytics',{event:'page_view',path:'/'},cookie));assert.equal(writes.length,before);
});
test('failed acceptance remains denied; refusal still saves during a database outage',async()=>{
  failStorage=true;
  const accept=await preferences(request('/api/privacy/preferences',{analytics:true}));assert.equal(accept.status,503);assert.equal(accept.headers.get('set-cookie'),null);
  const reject=await preferences(request('/api/privacy/preferences',{analytics:false}));assert.equal(reject.status,200);assert.match(reject.headers.get('set-cookie')!,/\.no\./);
});
test('private reports require a verified, confirmed allowlisted user and never cache',async()=>{
  assert.equal((await summary(new Request('https://example.test/api/reporting/summary'))).status,401);
  const req=new Request('https://example.test/api/reporting/summary?days=30',{headers:{cookie:'kritrna_reporting_session=token'}});
  user={email:'stranger@example.test',email_confirmed_at:'yes'};assert.equal((await summary(req)).status,401);
  user={email:'owner@example.test'};assert.equal((await summary(req)).status,401);
  user={email:'owner@example.test',email_confirmed_at:'yes'};rpcResult={pageViews:4};const good=await summary(req);assert.equal(good.status,200);assert.match(good.headers.get('cache-control')!,/no-store/);assert.deepEqual(await good.json(),{pageViews:4});
});
test('login sets an HttpOnly restricted-path cookie and checks origin',async()=>{
  assert.equal((await login(request('/api/reporting/session',{email:'owner@example.test',password:'password'},'','https://other.test'))).status,403);
  const res=await login(request('/api/reporting/session',{email:'owner@example.test',password:'password'}));
  assert.equal(res.status,200);const cookie=res.headers.get('set-cookie')!;assert.match(cookie,/HttpOnly/);assert.match(cookie,/Secure/);assert.match(cookie,/SameSite=strict/i);assert.match(cookie,/Path=\/api\/reporting/);
});
test('newsletter requires separate consent; expired and reused tokens do not report success',async()=>{
  assert.equal((await subscribe(request('/api/newsletter',{email:'person@example.test'}))).status,400);
  assert.equal(legacyConfirm().status,410);
  assert.equal((await confirm(request('/api/newsletter/confirm',{token:'a'.repeat(64)}))).status,410);
  rpcResult=true;assert.equal((await confirm(request('/api/newsletter/confirm',{token:'b'.repeat(64)}))).status,200);
  assert.notEqual(writes.at(-1)!.body.p_hash,'b'.repeat(64));
  assert.equal((await unsubscribe(request('/api/newsletter/unsubscribe',{token:'c'.repeat(64)}))).status,200);
});
test('malformed preference and missing reporting configuration fail closed',async()=>{
  assert.equal((await preferences(request('/api/privacy/preferences',{analytics:'yes'}))).status,400);
  const key=process.env.REPORTING_SUPABASE_SERVICE_ROLE_KEY;delete process.env.REPORTING_SUPABASE_SERVICE_ROLE_KEY;
  try {await analytics(request('/api/analytics',{event:'page_view',path:'/'},optIn()));assert.equal(writes.length,0);assert.equal((await subscribe(request('/api/newsletter',{email:'p@example.test',consent:true}))).status,503);}finally{process.env.REPORTING_SUPABASE_SERVICE_ROLE_KEY=key;}
});
