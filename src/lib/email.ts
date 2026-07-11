import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = (process.env.SMTP_SECURE || 'true').toLowerCase() === 'true';
const SMTP_USER = process.env.SMTP_USER?.trim();
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD?.replace(/\s+/g, '');
const FROM = process.env.CONTACT_FROM?.trim();
const GENERAL_TO = process.env.CONTACT_TO?.trim() || 'hello@hellokritrna.com';
const CAREERS_TO = process.env.CAREERS_TO?.trim() || 'careers@hellokritrna.com';
const ADMIN_BCC = process.env.ADMIN_BCC?.trim() || 'hellokritrna@gmail.com';

export const emailConfigured = Boolean(SMTP_USER && SMTP_APP_PASSWORD && FROM);
export type EmailChannel = 'general' | 'careers' | 'direct';
export type EmailAttachment = { filename: string; content: string };
export type EmailDeliveryResult = { ok: true; id?: string } | { skipped: true; reason: 'email_not_configured' };

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function mailer() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD },
      connectionTimeout: 12_000,
      greetingTimeout: 12_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

function recipientFor(channel: EmailChannel, direct?: string) {
  if (channel === 'direct') return direct || GENERAL_TO;
  return channel === 'careers' ? CAREERS_TO : GENERAL_TO;
}

export async function sendEmail({ channel, subject, text, replyTo, to, attachments, bccAdmin = true }: {
  channel: EmailChannel;
  subject: string;
  text: string;
  replyTo?: string;
  to?: string;
  attachments?: EmailAttachment[];
  bccAdmin?: boolean;
}): Promise<EmailDeliveryResult> {
  if (!emailConfigured) return { skipped: true, reason: 'email_not_configured' };

  const recipient = recipientFor(channel, to);
  const bcc = bccAdmin && ADMIN_BCC && ADMIN_BCC.toLowerCase() !== recipient.toLowerCase() ? ADMIN_BCC : undefined;
  const result = await mailer().sendMail({
    from: FROM,
    to: recipient,
    bcc,
    replyTo,
    subject,
    text,
    attachments: attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: Buffer.from(attachment.content, 'base64'),
    })),
  });

  return { ok: true, id: result.messageId };
}
