import { NextResponse } from 'next/server';
import { reportingUser } from '@/lib/reporting-auth';
import { reportingRpc, PRIVATE_HEADERS } from '@/lib/reporting';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  if (!await reportingUser(req)) return NextResponse.json({ error: 'Please sign in.' }, { status: 401, headers: PRIVATE_HEADERS });
  const days = Number(new URL(req.url).searchParams.get('days') || 30);
  if (![7, 30, 90].includes(days)) return NextResponse.json({ error: 'Choose 7, 30 or 90 days.' }, { status: 400, headers: PRIVATE_HEADERS });
  try { return NextResponse.json(await reportingRpc('web_reporting_summary', { p_days: days }), { headers: PRIVATE_HEADERS }); }
  catch { return NextResponse.json({ error: 'Reporting storage is unavailable. Check the database setup; missing data is not reported as zero.' }, { status: 503, headers: PRIVATE_HEADERS }); }
}
