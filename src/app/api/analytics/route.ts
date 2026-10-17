import { NextResponse } from 'next/server';
import { cleanAnalytics, cookieValue, parsePreference, sameOrigin } from '@/lib/privacy';
import { reportingConfigured, reportingInsert, PRIVATE_HEADERS } from '@/lib/reporting';
import { clientIp, rateLimit } from '@/lib/rateLimit';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  const empty = () => new NextResponse(null, { status: 204, headers: PRIVATE_HEADERS });
  if (!sameOrigin(req) || !parsePreference(cookieValue(req.headers.get('cookie') || ''))?.analytics || !reportingConfigured()) return empty();
  if (!rateLimit(`analytics:${clientIp(req)}`, 60, 60_000).ok) return empty();
  let body;
  try { body = await req.json(); } catch { return empty(); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return empty();
  const event = cleanAnalytics(body);
  if (!event) return empty();
  try { await reportingInsert('web_analytics_events', event); } catch { console.error('Analytics storage unavailable'); }
  return empty();
}
