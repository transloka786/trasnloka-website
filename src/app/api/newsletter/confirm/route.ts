import { NextResponse } from 'next/server';
import { reportingConfigured, reportingRpc, PRIVATE_HEADERS } from '@/lib/reporting';
import { validToken, tokenHash } from '@/lib/newsletter';
import { sameOrigin } from '@/lib/privacy';
import { rateLimit, clientIp } from '@/lib/rateLimit';
export const runtime = 'nodejs';
// Legacy email links must not silently confirm or claim success. Existing
// subscribers require a reviewed migration; their old tokens are not reused.
export function GET() { return NextResponse.json({ error: 'Please request a fresh confirmation link from the Updates page.' }, { status: 410, headers: PRIVATE_HEADERS }); }
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403, headers: PRIVATE_HEADERS });
  if (!rateLimit(`newsletter-confirm:${clientIp(req)}`,10,60_000).ok) return NextResponse.json({error:'Please try again shortly.'},{status:429});
  let body; try { body=await req.json(); } catch { return NextResponse.json({error:'Invalid request.'},{status:400}); }
  if (!body || !validToken(body.token)) return NextResponse.json({error:'Invalid confirmation link.'},{status:400,headers:PRIVATE_HEADERS});
  if (!reportingConfigured()) return NextResponse.json({error:'Subscriptions are not active yet.'},{status:503,headers:PRIVATE_HEADERS});
  try {
    const confirmed=await reportingRpc<boolean>('web_newsletter_confirm',{p_hash:tokenHash(body.token)});
    return NextResponse.json(confirmed ? {ok:true} : {error:'This link has expired or has already been used. If you already confirmed, no further action is needed.'},{status:confirmed?200:410,headers:PRIVATE_HEADERS});
  } catch { return NextResponse.json({error:'Confirmation is temporarily unavailable.'},{status:503,headers:PRIVATE_HEADERS}); }
}
