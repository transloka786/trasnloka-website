import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { PROGRAMS, REACH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Research Programs',
  description: 'KritRNA’s initial research focus: selected nonsense-mutation contexts in HBB, DMD and CFTR, supported by one programmable suppressor-tRNA platform thesis.',
};

export default function PipelinePage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Research programs</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Three initial programs<br />on one platform thesis.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA’s initial focus is selected nonsense-mutation contexts in <strong>HBB, DMD and CFTR</strong>. These programs are at an early research stage. They are not clinical-stage assets, and no KritRNA candidate is in human trials.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div className="grid cols-3">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.name} delay={i * 0.06}>
                <article style={{ height: '100%', border: '1px solid var(--rule)', borderTop: `4px solid ${program.accent}`, borderRadius: 10, background: 'var(--paper)', padding: '24px 24px 26px' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: program.accent, letterSpacing: '.07em', textTransform: 'uppercase' }}>{program.area}</div>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.45rem', marginTop: 8 }}>{program.name}</h2>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.74rem', color: 'var(--ink-mute)', marginTop: 5 }}>Gene: {program.gene}</div>
                  <p style={{ color: 'var(--ink-soft)', marginTop: 16 }}>{program.goal}</p>
                  <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Current milestone</div>
                    <div style={{ marginTop: 6, fontWeight: 600 }}>{program.stage}</div>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Next decision gate</div>
                    <div style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '.92rem' }}>{program.next}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)' }}>Milestones describe research work, not probability of success or clinical-development status. Program scope may change as sequence, assay, delivery and safety evidence develops.</p></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Broader research scope</div><h2 className="h2">Programmable does not mean automatically transferable</h2>
            <p>The same molecular concept may be relevant across multiple disease classes, but every indication requires its own sequence context, amino-acid identity, delivery strategy, safety analysis and experimental validation. The areas below are research scope, not active pipeline programs.</p></div></Reveal>
          <div className="grid cols-3">
            {REACH.map((area, i) => (
              <Reveal key={area.area} delay={i * 0.05}>
                <div className="cell">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: area.c, marginBottom: 12 }} />
                  <h3 style={{ fontSize: '1.1rem' }}>{area.area}</h3>
                  <p>{area.ex}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
