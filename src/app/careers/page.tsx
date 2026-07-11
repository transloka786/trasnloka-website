'use client';
import Link from 'next/link';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import ApplyForm from '@/components/ApplyForm';
import { ROLES, SITE } from '@/lib/content';

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
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA engineers suppressor tRNAs for selected nonsense-mutation contexts. Small founding team, real biology, frontier tooling. We care more about what you can learn, build and own than pedigree.</p></Reveal>
          <Reveal delay={0.13}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/how-we-work">Read how we work before applying →</Link></div></Reveal>
          <Reveal delay={0.15}><div style={{ marginTop: 26, display: 'inline-flex', gap: 10, alignItems: 'center', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--forest)', border: '1px solid rgba(42,138,106,.4)', padding: '8px 14px', borderRadius: 2, background: 'rgba(42,138,106,.06)', flexWrap: 'wrap' }}>Applications close 31 July 2026 · <a href={`mailto:${SITE.careersEmail}`} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{SITE.careersEmail}</a></div></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ROLES.map((role, index) => {
              const accent = ACCENT[role.accent];
              const isOpen = open === index;
              return (
                <div key={role.title} style={{ border: `1px solid ${isOpen ? accent : 'var(--rule)'}`, borderRadius: 8, background: 'var(--paper)', overflow: 'hidden', transition: 'border-color .25s' }}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)} style={{ width: '100%', border: 0, background: 'transparent', color: 'inherit', display: 'flex', gap: 20, padding: '24px 26px', cursor: 'pointer', alignItems: 'center', textAlign: 'left' }}>
                    <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 3, background: accent }} />
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: accent, marginBottom: 6 }}>{role.code}</span>
                      <span style={{ display: 'block', fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem' }}>{role.title}</span>
                      <span style={{ display: 'block', color: 'var(--ink-soft)', fontSize: '.94rem', marginTop: 4 }}>{role.tag}</span>
                      <span style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                        {role.chips.map((chip) => <span key={chip} style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', border: '1px solid var(--rule)', padding: '5px 10px', borderRadius: 20, color: 'var(--ink-soft)' }}>{chip}</span>)}
                      </span>
                    </span>
                    <span aria-hidden style={{ width: 34, height: 34, borderRadius: '50%', border: `1px solid ${isOpen ? accent : 'var(--rule)'}`, background: isOpen ? accent : 'transparent', color: isOpen ? '#fff' : 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .3s', flex: 'none' }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 26px 28px 50px', borderTop: '1px solid var(--rule)' }}>
                      <h2 style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '20px 0 10px' }}>What you’ll own</h2>
                      <ul style={{ listStyle: 'none' }}>
                        {role.own.map((item) => <li key={item} style={{ fontSize: '.95rem', color: 'var(--ink-soft)', padding: '6px 0 6px 18px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: accent }}>→</span>{item}</li>)}
                      </ul>
                      <h2 style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '20px 0 8px' }}>{role.warnLabel}</h2>
                      <div style={{ fontSize: '.95rem', color: 'var(--ink)', background: `${accent}12`, borderLeft: `3px solid ${accent}`, padding: '12px 16px', borderRadius: '0 4px 4px 0' }}>{role.warn}</div>
                      {role.stipend && <div style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: accent, marginTop: 16 }}>{role.stipend}</div>}
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22, alignItems: 'center' }}>
                        {role.jd ? <a className="btn btn-ghost" href={role.jd} target="_blank" rel="noopener noreferrer">View full JD (PDF)</a> : <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', border: '1px solid var(--rule)', padding: '10px 13px', borderRadius: 4 }}>Approved role brief available on request</span>}
                        <button className="btn btn-solid" onClick={() => apply(role.title)}>Apply for this role →</button>
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
          <Reveal><div className="sec-head"><div className="eyebrow">Application</div><h2 className="h2">Apply</h2><p>Applications are routed to <a href={`mailto:${SITE.careersEmail}`} style={{ color: 'var(--cyan)' }}>{SITE.careersEmail}</a>.</p></div></Reveal>
          <div className="split-2" style={{ display: 'grid', gap: 44, alignItems: 'start' }}>
            <div>
              <h3 style={{ color: 'var(--cream)', fontWeight: 500, fontSize: '1.3rem', marginBottom: 16 }}>What happens after you apply</h3>
              {[['01', 'We read it.', 'Every application, to completion. Usually within a week.'],['02', 'Paid trial task.', 'If there’s a fit, you get a scoped, paid task—not an unpaid take-home.'],['03', 'Conversation.', 'We talk about the task and the work. No trick questions.'],['04', 'Offer.', 'Internships carry a PPO pathway; the founding seat carries equity.']].map(([number, title, description]) => (
                <div key={number} style={{ display: 'flex', gap: 14, padding: '14px 0', borderTop: '1px solid rgba(244,234,213,.14)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--cyan)', width: 24 }}>{number}</div>
                  <p style={{ fontSize: '.92rem', color: 'rgba(244,234,213,.72)' }}><b style={{ color: 'var(--cream)' }}>{title}</b> {description}</p>
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
