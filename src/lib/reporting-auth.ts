import { cookieValue } from './privacy';
import { reportingConfig } from './reporting';
export const REPORTING_COOKIE = 'kritrna_reporting_session';
export function reportingAdmins() { return (process.env.WEBSITE_REPORTING_ADMINS || '').split(',').map(v => v.trim().toLowerCase()).filter(Boolean); }
export function allowedAdmin(email?: string) { return typeof email === 'string' && reportingAdmins().includes(email.toLowerCase()); }
export async function reportingUser(req: Request): Promise<string | null> {
  const token = cookieValue(req.headers.get('cookie') || '', REPORTING_COOKIE);
  const { url, key } = reportingConfig();
  if (!token || !url || !key || !reportingAdmins().length) return null;
  try {
    const res = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` }, cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    const user = await res.json();
    return user.email_confirmed_at && allowedAdmin(user.email) ? user.email : null;
  } catch { return null; }
}
