import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Platform',
  description: 'KritRNA’s dual AI engine: Engine 01 designs suppressor-tRNA sequences; Engine 02 models translation as a small-world network. A closed wet-lab design loop turns data into better designs.',
};

const E1 = ['Candidate generation across the sequence space', 'Constraint gate — identity, folding, off-target rules', 'Multi-axis scoring of read-through and safety', 'Pareto ranking to the shortlist that reaches the bench'];
const E2 = ['Codon-usage and tRNA-abundance landscape', 'Elongation velocity and its effect on folding', 'NMD / RQC, ISR and proteostasis relationships', 'Feeds design choices back into Engine 01'];
const TOOLS1 = ['tRNAscan-SE', 'ViennaRNA', 'OpenMM', 'XGBoost', 'SHAP'];

export default function PlatformPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Platform</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>A dual AI engine driving<br />a wet-lab design loop.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>Two computational systems are being developed to move from a target nonsense variant to a biologically constrained candidate shortlist. Experimental results are intended to inform future model refinement; the closed loop is not yet clinically validated.</p></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <div className="grid cols-2" style={{ background: 'rgba(244,234,213,.14)', border: '1px solid rgba(244,234,213,.14)' }}>
            <div className="cell" style={{ background: '#141210' }}>
              <div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · active development</div>
              <h3 style={{ color: 'var(--cream)' }}>Suppressor-tRNA sequence & structure design</h3>
              <p style={{ color: 'rgba(244,234,213,.72)' }}>Candidate design with viability, thermodynamic and structural checks, and explainable ranking.</p>
              <ul style={{ listStyle: 'none', marginTop: 16 }}>
                {E1.map((x) => <li key={x} style={{ color: 'rgba(244,234,213,.8)', fontSize: '.92rem', padding: '7px 0 7px 18px', position: 'relative', borderTop: '1px solid rgba(244,234,213,.12)' }}><span style={{ position: 'absolute', left: 0, color: 'var(--cyan)' }}>→</span>{x}</li>)}
              </ul>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TOOLS1.map((t) => <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', border: '1px solid rgba(244,234,213,.2)', borderRadius: 4, padding: '5px 10px', color: 'rgba(244,234,213,.7)' }}>{t}</span>)}
              </div>
            </div>
            <div className="cell" style={{ background: '#0f1512' }}>
              <div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · concept architecture</div>
              <h3 style={{ color: 'var(--cream)' }}>Translation small-world AI</h3>
              <p style={{ color: 'rgba(244,234,213,.72)' }}>A planned systems model connecting stop-codon context, tRNA behaviour, aminoacylation, termination, NMD/RQC, stress responses and protein output.</p>
              <ul style={{ listStyle: 'none', marginTop: 16 }}>
                {E2.map((x) => <li key={x} style={{ color: 'rgba(244,234,213,.8)', fontSize: '.92rem', padding: '7px 0 7px 18px', position: 'relative', borderTop: '1px solid rgba(244,234,213,.12)' }}><span style={{ position: 'absolute', left: 0, color: 'var(--forest)' }}>→</span>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split-2" style={{ display: 'grid', gap: 40, alignItems: 'center' }}>
          <div>
            <Reveal><div className="sec-head" style={{ marginBottom: 24 }}><div className="eyebrow">The loop</div><h2 className="h2">Design → validate → optimise</h2></div></Reveal>
            {[['Design', 'The platform generates and ranks candidate suppressor tRNAs for review.', 'var(--magenta)'],
              ['Validate', 'Selected candidates must be tested experimentally through an appropriate CRO or wet-lab collaboration.', 'var(--violet)'],
              ['Optimise', 'Validated assay results are intended to improve future ranking and design decisions.', 'var(--cyan)']].map(([t, d, c], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div style={{ display: 'flex', gap: 16, padding: '16px 0', borderTop: '1px solid var(--rule)' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: c as string, marginTop: 6, flex: 'none' }} />
                  <div><div style={{ fontWeight: 600 }}>{t}</div><div style={{ color: 'var(--ink-soft)', fontSize: '.94rem' }}>{d}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <img src="/ribosome.png" alt="Ribosome structure" style={{ width: '100%', filter: 'saturate(.9)' }} />
          </Reveal>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <Reveal><p style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--ink-mute)', maxWidth: '60ch', margin: '0 auto' }}>KritRNA is at an early, preclinical research stage. The computational platform is under active development, and the next major evidence gate is experimental validation of selected candidates. No KritRNA candidate is in clinical trials.</p></Reveal>
        </div>
      </section>
    </>
  );
}
