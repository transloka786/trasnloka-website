import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Investors',
  description: 'Investor overview of KritRNA: the molecular thesis, dual-engine platform, initial research programs, evidence gates and India-first execution strategy.',
};

const THESIS = [
  ['Shared molecular failure', 'Premature termination codons create a common translation problem across otherwise fragmented genetic diseases.'],
  ['Programmable modality', 'Suppressor tRNAs can be redesigned for selected stop codons, amino-acid identities and disease contexts.'],
  ['Computational leverage', 'Candidate generation and prioritisation can reduce the experimental search space before wet-lab testing.'],
  ['Compounding evidence', 'Assay-labelled experimental results can improve future candidate selection and platform calibration.'],
];

const MILESTONES = [
  ['Current', 'Platform architecture and program definition', 'Build the suppressor-tRNA design engine, translation-system model and assay-aware data foundation.'],
  ['Next evidence gate', 'Candidate shortlist and assay specification', 'Select candidates for HBB, DMD and CFTR contexts and define reproducible experimental readouts.'],
  ['Experimental gate', 'CRO / wet-lab validation', 'Measure readthrough, full-length protein, function, amino-acid identity, normal-stop effects and cellular response.'],
  ['After reproducible evidence', 'Lead refinement and programme expansion', 'Use validated results to improve ranking, select follow-up designs and determine whether a programme should advance.'],
];

const RISKS = [
  ['Biological performance', 'A computationally viable candidate may not produce sufficient or correctly functioning protein in the relevant system.'],
  ['Selectivity and safety', 'Normal-stop readthrough, mistranslation, stress responses and delivery constraints must be experimentally controlled.'],
  ['Assay comparability', 'Published readthrough measurements are heterogeneous and cannot be pooled without preserving experimental context.'],
  ['Execution', 'Progress depends on high-quality CRO, laboratory, clinical and disease-community collaborations.'],
];

export default function InvestorsPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}><div className="wrap">
        <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Investors</div></Reveal>
        <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.35rem,6vw,4.5rem)' }}>A platform thesis.<br /><em>Measured by evidence gates.</em></h1></Reveal>
        <Reveal delay={0.1}><p className="lead" style={{ marginTop: 26 }}>KritRNA is an early, preclinical biotechnology company developing an India-first suppressor-tRNA design platform. The near-term objective is not a broad therapeutic claim; it is reproducible experimental validation of carefully selected candidates.</p></Reveal>
        <Reveal delay={0.14}><div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/contact">Start an investor conversation →</Link><Link className="btn btn-ghost" href="/pipeline">Review the evidence-gated pipeline</Link></div></Reveal>
      </div></section>

      <section className="ink-sec"><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">12 — investor architecture</div><h2 className="h2">Why a platform, not a single mutation programme</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>The investment thesis rests on a shared molecular mechanism, a programmable modality, computational prioritisation and a proprietary experimental-learning loop.</p></div></Reveal>
        <div className="grid cols-4" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>{THESIS.map(([title, text], i) => <Reveal key={title} delay={i * 0.05}><article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f', borderTop: `4px solid ${i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)'}` }}><h3 style={{ color: 'var(--cream)' }}>{title}</h3><p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p></article></Reveal>)}</div>
      </div></section>

      <section><div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'start' }}>
        <Reveal><div><div className="eyebrow">Platform advantage</div><h2 className="h2" style={{ marginTop: 14 }}>The intended moat is the integrated system</h2><p className="lead" style={{ marginTop: 20 }}>KritRNA’s defensibility is intended to come from the combination of candidate-generation logic, biological constraint gates, assay-aware evidence, mechanistic translation modelling and accumulated wet-lab outcomes.</p><div className="callout" style={{ marginTop: 24 }}>The public website describes architecture. It does not disclose proprietary model weights, feature transformations, ranking functions, training corpora or candidate sequences.</div></div></Reveal>
        <Reveal delay={0.08}><div style={{ border: '1px solid var(--rule)', borderRadius: 10, background: 'var(--paper)', padding: 26 }}><div className="k" style={{ color: 'var(--cyan)' }}>Two-engine structure</div>{[['Engine 01', 'Design and rank suppressor-tRNA candidates.'], ['Engine 02', 'Model translation-system consequences.'], ['Wet-lab loop', 'Return experimental evidence to future design decisions.']].map(([title, text], i) => <div key={title} style={{ padding: '16px 0', borderTop: i ? '1px solid var(--rule)' : 'none' }}><h3>{title}</h3><p style={{ color: 'var(--ink-soft)', marginTop: 5 }}>{text}</p></div>)}</div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">24 — milestone timeline</div><h2 className="h2">Progress is defined by evidence, not percentages</h2><p>Each transition requires a concrete scientific output. No programme moves forward because a calendar date or visual progress bar says it should.</p></div></Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)', borderRadius: 9, overflow: 'hidden' }}>{MILESTONES.map(([phase, title, text], i) => <Reveal key={phase} delay={i * 0.04}><div style={{ background: 'var(--paper)', padding: '22px 24px', display: 'grid', gridTemplateColumns: 'minmax(145px,.55fr) 1fr 1.5fr', gap: 22, alignItems: 'start' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)', textTransform: 'uppercase' }}>{phase}</div><div style={{ fontWeight: 600 }}>{title}</div><div style={{ color: 'var(--ink-soft)', fontSize: '.92rem' }}>{text}</div></div></Reveal>)}</div>
      </div></section>

      <section className="ink-sec"><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Risk discipline</div><h2 className="h2">What must be proven</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>The company is deliberately explicit about the scientific and execution risks separating platform architecture from a validated therapeutic candidate.</p></div></Reveal>
        <div className="grid cols-2" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>{RISKS.map(([title, text], i) => <Reveal key={title} delay={(i % 2) * 0.05}><article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f' }}><div className="k" style={{ color: i % 2 ? 'var(--cyan)' : 'var(--magenta)' }}>{String(i + 1).padStart(2, '0')}</div><h3 style={{ color: 'var(--cream)' }}>{title}</h3><p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p></article></Reveal>)}</div>
      </div></section>

      <section className="center"><div className="wrap">
        <Reveal><h2 className="h2">The next value-inflection point is experimental evidence.</h2></Reveal>
        <Reveal delay={0.06}><p className="lead" style={{ margin: '16px auto 0' }}>Investor materials, technical discussions and diligence information are shared separately through an appropriate conversation and confidentiality process.</p></Reveal>
        <Reveal delay={0.1}><div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/contact">Contact the founders →</Link><Link className="btn btn-ghost" href="/india">See the India-first strategy</Link></div></Reveal>
      </div></section>
    </>
  );
}
