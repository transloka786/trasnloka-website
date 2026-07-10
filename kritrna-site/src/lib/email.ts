const KEY = process.env.RESEND_API_KEY;
export const emailConfigured = !!KEY;

export async function sendEmail(subject: string, text: string, replyTo?: string) {
  if (!KEY) return { skipped: true };
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'KritRNA <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'hellokritrna@gmail.com'],
      reply_to: replyTo,
      subject,
      text,
    }),
  });
  if (!r.ok) throw new Error(`resend: ${r.status} ${await r.text()}`);
  return { ok: true };
}
