import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';
import { insertRow, uploadResume } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`apply:${ip}`, 4, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'Too many requests. Please try again shortly.' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });

  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const phone = String(form.get('phone') || '').trim();
  const role = String(form.get('role') || '').trim();
  const link = String(form.get('link') || '').trim();
  const answer = String(form.get('answer') || '').trim();
  const honeypot = String(form.get('website') || '');
  const file = form.get('resume') as File | null;

  if (honeypot) return NextResponse.json({ ok: true });
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !role || answer.length < 10)
    return NextResponse.json({ error: 'Please complete name, valid email, role, and your answer.' }, { status: 400 });

  let resumePath = '';
  if (file && file.size) {
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Résumé must be under 5 MB.' }, { status: 400 });
    if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Please upload a PDF.' }, { status: 400 });
    const safe = `${Date.now()}-${name.replace(/[^a-z0-9]/gi, '_').slice(0, 40)}.pdf`;
    try { const r = await uploadResume(safe, await file.arrayBuffer(), 'application/pdf'); resumePath = (r as any).path || ''; } catch (e) { console.error(e); }
  }

  const ipHash = ip.replace(/\d+$/, '***');
  try { await insertRow('applications', { role, name, email, phone, link, answer, resume_path: resumePath, ip_hash: ipHash, status: 'new' }); } catch (e) { console.error(e); }
  try {
    await sendEmail(`[KritRNA] Application — ${role} — ${name}`,
      `Role: ${role}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nLink: ${link}\nRésumé: ${resumePath || 'not stored (storage not configured)'}\n\n${answer}`, email);
  } catch (e) { console.error(e); }

  return NextResponse.json({ ok: true });
}
