// Separate configuration prevents reporting activation changing CV storage.
export function reportingConfig() {
  return { url: process.env.REPORTING_SUPABASE_URL?.trim() || '', key: process.env.REPORTING_SUPABASE_SERVICE_ROLE_KEY?.trim() || '' };
}
export function reportingConfigured() { const { url, key } = reportingConfig(); return Boolean(url && key); }
export async function reportingRequest(path: string, init: RequestInit = {}) {
  const { url, key } = reportingConfig();
  if (!url || !key) throw new Error('Reporting not configured');
  const response = await fetch(`${url.replace(/\/$/, '')}${path}`, {
    ...init, cache: 'no-store', signal: AbortSignal.timeout(10_000),
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
  });
  if (!response.ok) throw new Error(`Reporting service returned ${response.status}`);
  return response;
}
export async function reportingInsert(table: 'web_analytics_events' | 'web_consent_events', row: Record<string, unknown>) {
  return reportingRequest(`/rest/v1/${table}`, { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(row) });
}
export async function reportingRpc<T>(name: string, body: Record<string, unknown> = {}): Promise<T> {
  const response = await reportingRequest(`/rest/v1/rpc/${name}`, { method: 'POST', body: JSON.stringify(body) });
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
export async function recordDeliveredEnquiry() {
  if (!reportingConfigured()) return;
  try { await reportingRpc('web_increment_enquiry'); } catch { console.error('Enquiry count could not be recorded'); }
}
export const PRIVATE_HEADERS = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' };
