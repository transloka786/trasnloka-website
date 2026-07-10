import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { PROGRAMS, REACH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pipeline',
  description: 'KritRNA’s early-stage programs — Duchenne MD, hemophilia, and TP53 nonsense cancers — plus the broader reach of one programmable suppressor-tRNA platform.',
};

const STAGES = ['Discovery', 'Lead optimisation', 'Preclinical', 'IND-enabling'];

export default function PipelinePage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Pipeline</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Four programs<br />on one platform.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>Each program targets a nonsense-mutation disease where a restored protein could change the course of the condition. <strong>All programs are at discovery / early-validation stage today. No candidate is in human trials.</strong></p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ border: '1px solid var(--rule)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 2fr', background: 'var(--cream-deep)', fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
              <div style={{ padding: '14px 22px' }}>Program</div>
              <div style={{ padding: '14px 22px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>{STAGES.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 2fr', borderTop: '1px solid var(--rule)', alignItems: 'center', background: 'var(--paper)' }}>
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.15rem' }}>{p.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: p.accent, marginTop: 4 }}>{p.area}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginTop: 8 }}>{p.goal}</div>
                  </div>
                  <div style={{ padding: '20px 22px' }}>
                    <div style={{ height: 10, borderRadius: 6, background: 'var(--cream-deep)', overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${p.accent}, var(--cyan))` }} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)' }}>Bars indicate research progress, not clinical status. See our Disclaimer for detail.</p></Reveal>
        </div>
      </section>

      {/* Platform reach */}
      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Platform reach</div><h2 className="h2">One modality, many diseases</h2>
            <p>Potentially addressable ≠ equally tractable. Each indication needs its own codon context, delivery, safety and wet-lab validation.</p></div></Reveal>
          <div className="grid cols-3">
            {REACH.map((r, i) => (
              <Reveal key={r.area} delay={i * 0.05}>
                <div className="cell">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.c, marginBottom: 12 }} />
                  <h3 style={{ fontSize: '1.1rem' }}>{r.area}</h3>
                  <p>{r.ex}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
