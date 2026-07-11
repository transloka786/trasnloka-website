import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'India-First',
  description: 'Why KritRNA is being built from India: locally relevant rare-disease priorities, scientific capability, validation partnerships and an India-based company platform.',
};

const PILLARS = [
  {
    title: 'Disease relevance',
    text: 'KritRNA begins with selected nonsense-mutation contexts in HBB, DMD and CFTR, including an India-priority focus on β-thalassemia.',
    accent: 'var(--magenta)',
  },
  {
    title: 'Scientific ownership',
    text: 'The computational platform, candidate logic and future experimental evidence are being organised as company-owned capability developed from India.',
    accent: 'var(--cyan)',
  },
  {
    title: 'Validation network',
    text: 'The development path depends on Indian CROs, research laboratories, clinicians, hospitals and rare-disease communities working through formal collaborations.',
    accent: 'var(--forest)',
  },
  {
    title: 'Access-aware development',
    text: 'Early decisions about indication, assay, delivery and evidence should reflect the realities of patients, healthcare systems and research infrastructure in India.',
    accent: 'var(--violet)',
  },
];

const PATH = [
  ['01', 'Define locally relevant mutation contexts', 'Select disease and variant contexts where the biology, unmet need and experimental path can be defended.'],
  ['02', 'Design candidates computationally', 'Generate and rank suppressor-tRNA candidates using the KritRNA platform and documented biological constraints.'],
  ['03', 'Validate through formal collaborations', 'Test selected candidates through appropriate research laboratories, CROs and disease-relevant experimental systems.'],
  ['04', 'Build evidence before expansion', 'Advance only when reproducible molecular, protein-restoration and safety evidence supports the next step.'],
];

export default function IndiaPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>India-first</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.35rem,6vw,4.5rem)' }}>Built in India.<br /><em>Designed for global science.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 26 }}>KritRNA is being developed by Transloka Bio Pvt. Ltd. in Noida as an India-first suppressor-tRNA platform. India-first does not mean India-only: it means building scientific ownership, evidence generation and disease priorities from India while meeting globally credible standards.</p></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">10 — the India-first proposition</div><h2 className="h2">Start where the need, science and execution can meet</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>The company is not using India as a marketing label. The proposition is to build a defensible biotechnology platform, validation network and future development pathway from the Indian research ecosystem.</p></div></Reveal>
          <div className="grid cols-4" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 0.05}>
                <article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f', borderTop: `4px solid ${pillar.accent}` }}>
                  <h3 style={{ color: 'var(--cream)' }}>{pillar.title}</h3>
                  <p style={{ color: 'rgba(244,234,213,.7)' }}>{pillar.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'start' }}>
          <Reveal>
            <div>
              <div className="eyebrow">Initial focus</div>
              <h2 className="h2" style={{ marginTop: 14 }}>Three programs with different biological and access questions</h2>
              <p className="lead" style={{ marginTop: 20 }}>HBB, DMD and CFTR provide distinct tests of the same platform thesis. Each program requires its own mutation context, amino-acid restoration logic, assay system, delivery strategy and safety evidence.</p>
              <div className="callout" style={{ marginTop: 24 }}>These are early research programs. KritRNA does not currently offer a treatment, clinical trial or patient-enrolment pathway.</div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ border: '1px solid var(--rule)', borderRadius: 10, background: 'var(--paper)', overflow: 'hidden' }}>
              {[
                ['HBB / β-thalassemia', 'India-priority hematology program focused on selected nonsense variants.'],
                ['DMD / Duchenne muscular dystrophy', 'Neuromuscular program focused on selected premature-stop contexts.'],
                ['CFTR / cystic fibrosis', 'Pulmonary and epithelial program focused on selected nonsense variants.'],
              ].map(([title, text], i) => (
                <div key={title} style={{ padding: '21px 24px', borderTop: i ? '1px solid var(--rule)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : 'var(--violet)' }}>0{i + 1}</div>
                  <h3 style={{ marginTop: 6 }}>{title}</h3>
                  <p style={{ color: 'var(--ink-soft)', marginTop: 7 }}>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Execution pathway</div><h2 className="h2">Evidence before expansion</h2><p>The India-first strategy is organised around an evidence sequence rather than broad claims of platform readiness.</p></div></Reveal>
          <div className="grid cols-2">
            {PATH.map(([number, title, text], i) => (
              <Reveal key={number} delay={(i % 2) * 0.05}>
                <article className="cell" style={{ height: '100%', display: 'flex', gap: 17, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', color: i % 2 ? 'var(--cyan)' : 'var(--magenta)', minWidth: 30 }}>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-sec center">
        <div className="wrap">
          <Reveal><h2 className="h2">India-first scientific infrastructure requires collaborators.</h2></Reveal>
          <Reveal delay={0.06}><p className="lead" style={{ margin: '16px auto 0', color: 'rgba(244,234,213,.72)' }}>KritRNA is open to structured discussions with research laboratories, CROs, clinicians, hospitals, incubators, grant programmes, patient organisations and aligned investors.</p></Reveal>
          <Reveal delay={0.1}><div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/contact" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>Discuss an India collaboration</Link><Link className="btn btn-ghost" href="/pipeline" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>View the research programs</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
