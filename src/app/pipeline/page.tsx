import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { PROGRAMS, REACH } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Research Programs',
  description: 'KritRNA’s initial research focus: selected premature-stop contexts in HBB, DMD and TP53, displayed through evidence-gated research stages.',
};

const STAGES = [
  { name: 'Discovery', note: 'Target context, candidate design and assay definition' },
  { name: 'Lead optimisation', note: 'Iterative sequence, activity and selectivity refinement' },
  { name: 'Preclinical', note: 'Disease-model efficacy, delivery and safety evidence' },
  { name: 'IND-enabling', note: 'Regulatory-grade development package' },
];

export default function PipelinePage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Research programs</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Three initial programs<br />on one platform thesis.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA’s initial focus is selected premature-stop contexts in <strong>HBB, DMD and TP53</strong>. Together, they test the platform across hematology, neuromuscular disease and cancer biology.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ overflowX: 'auto', paddingBottom: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(235px, 1fr))', gap: 14, minWidth: 1000 }}>
              {STAGES.map((stage, stageIndex) => (
                <Reveal key={stage.name} delay={stageIndex * 0.05}>
                  <section style={{ height: '100%', border: '1px solid var(--rule)', borderRadius: 10, background: stageIndex === 0 ? 'var(--paper)' : 'var(--cream-deep)', overflow: 'hidden' }}>
                    <header style={{ padding: '18px 18px 16px', borderBottom: '1px solid var(--rule)', minHeight: 112 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--ink-mute)', letterSpacing: '.09em' }}>0{stageIndex + 1}</div>
                      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.22rem', marginTop: 5 }}>{stage.name}</h2>
                      <p style={{ color: 'var(--ink-soft)', fontSize: '.82rem', marginTop: 6 }}>{stage.note}</p>
                    </header>
                    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 420 }}>
                      {stageIndex === 0 ? PROGRAMS.map((program) => (
                        <article key={program.name} style={{ border: '1px solid var(--rule)', borderLeft: `4px solid ${program.accent}`, borderRadius: 7, background: 'var(--cream)', padding: '17px 16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'start' }}>
                            <div>
                              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.08rem' }}>{program.name}</h3>
                              <div style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: program.accent, marginTop: 4 }}>{program.gene} · {program.area}</div>
                            </div>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'var(--forest)', border: '1px solid rgba(42,138,106,.35)', borderRadius: 20, padding: '4px 7px', whiteSpace: 'nowrap' }}>ACTIVE</span>
                          </div>
                          <p style={{ color: 'var(--ink-soft)', fontSize: '.85rem', marginTop: 12 }}>{program.goal}</p>
                          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--rule)' }}>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '.61rem', color: 'var(--ink-mute)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Current milestone</div>
                            <div style={{ fontSize: '.86rem', fontWeight: 600, marginTop: 4 }}>{program.stage}</div>
                          </div>
                          <div style={{ marginTop: 10 }}>
                            <div style={{ fontFamily: 'var(--mono)', fontSize: '.61rem', color: 'var(--ink-mute)', letterSpacing: '.06em', textTransform: 'uppercase' }}>Next gate</div>
                            <div style={{ color: 'var(--ink-soft)', fontSize: '.82rem', marginTop: 4 }}>{program.next}</div>
                          </div>
                        </article>
                      )) : (
                        <div style={{ margin: 5, border: '1px dashed var(--rule)', borderRadius: 7, padding: '24px 16px', color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: '.72rem', lineHeight: 1.6 }}>
                          Programmes enter this stage only after the preceding evidence gate is met.
                        </div>
                      )}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Broader opportunity</div><h2 className="h2">One platform, multiple disease classes</h2>
            <p>The same translation-level strategy may be applied across different genes and disease areas. Each programme still requires its own sequence design, amino-acid choice, delivery strategy, safety analysis and experimental model.</p></div></Reveal>
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
