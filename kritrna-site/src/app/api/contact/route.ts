import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';
import { insertRow } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const organization = String(body.organization || '').trim();
  const message = String(body.message || '').trim();
  const honeypot = String(body.website || '');

  if (honeypot) return NextResponse.json({ ok: true }); // bot
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10)
    return NextResponse.json({ error: 'Please fill in your name, a valid email, and a message.' }, { status: 400 });

  const ipHash = ip.replace(/\d+$/, '***');
  try { await insertRow('contact_submissions', { name, email, organization, message, ip_hash: ipHash }); } catch (e) { console.error(e); }
  try {
    await sendEmail(`[KritRNA] Contact from ${name}`,
      `Name: ${name}\nEmail: ${email}\nOrg: ${organization}\n\n${message}`, email);
  } catch (e) { console.error(e); }

  return NextResponse.json({ ok: true });
}
