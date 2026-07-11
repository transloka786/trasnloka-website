// Minimal Supabase REST + Storage helpers via fetch. No SDK dependency.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseConfigured = !!(URL && KEY);

function headers(extra?: Record<string,string>) {
  return { apikey: KEY!, Authorization: `Bearer ${KEY}`, ...extra };
}

export async function insertRow(table: string, row: Record<string, unknown>) {
  if (!supabaseConfigured) return { skipped: true };
  const response = await fetch(`${URL}/rest/v1/${table}`, {
    method: 'POST', headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(`supabase insert ${table}: ${response.status} ${await response.text()}`);
  return { ok: true };
}

export async function updateRows(table: string, filter: string, row: Record<string, unknown>) {
  if (!supabaseConfigured) return { skipped: true };
  const response = await fetch(`${URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH', headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(`supabase update ${table}: ${response.status} ${await response.text()}`);
  return { ok: true };
}

export async function uploadResume(path: string, file: ArrayBuffer, contentType: string) {
  if (!supabaseConfigured) return { skipped: true, path: '' };
  const response = await fetch(`${URL}/storage/v1/object/resumes/${path}`, {
    method: 'POST', headers: headers({ 'Content-Type': contentType, 'x-upsert': 'true' }), body: file,
  });
  if (!response.ok) throw new Error(`supabase upload: ${response.status} ${await response.text()}`);
  return { ok: true, path };
}
