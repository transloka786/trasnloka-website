const KEY = process.env.RESEND_API_KEY?.trim();
const FROM = process.env.CONTACT_FROM?.trim();

const GENERAL_TO = process.env.CONTACT_TO?.trim() || 'hello@hellokritrna.com';
const CAREERS_TO = process.env.CAREERS_TO?.trim() || 'careers@hellokritrna.com';
const ADMIN_BCC = process.env.ADMIN_BCC?.trim() || 'hellokritrna@gmail.com';

export const emailConfigured = Boolean(KEY && FROM);

export type EmailChannel = 'general' | 'careers';

export type EmailDeliveryResult =
  | { ok: true; id?: string }
  | { skipped: true; reason: 'email_not_configured' };

function recipientFor(channel: EmailChannel) {
  return channel === 'careers' ? CAREERS_TO : GENERAL_TO;
}

export async function sendEmail({
  channel,
  subject,
  text,
  replyTo,
}: {
  channel: EmailChannel;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<EmailDeliveryResult> {
  if (!emailConfigured) return { skipped: true, reason: 'email_not_configured' };

  const to = recipientFor(channel);
  const bcc = ADMIN_BCC && ADMIN_BCC.toLowerCase() !== to.toLowerCase() ? [ADMIN_BCC] : undefined;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      bcc,
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
