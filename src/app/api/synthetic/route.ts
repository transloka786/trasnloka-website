import { NextResponse } from 'next/server';
import { emailConfigured, sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const expected = process.env.SYNTHETIC_TEST_SECRET?.trim();
  const supplied = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  if (!expected || supplied !== expected) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!emailConfigured) return NextResponse.json({ error: 'Email is not configured' }, { status: 503 });
  try {
    const delivery = await sendEmail({
      channel: 'general',
      subject: '[KritRNA synthetic test] Website delivery path is operational',
      text: `Scheduled synthetic test completed at ${new Date().toISOString()}. This checks the same Resend delivery path used by public forms.`,
    });
    if (!('ok' in delivery)) throw new Error('Delivery skipped');
    return NextResponse.json({ ok: true, deliveryId: delivery.id });
  } catch (error) {
    console.error('synthetic test', error);
    return NextResponse.json({ error: 'Synthetic delivery failed' }, { status: 502 });
  }
}
