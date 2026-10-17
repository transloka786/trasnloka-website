import { CONSENT_COOKIE, CONSENT_MAX_AGE, cookieValue, encodePreference, parsePreference } from './privacy';
export const PRIVACY_CHANGE = 'kritrna:privacy-change';
export const PRIVACY_OPEN = 'kritrna:privacy-open';
export function currentPreference() { return typeof document === 'undefined' ? null : parsePreference(cookieValue(document.cookie)); }
export function blockAnalyticsImmediately() {
  document.cookie = `${CONSENT_COOKIE}=${encodePreference(false)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  window.dispatchEvent(new Event(PRIVACY_CHANGE));
}
export function sendAnalytics(payload: Record<string, string>) {
  if (!currentPreference()?.analytics) return;
  void fetch('/api/analytics', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
}
