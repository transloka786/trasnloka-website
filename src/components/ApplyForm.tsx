'use client';
import { useState, useRef, useEffect } from 'react';
import { ROLES } from '@/lib/content';

const ROLE_NAMES = ROLES.map((r) => r.title);

export default function ApplyForm({ preset }: { preset?: string }) {
  const [role, setRole] = useState(preset || '');
  useEffect(() => { if (preset) setRole(preset); }, [preset]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const fd = new FormData(formRef.current!);
    fd.set('role', role);
    if (file) fd.set('resume', file);
    if (!fd.get('name') || !fd.get('email') || !role || !fd.get('answer')) { setErr('Please complete name, email, role and your answer.'); return; }
    setBusy(true);
    try {
      const r = await fetch('/api/apply', { method: 'POST', body: fd });
      const data = await r.json();
      if (r.ok) setDone(true); else setErr(data.error || 'Something went wrong.');
    } catch { setErr('Network error — please try again.'); }
    finally { setBusy(false); }
  }

  if (done) return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--forest)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 16px' }}>✓</div>
      <h3 style={{ color: 'var(--cream)', fontSize: '1.4rem', marginBottom: 8 }}>Application received</h3>
      <p style={{ color: 'rgba(244,234,213,.72)', fontSize: '.92rem' }}>We’ve got your application for {role}. You’ll hear from us within a week.</p>
    </div>
  );

  const L = { display: 'block', fontFamily: 'var(--mono)', fontSize: '.72rem', letterSpacing: '.06em', textTransform: 'uppercase' as const, color: 'rgba(244,234,213,.7)', marginBottom: 7 };
  const F = { width: '100%', background: 'rgba(244,234,213,.06)', border: '1px solid rgba(244,234,213,.2)', borderRadius: 4, padding: '12px 14px', color: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: '.95rem' };

  return (
    <form ref={formRef} onSubmit={submit} style={{ background: 'rgba(244,234,213,.04)', border: '1px solid rgba(244,234,213,.14)', borderRadius: 10, padding: 30 }}>
      <div style={{ marginBottom: 18 }}><label style={L}>Full name <span style={{ color: 'var(--magenta)' }}>*</span></label><input name="name" style={F} placeholder="Your name" /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ marginBottom: 18 }}><label style={L}>Email <span style={{ color: 'var(--magenta)' }}>*</span></label><input name="email" type="email" style={F} placeholder="you@email.com" /></div>
        <div style={{ marginBottom: 18 }}><label style={L}>Phone</label><input name="phone" style={F} placeholder="+91 …" /></div>
      </div>
      <div style={{ marginBottom: 18 }}><label style={L}>Role <span style={{ color: 'var(--magenta)' }}>*</span></label>
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...F, appearance: 'none' }}>
          <option value="">Select a role…</option>
          {ROLE_NAMES.map((n) => <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n}</option>)}
          <option value="Open application" style={{ background: '#1a1a1a' }}>Open application — none of the above</option>
        </select>
      </div>
      <div style={{ marginBottom: 18 }}><label style={L}>Portfolio / LinkedIn / GitHub</label><input name="link" type="url" style={F} placeholder="https://…" /></div>
      <div style={{ marginBottom: 18 }}><label style={L}>What have you actually built or done that’s relevant? <span style={{ color: 'var(--magenta)' }}>*</span></label>
        <textarea name="answer" style={{ ...F, minHeight: 100, resize: 'vertical' }} placeholder="3–4 sentences. Specifics beat adjectives." /></div>
      <div style={{ marginBottom: 18 }}><label style={L}>Résumé / CV (PDF, max 5 MB)</label>
        <div onClick={() => fileRef.current?.click()} style={{ border: `1.5px ${file ? 'solid var(--forest)' : 'dashed rgba(244,234,213,.3)'}`, borderRadius: 6, padding: 22, textAlign: 'center', cursor: 'pointer', background: file ? 'rgba(42,138,106,.08)' : 'transparent' }}>
          <div style={{ fontFamily: 'var(--serif)', color: 'var(--cream)' }}>{file ? file.name : 'Drop your PDF or tap to browse'}</div>
          <div style={{ fontSize: '.78rem', color: 'rgba(244,234,213,.5)', marginTop: 6 }}>{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : 'PDF · max 5 MB'}</div>
        </div>
        <input ref={fileRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden />
      {err && <div style={{ color: '#ff6f9c', fontSize: '.85rem', marginBottom: 12 }}>{err}</div>}
      <button type="submit" disabled={busy} style={{ width: '100%', background: 'var(--cream)', color: 'var(--ink)', border: 'none', padding: 15, borderRadius: 4, fontFamily: 'var(--mono)', fontSize: '.85rem', letterSpacing: '.03em', cursor: 'pointer' }}>{busy ? 'Sending…' : 'Submit application'}</button>
      <p style={{ fontSize: '.76rem', color: 'rgba(244,234,213,.4)', textAlign: 'center', marginTop: 14 }}>By submitting you consent to Transloka Bio Pvt. Ltd. storing this for recruitment. See our Privacy page.</p>
    </form>
  );
}
