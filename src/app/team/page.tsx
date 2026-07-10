import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { TEAM, PUBS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Team',
  description: 'The team building KritRNA — scientific depth in translation and tRNA biology, computational execution, outreach, and clinical advisory.',
};

export default function TeamPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Team</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Scientific depth,<br />computational execution.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA is built on the founder’s peer-reviewed research record in translation biology, tRNA function and suppressor-tRNA systems — paired with computational build and rare-disease outreach.</p></Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="team-lead">
            {[TEAM.lead, TEAM.outreach].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div style={{ border: '1px solid var(--rule)', borderRadius: 10, overflow: 'hidden', background: 'var(--paper)' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--ink)' }}>
                    <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 26px' }}>
                    <h3 style={{ fontSize: '1.4rem' }}>{p.name}</h3>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--magenta)', margin: '6px 0 12px' }}>{p.role}</div>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '.96rem' }}>{p.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Scientific foundation</div><h2 className="h2">Built on a peer-reviewed record</h2></div></Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PUBS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ border: '1px solid var(--rule)', borderLeft: `3px solid ${p.c}`, borderRadius: '0 8px 8px 0', background: 'var(--paper)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.5rem', color: p.c, minWidth: 70 }}>{p.year}</div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontWeight: 600 }}>{p.venue}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{p.topic}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', border: '1px solid var(--rule)', padding: '5px 12px', borderRadius: 20, color: 'var(--ink-soft)' }}>{p.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)' }}>Founder’s personal publication record. No university is represented as a current company affiliation.</p></Reveal>
        </div>
      </section>

      {/* Build + Advisory */}
      <section>
        <div className="wrap">
          <div className="grid cols-2">
            <div className="cell">
              <div className="k">AI / ML & computational biology build</div>
              {TEAM.build.map((m) => (
                <div key={m.name} style={{ padding: '14px 0', borderTop: '1px solid var(--rule)' }}>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{m.note}</div>
                </div>
              ))}
            </div>
            <div className="cell">
              <div className="k">Scientific & clinical advisory</div>
              {TEAM.advisory.map((m) => (
                <div key={m.name} style={{ padding: '14px 0', borderTop: '1px solid var(--rule)' }}>
                  <div style={{ fontWeight: 600 }}>{m.name}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{m.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
