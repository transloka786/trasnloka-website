import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';
import { emailConfigured, sendEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
    );
  }

  if (!emailConfigured) {
    console.error('Contact form unavailable: RESEND_API_KEY or CONTACT_FROM is missing.');
    return NextResponse.json(
      { error: 'The contact form is not connected yet. Please email hello@hellokritrna.com directly.' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const organization = String(body.organization || '').trim();
  const message = String(body.message || '').trim();
  const honeypot = String(body.website || '');

  if (honeypot) return NextResponse.json({ ok: true });
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: 'Please fill in your name, a valid email, and a message.' },
      { status: 400 },
    );
  }

  try {
    const delivery = await sendEmail({
      channel: 'general',
      subject: `[KritRNA] Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nOrganisation: ${organization || 'Not provided'}\n\n${message}`,
      replyTo: email,
    });

    if (!('ok' in delivery)) throw new Error('Email delivery was skipped despite configuration check.');
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email delivery failed:', error);
    return NextResponse.json(
      { error: 'Your message could not be delivered. Please email hello@hellokritrna.com directly.' },
      { status: 502 },
    );
  }
}
