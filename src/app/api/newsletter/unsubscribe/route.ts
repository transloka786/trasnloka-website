import { NextResponse } from 'next/server';
import { reportingConfigured, reportingRpc, PRIVATE_HEADERS } from '@/lib/reporting';
import { validToken, tokenHash } from '@/lib/newsletter';
import { sameOrigin } from '@/lib/privacy';
import { rateLimit, clientIp } from '@/lib/rateLimit';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({error:'Invalid origin.'},{status:403,headers:PRIVATE_HEADERS});
  if (!rateLimit(`newsletter-unsubscribe:${clientIp(req)}`,10,60_000).ok) return NextResponse.json({error:'Please try again shortly.'},{status:429});
  let body; try { body=await req.json(); } catch { return NextResponse.json({error:'Invalid request.'},{status:400}); }
  if (!body || !validToken(body.token)) return NextResponse.json({error:'Invalid unsubscribe link.'},{status:400,headers:PRIVATE_HEADERS});
  if (!reportingConfigured()) return NextResponse.json({error:'Please email hello@hellokritrna.com to unsubscribe.'},{status:503,headers:PRIVATE_HEADERS});
  try {
    const removed=await reportingRpc<boolean>('web_newsletter_unsubscribe',{p_hash:tokenHash(body.token)});
    return NextResponse.json(removed?{ok:true}:{error:'This link is no longer valid. Email hello@hellokritrna.com if you still receive updates.'},{status:removed?200:410,headers:PRIVATE_HEADERS});
  } catch { return NextResponse.json({error:'Please email hello@hellokritrna.com to unsubscribe.'},{status:503,headers:PRIVATE_HEADERS}); }
}
