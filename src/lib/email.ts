const KEY = process.env.RESEND_API_KEY?.trim();
const TO = process.env.CONTACT_TO?.trim();
const FROM = process.env.CONTACT_FROM?.trim();

export const emailConfigured = Boolean(KEY && TO && FROM);

export type EmailDeliveryResult =
  | { ok: true; id?: string }
  | { skipped: true; reason: 'email_not_configured' };

export async function sendEmail(subject: string, text: string, replyTo?: string): Promise<EmailDeliveryResult> {
  if (!emailConfigured) return { skipped: true, reason: 'email_not_configured' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`resend: ${response.status} ${await response.text()}`);
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, id: typeof data?.id === 'string' ? data.id : undefined };
}
