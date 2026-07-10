// Minimal Supabase REST + Storage helpers via fetch. No SDK dependency.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseConfigured = !!(URL && KEY);

export async function insertRow(table: string, row: Record<string, unknown>) {
  if (!supabaseConfigured) return { skipped: true };
  const r = await fetch(`${URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (!r.ok) throw new Error(`supabase insert ${table}: ${r.status} ${await r.text()}`);
  return { ok: true };
}

export async function uploadResume(path: string, file: ArrayBuffer, contentType: string) {
  if (!supabaseConfigured) return { skipped: true, path: '' };
  const r = await fetch(`${URL}/storage/v1/object/resumes/${path}`, {
    method: 'POST',
    headers: {
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': contentType,
      'x-upsert': 'true',
    },
    body: file,
  });
  if (!r.ok) throw new Error(`supabase upload: ${r.status} ${await r.text()}`);
  return { ok: true, path };
}
