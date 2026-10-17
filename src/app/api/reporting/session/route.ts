import { NextResponse } from 'next/server';
import { reportingConfig, reportingConfigured, PRIVATE_HEADERS } from '@/lib/reporting';
import { REPORTING_COOKIE, allowedAdmin, reportingAdmins, reportingUser } from '@/lib/reporting-auth';
import { sameOrigin, cookieValue } from '@/lib/privacy';
import { rateLimit, clientIp } from '@/lib/rateLimit';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  return NextResponse.json({ configured: reportingConfigured() && reportingAdmins().length > 0, authenticated: Boolean(await reportingUser(req)) }, { headers: PRIVATE_HEADERS });
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403, headers: PRIVATE_HEADERS });
  if (!reportingConfigured() || !reportingAdmins().length) return NextResponse.json({ error: 'Website reporting has not been activated.' }, { status: 503, headers: PRIVATE_HEADERS });
  if (!rateLimit(`reporting-login:${clientIp(req)}`, 5, 300_000).ok) return NextResponse.json({ error: 'Too many attempts. Try again in five minutes.' }, { status: 429, headers: PRIVATE_HEADERS });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  const invalid = () => NextResponse.json({ error: 'Unable to sign in with these credentials.' }, { status: 401, headers: PRIVATE_HEADERS });
  if (!body || !allowedAdmin(body.email) || typeof body.password !== 'string' || body.password.length > 1024) return invalid();
  try {
    const { url, key } = reportingConfig();
    const response = await fetch(`${url}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: body.email.toLowerCase(), password: body.password }), cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!response.ok) return invalid();
    const auth = await response.json();
    if (!auth.user?.email_confirmed_at || !allowedAdmin(auth.user.email) || typeof auth.access_token !== 'string') return invalid();
    const result = NextResponse.json({ ok: true }, { headers: PRIVATE_HEADERS });
    result.cookies.set(REPORTING_COOKIE, auth.access_token, { httpOnly: true, secure: new URL(req.url).protocol === 'https:', sameSite: 'strict', path: '/api/reporting', maxAge: Math.min(Number(auth.expires_in) || 3600, 3600) });
    return result;
  } catch { return NextResponse.json({ error: 'Sign-in service unavailable. Try again shortly.' }, { status: 503, headers: PRIVATE_HEADERS }); }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403, headers: PRIVATE_HEADERS });
  const token = cookieValue(req.headers.get('cookie') || '', REPORTING_COOKIE);
  const { url, key } = reportingConfig();
  if (token && url && key) {
    try { await fetch(`${url}/auth/v1/logout?scope=local`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(5000) }); } catch {}
  }
  const response = NextResponse.json({ ok: true }, { headers: PRIVATE_HEADERS });
  response.cookies.set(REPORTING_COOKIE, '', { path: '/api/reporting', httpOnly: true, sameSite: 'strict', secure: new URL(req.url).protocol === 'https:', maxAge: 0 });
  return response;
}
