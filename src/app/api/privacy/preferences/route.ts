import { NextResponse } from 'next/server';
import { CONSENT_COOKIE, CONSENT_MAX_AGE, POLICY_VERSION, encodePreference, sameOrigin } from '@/lib/privacy';
import { reportingConfigured, reportingInsert, PRIVATE_HEADERS } from '@/lib/reporting';
import { clientIp, rateLimit } from '@/lib/rateLimit';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403, headers: PRIVATE_HEADERS });
  if (!rateLimit(`privacy:${clientIp(req)}`, 30, 60_000).ok) return NextResponse.json({ error: 'Please try again shortly.' }, { status: 429, headers: PRIVATE_HEADERS });
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (!body || typeof body.analytics !== 'boolean') return NextResponse.json({ error: 'Choose an analytics preference.' }, { status: 400 });
  const now = Date.now();
  let receiptStored = false;
  if (reportingConfigured()) {
    try { await reportingInsert('web_consent_events', { analytics: body.analytics, policy_version: POLICY_VERSION, decided_at: new Date(now).toISOString() }); receiptStored = true; }
    catch {
      if (body.analytics) return NextResponse.json({ error: 'Could not save permission. Analytics remains off; please try again.' }, { status: 503, headers: PRIVATE_HEADERS });
    }
  }
  const response = NextResponse.json({ ok: true, receiptStored }, { headers: PRIVATE_HEADERS });
  response.cookies.set(CONSENT_COOKIE, encodePreference(body.analytics, now), { path: '/', sameSite: 'lax', secure: new URL(req.url).protocol === 'https:', maxAge: CONSENT_MAX_AGE });
  return response;
}
