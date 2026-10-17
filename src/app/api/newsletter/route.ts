import { NextResponse } from 'next/server';
import { reportingConfigured, reportingRpc, PRIVATE_HEADERS } from '@/lib/reporting';
import { emailConfigured, sendEmail } from '@/lib/email';
import { clientIp, rateLimit } from '@/lib/rateLimit';
import { POLICY_VERSION, sameOrigin } from '@/lib/privacy';
import { newsletterToken, tokenHash } from '@/lib/newsletter';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403, headers: PRIVATE_HEADERS });
  if (!rateLimit(`newsletter:${clientIp(req)}`,4,60_000).ok) return NextResponse.json({error:'Too many requests.'},{status:429});
  let body; try { body=await req.json(); } catch { return NextResponse.json({error:'Invalid request.'},{status:400}); }
  if (!body || typeof body.email !== 'string' || body.consent !== true) return NextResponse.json({ error: 'Please agree to receive company and research updates.' }, { status: 400 });
  const email=body.email.trim().toLowerCase();
  if (email.length>254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({error:'Enter a valid email address.'},{status:400});
  if (!reportingConfigured() || !emailConfigured) return NextResponse.json({error:'Subscriptions are not active yet. Please try again later.'},{status:503,headers:PRIVATE_HEADERS});
  const confirmation=newsletterToken(), unsubscribe=newsletterToken();
  try {
    const pending=await reportingRpc<boolean>('web_newsletter_register',{ p_email:email,p_confirmation_hash:tokenHash(confirmation),p_unsubscribe_hash:tokenHash(unsubscribe),p_policy_version:POLICY_VERSION });
    if (pending) {
      const base=(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hellokritrna.com').replace(/\/$/,'');
      const delivery=await sendEmail({channel:'direct',to:email,bccAdmin:false,subject:'Confirm KritRNA updates',text:`You requested research and company updates from KritRNA / Transloka Bio Pvt. Ltd.\n\nConfirm within 24 hours: ${base}/newsletter/confirm#token=${confirmation}\n\nCancel this request or unsubscribe: ${base}/newsletter/unsubscribe#token=${unsubscribe}\n\nIf you did not request this, you can ignore the message. We will not subscribe you without confirmation. Privacy: ${base}/privacy`});
      if (!('ok' in delivery)) throw new Error('Delivery unavailable');
    }
    return NextResponse.json({ok:true},{headers:PRIVATE_HEADERS});
  } catch { console.error('Newsletter signup unavailable'); return NextResponse.json({error:'Subscription could not be completed. Please try again.'},{status:502,headers:PRIVATE_HEADERS}); }
}
