'use client';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import ApplyForm from '@/components/ApplyForm';
import { ROLES } from '@/lib/content';

const ACCENT: Record<string, string> = { cyan: 'var(--cyan)', magenta: 'var(--magenta)', forest: 'var(--forest)', ochre: 'var(--ochre)' };

export default function CareersPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [preset, setPreset] = useState<string>('');

  function apply(title: string) {
    setPreset(title);
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Careers at Transloka Bio</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.2rem)' }}>Do the hardest work of your<br />career on something that <em>matters.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA engineers suppressor tRNAs to restore proteins rare-disease patients are missing. Small founding team, real biology, frontier tooling. We do not care about your degree — we care about what you can actually do.</p></Reveal>
          <Reveal delay={0.15}><div style={{ marginTop: 26, display: 'inline-flex', gap: 10, alignItems: 'center', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--forest)', border: '1px solid rgba(42,138,106,.4)', padding: '8px 14px', borderRadius: 2, background: 'rgba(42,138,106,.06)' }}>Applications close 31 July 2026 · every application is read to completion.</div></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ROLES.map((r, i) => {
              const a = ACCENT[r.accent];
              const isOpen = open === i;
              return (
                <div key={r.title} style={{ border: `1px solid ${isOpen ? a : 'var(--rule)'}`, borderRadius: 8, background: 'var(--paper)', overflow: 'hidden', transition: 'border-color .25s' }}>
                  <div onClick={() => setOpen(isOpen ? null : i)} style={{ display: 'flex', gap: 20, padding: '24px 26px', cursor: 'pointer', alignItems: 'center' }}>
                    <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 3, background: a }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: a, marginBottom: 6 }}>{r.code}</div>
                      <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem' }}>{r.title}</div>
                      <div style={{ color: 'var(--ink-soft)', fontSize: '.94rem', marginTop: 4 }}>{r.tag}</div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                        {r.chips.map((c) => <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', border: '1px solid var(--rule)', padding: '5px 10px', borderRadius: 20, color: 'var(--ink-soft)' }}>{c}</span>)}
                      </div>
                    </div>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', border: `1px solid ${isOpen ? a : 'var(--rule)'}`, background: isOpen ? a : 'transparent', color: isOpen ? '#fff' : 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .3s', flex: 'none' }}>+</div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 26px 28px 50px', borderTop: '1px solid var(--rule)' }}>
                      <h4 style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '20px 0 10px' }}>What you’ll own</h4>
                      <ul style={{ listStyle: 'none' }}>
                        {r.own.map((o) => <li key={o} style={{ fontSize: '.95rem', color: 'var(--ink-soft)', padding: '6px 0 6px 18px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: a }}>→</span>{o}</li>)}
                      </ul>
                      <h4 style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '20px 0 8px' }}>{r.warnLabel}</h4>
                      <div style={{ fontSize: '.95rem', color: 'var(--ink)', background: `${a}12`, borderLeft: `3px solid ${a}`, padding: '12px 16px', borderRadius: '0 4px 4px 0' }}>{r.warn}</div>
                      {r.stipend && <div style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: a, marginTop: 16 }}>{r.stipend}</div>}
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22, alignItems: 'center' }}>
                        {r.jd ? (
                          <a className="btn btn-ghost" href={r.jd} target="_blank" rel="noopener noreferrer">View full JD (PDF)</a>
                        ) : (
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', border: '1px solid var(--rule)', padding: '10px 13px', borderRadius: 4 }}>Approved role brief available on request</span>
                        )}
                        <button className="btn btn-solid" onClick={() => apply(r.title)}>Apply for this role →</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ink-sec" id="apply">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Application</div><h2 className="h2">Apply</h2></div></Reveal>
          <div className="split-2" style={{ display: 'grid', gap: 44, alignItems: 'start' }}>
            <div>
              <h3 style={{ color: 'var(--cream)', fontWeight: 500, fontSize: '1.3rem', marginBottom: 16 }}>What happens after you apply</h3>
              {[['01', 'We read it.', 'Every application, to completion. Usually within a week.'],
                ['02', 'Paid trial task.', 'If there’s a fit, you get a scoped, paid task — not an unpaid take-home.'],
                ['03', 'Conversation.', 'We talk about the task and the work. No trick questions.'],
                ['04', 'Offer.', 'Internships carry a PPO pathway; the founding seat carries equity.']].map(([n, t, d]) => (
                <div key={n} style={{ display: 'flex', gap: 14, padding: '14px 0', borderTop: '1px solid rgba(244,234,213,.14)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--cyan)', width: 24 }}>{n}</div>
                  <p style={{ fontSize: '.92rem', color: 'rgba(244,234,213,.72)' }}><b style={{ color: 'var(--cream)' }}>{t}</b> {d}</p>
                </div>
              ))}
            </div>
            <ApplyForm preset={preset} />
          </div>
        </div>
      </section>
    </>
  );
}
