const KEY = process.env.RESEND_API_KEY?.trim();
const FROM = process.env.CONTACT_FROM?.trim();
const GENERAL_TO = process.env.CONTACT_TO?.trim() || 'hello@hellokritrna.com';
const CAREERS_TO = process.env.CAREERS_TO?.trim() || 'careers@hellokritrna.com';
const ADMIN_BCC = process.env.ADMIN_BCC?.trim() || 'hellokritrna@gmail.com';

export const emailConfigured = Boolean(KEY && FROM);
export type EmailChannel = 'general' | 'careers' | 'direct';
export type EmailAttachment = { filename: string; content: string };
export type EmailDeliveryResult = { ok: true; id?: string } | { skipped: true; reason: 'email_not_configured' };

function recipientFor(channel: EmailChannel, direct?: string) {
  if (channel === 'direct') return direct || GENERAL_TO;
  return channel === 'careers' ? CAREERS_TO : GENERAL_TO;
}

export async function sendEmail({ channel, subject, text, replyTo, to, attachments, bccAdmin = true }: {
  channel: EmailChannel; subject: string; text: string; replyTo?: string; to?: string; attachments?: EmailAttachment[]; bccAdmin?: boolean;
}): Promise<EmailDeliveryResult> {
  if (!emailConfigured) return { skipped: true, reason: 'email_not_configured' };
  const recipient = recipientFor(channel, to);
  const bcc = bccAdmin && ADMIN_BCC && ADMIN_BCC.toLowerCase() !== recipient.toLowerCase() ? [ADMIN_BCC] : undefined;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [recipient], bcc, reply_to: replyTo, subject, text, attachments }),
  });
  if (!response.ok) throw new Error(`resend: ${response.status} ${await response.text()}`);
  const data = await response.json().catch(() => ({}));
  return { ok: true, id: typeof data?.id === 'string' ? data.id : undefined };
}
