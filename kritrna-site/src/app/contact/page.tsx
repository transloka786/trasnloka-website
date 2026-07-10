'use client';
import { useState, useRef } from 'react';
import { SITE } from '@/lib/content';

export default function ContactPage() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const ref = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    const fd = new FormData(ref.current!);
    const body = Object.fromEntries(fd.entries());
    setBusy(true);
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await r.json();
      if (r.ok) setDone(true); else setErr(data.error || 'Something went wrong.');
    } catch { setErr('Network error — please try again.'); }
    finally { setBusy(false); }
  }

  return (
    <section style={{ borderTop: 'none', minHeight: '70vh' }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <div className="eyebrow" style={{ marginBottom: 22 }}>Contact</div>
        <h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Let’s talk.</h1>
        <p className="lead" style={{ marginTop: 20 }}>Partnerships, investment, CRO collaboration, press, or a question about the science — reach out. We read everything.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 44, marginTop: 40 }} className="split-2">
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Direct</h3>
            {[['Email', SITE.email, `mailto:${SITE.email}`], ['Phone', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`], ['Entity', SITE.legal, ''], ['CIN', SITE.cin, ''], ['Location', SITE.location, '']].map(([k, v, href]) => (
              <div key={k} style={{ padding: '12px 0', borderTop: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>{k}</div>
                {href ? <a href={href as string} style={{ color: 'var(--magenta)' }}>{v}</a> : <div>{v}</div>}
              </div>
            ))}
          </div>

          {done ? (
            <div style={{ border: '1px solid var(--rule)', borderRadius: 10, padding: 34, background: 'var(--paper)', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--forest)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 14px' }}>✓</div>
              <h3>Message sent</h3><p style={{ color: 'var(--ink-soft)', marginTop: 6 }}>Thanks — we’ll get back to you soon.</p>
            </div>
          ) : (
            <form ref={ref} onSubmit={submit} style={{ border: '1px solid var(--rule)', borderRadius: 10, padding: 30, background: 'var(--paper)' }}>
              <div className="field"><label>Name <span className="req">*</span></label><input name="name" placeholder="Your name" /></div>
              <div className="two">
                <div className="field"><label>Email <span className="req">*</span></label><input name="email" type="email" placeholder="you@email.com" /></div>
                <div className="field"><label>Organisation</label><input name="organization" placeholder="Company / institution" /></div>
              </div>
              <div className="field"><label>Message <span className="req">*</span></label><textarea name="message" placeholder="How can we help?" /></div>
              <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
              {err && <div style={{ color: 'var(--magenta)', fontSize: '.85rem', marginBottom: 12 }}>{err}</div>}
              <button className="btn btn-solid" type="submit" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>{busy ? 'Sending…' : 'Send message'}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
