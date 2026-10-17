export const CONSENT_COOKIE = 'kritrna_privacy';
export const POLICY_VERSION = '2026-10-17';
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60;
export type Preference = { analytics: boolean; decidedAt: number; version: string };
export function encodePreference(analytics: boolean, now = Date.now()) { return `${POLICY_VERSION}.${analytics ? 'yes' : 'no'}.${now}`; }
export function parsePreference(value?: string | null, now = Date.now()): Preference | null {
  if (!value) return null;
  const [version, choice, time, extra] = value.split('.');
  const decidedAt = Number(time);
  if (extra || version !== POLICY_VERSION || !['yes', 'no'].includes(choice) || !Number.isFinite(decidedAt)
    || decidedAt <= 0 || decidedAt > now || now - decidedAt >= CONSENT_MAX_AGE * 1000) return null;
  return { analytics: choice === 'yes', decidedAt, version };
}
export function cookieValue(header: string, name = CONSENT_COOKIE) {
  return header.split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`))?.slice(name.length + 1);
}
export function sameOrigin(req: Request) { return req.headers.get('origin') === new URL(req.url).origin; }
// Never collect dynamic paths, URL queries, search text, admin or token pages.
export const PUBLIC_PATHS = new Set([
  '/', '/about', '/ask', '/careers', '/community', '/contact', '/disclaimer', '/evidence', '/explorer', '/faq',
  '/glossary', '/how-we-work', '/impact', '/india', '/investors', '/partners', '/pipeline', '/platform', '/privacy',
  '/problem', '/references', '/resources', '/science', '/search', '/small-world', '/team', '/terms', '/updates',
]);
export const CLICK_LABELS = new Set(['contact', 'partner', 'investor', 'newsletter', 'careers']);
const REFERRERS = new Map([
  ['linkedin.com', 'LinkedIn'], ['instagram.com', 'Instagram'], ['facebook.com', 'Facebook'], ['google.com', 'Google'],
  ['google.co.in', 'Google'], ['bing.com', 'Bing'], ['youtube.com', 'YouTube'], ['t.co', 'X'], ['x.com', 'X'], ['chatgpt.com', 'ChatGPT'],
]);
export function sourceBucket(referrer: string) {
  if (!referrer) return 'Direct / unknown';
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === 'hellokritrna.com' || host.endsWith('.hellokritrna.com')) return 'Internal';
    for (const [domain, label] of REFERRERS) if (host === domain || host.endsWith(`.${domain}`)) return label;
    return 'Other referral';
  } catch { return 'Direct / unknown'; }
}
export const SOURCE_BUCKETS = new Set(['Direct / unknown', 'Internal', 'Other referral', ...REFERRERS.values()]);
export function cleanAnalytics(body: Record<string, unknown>) {
  const path = typeof body.path === 'string' ? body.path : '';
  if (!PUBLIC_PATHS.has(path)) return null;
  if (body.event === 'page_view') return { event: 'page_view', path, label: '', source: SOURCE_BUCKETS.has(String(body.source)) ? String(body.source) : 'Direct / unknown' };
  if (body.event === 'cta_click' && CLICK_LABELS.has(String(body.label))) return { event: 'cta_click', path, label: String(body.label), source: '' };
  return null;
}
