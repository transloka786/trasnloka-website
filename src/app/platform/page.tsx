import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Platform',
  description: 'KritRNA’s dual-engine platform combines suppressor-tRNA candidate design with a translation small-world model and an assay-aware design–test–learn loop.',
};

const ENGINE_ONE = [
  ['Input definition', 'Gene, nonsense variant, stop codon, local sequence context and intended amino-acid restoration.'],
  ['Candidate generation', 'Explore de-novo and mutation-based suppressor-tRNA candidates rather than relying on a single anticodon edit.'],
  ['Biological constraint gates', 'Processing, folding, aminoacylation identity, structural viability and normal-stop risk.'],
  ['Context and kinetic modelling', 'Termination competition, codon neighbourhood, NMD context, ribosome dwell and cellular state.'],
  ['Explainable ranking', 'Multi-objective scoring and Pareto selection to identify candidates worth experimental testing.'],
];

const ENGINE_TWO = [
  ['Translation network', 'Represent initiation, elongation, collision, termination, recycling and quality-control relationships.'],
  ['Perturbation model', 'Introduce a candidate suppressor tRNA as a network intervention rather than an isolated molecule.'],
  ['Systems outcomes', 'Estimate consequences for readthrough, NMD, ribosome traffic, ISR signalling and protein output.'],
  ['Feedback to design', 'Return system-level penalties and opportunities to the candidate-ranking engine.'],
];

const KINETICS = [
  ['Release-factor competition', 'Model competition between suppressor-tRNA accommodation and eRF1/eRF3-mediated termination.'],
  ['Ribosome dwell', 'Estimate how sequence context and decoding behaviour affect residence time at the premature stop.'],
  ['Local codon context', 'Consider the stop codon, the +4 nucleotide and surrounding sequence features that influence termination.'],
  ['Aminoacylation', 'Assess whether a design is likely to preserve productive recognition by its intended aminoacyl-tRNA synthetase.'],
  ['NMD and EJC geometry', 'Represent transcript context that can influence nonsense-mediated decay and available message abundance.'],
  ['Stress-state effects', 'Account for cellular stress, tRNA modification state, ribosome collisions and integrated-stress-response risk.'],
];

const ML = [
  ['Assay-aware learning', 'Keep experimental readouts tied to assay type, cell context, expression level and measurement method instead of treating every percentage as equivalent.'],
  ['Structured biological features', 'Combine sequence, structure, thermodynamic, evolutionary, kinetic and transcript-context features.'],
  ['Explainability', 'Use interpretable feature contributions so a shortlist can be challenged scientifically before it reaches the bench.'],
  ['Active learning', 'Use each wet-lab round to prioritise the next experiments with the highest expected information value.'],
  ['Uncertainty', 'Separate model confidence from biological promise and avoid presenting a score as evidence of therapeutic efficacy.'],
  ['Leaderboard memory', 'Preserve candidate history, assay provenance and versioned outcomes so the platform learns without erasing failed designs.'],
];

export default function PlatformPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Platform</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.3rem,5.8vw,4.3rem)' }}>Two engines.<br /><em>One experimental learning loop.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 25 }}>KritRNA is developing a coupled computational platform: one engine designs and ranks suppressor-tRNA candidates; the second models how each candidate perturbs the wider translation system. Selected candidates must then be tested experimentally.</p></Reveal>
          <Reveal delay={0.14}><div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/science">Why the design problem is hard →</Link><Link className="btn btn-ghost" href="/small-world">Explore Engine 02</Link></div></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">11 — dual-engine platform</div><h2 className="h2">Design the molecule. Model the system.</h2><p style={{ color: 'rgba(244,234,213,.7)' }}>The two engines are intended to exchange constraints. A sequence that looks viable in isolation may still fail when termination competition, transcript surveillance or cellular stress are considered.</p></div></Reveal>
          <div className="grid cols-2" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            <Reveal>
              <article className="cell" style={{ background: '#141210', height: '100%' }}>
                <div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · Suppressor-tRNA design</div>
                <h3 style={{ color: 'var(--cream)', fontSize: '1.45rem' }}>From target mutation to testable shortlist</h3>
                <p style={{ color: 'rgba(244,234,213,.7)', marginBottom: 18 }}>Candidate generation, biological filtering, structure and context evaluation, then explainable multi-objective ranking.</p>
                {ENGINE_ONE.map(([title, text], i) => <div key={title} style={{ padding: '13px 0', borderTop: '1px solid rgba(244,234,213,.13)' }}><div style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: '.7rem' }}>{String(i + 1).padStart(2, '0')} · {title}</div><div style={{ color: 'rgba(244,234,213,.72)', fontSize: '.91rem', marginTop: 4 }}>{text}</div></div>)}
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="cell" style={{ background: '#0f1512', height: '100%' }}>
                <div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · Translation small-world</div>
                <h3 style={{ color: 'var(--cream)', fontSize: '1.45rem' }}>From candidate molecule to system consequence</h3>
                <p style={{ color: 'rgba(244,234,213,.7)', marginBottom: 18 }}>A mechanistic network intended to connect translation dynamics, surveillance, stress signalling and protein output.</p>
                {ENGINE_TWO.map(([title, text], i) => <div key={title} style={{ padding: '13px 0', borderTop: '1px solid rgba(244,234,213,.13)' }}><div style={{ fontFamily: 'var(--mono)', color: 'var(--forest)', fontSize: '.7rem' }}>{String(i + 1).padStart(2, '0')} · {title}</div><div style={{ color: 'rgba(244,234,213,.72)', fontSize: '.91rem', marginTop: 4 }}>{text}</div></div>)}
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">12 — crown-jewel IP</div><h2 className="h2">The value is in the integration</h2><p>KritRNA’s intended defensibility is not one public algorithm or one database. It is the evolving combination of biological constraints, candidate-generation logic, assay-normalised evidence, mechanistic models and wet-lab feedback.</p></div></Reveal>
          <div className="grid cols-4">
            {[
              ['Design grammar', 'Rules that define viable suppressor-tRNA search space without disclosing the exact generation logic.', 'var(--magenta)'],
              ['Constraint stack', 'Coupled sequence, structure, charging, context, kinetics and safety filters.', 'var(--cyan)'],
              ['Evidence memory', 'Versioned candidate and assay records, including failures and uncertainty.', 'var(--forest)'],
              ['Closed-loop learning', 'Experimental outcomes that progressively reshape prioritisation and model calibration.', 'var(--violet)'],
            ].map(([title, text, color], i) => <Reveal key={title} delay={i * 0.05}><article className="cell" style={{ height: '100%', borderTop: `4px solid ${color}` }}><h3>{title}</h3><p>{text}</p></article></Reveal>)}
          </div>
          <Reveal delay={0.12}><div className="callout" style={{ marginTop: 24 }}>Public pages describe the architecture and scientific rationale. Proprietary model weights, feature transformations, ranking functions, training corpora and candidate sequences are not published.</div></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">18 — kinetic and translation features</div><h2 className="h2">A candidate enters a race at the ribosome</h2><p>Readthrough depends on timing and context. The model therefore needs more than a static tRNA structure score.</p></div></Reveal>
          <div className="grid cols-3">
            {KINETICS.map(([title, text], i) => <Reveal key={title} delay={(i % 3) * 0.05}><article className="cell" style={{ height: '100%' }}><div style={{ width: 9, height: 9, borderRadius: '50%', background: i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--forest)', marginBottom: 14 }} /><h3>{title}</h3><p>{text}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">19 — machine-learning layer</div><h2 className="h2">Learn from biology without flattening it</h2><p style={{ color: 'rgba(244,234,213,.7)' }}>Readthrough measurements from different assays are related but not automatically commensurable. The platform is designed to preserve experimental context rather than pooling every number into one misleading target.</p></div></Reveal>
          <div className="grid cols-3" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            {ML.map(([title, text], i) => <Reveal key={title} delay={(i % 3) * 0.05}><article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f' }}><div className="k" style={{ color: i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--forest)' }}>{String(i + 1).padStart(2, '0')}</div><h3 style={{ color: 'var(--cream)' }}>{title}</h3><p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split-2" style={{ display: 'grid', gap: 42, alignItems: 'center' }}>
          <div>
            <Reveal><div className="sec-head" style={{ marginBottom: 22 }}><div className="eyebrow">Design–test–learn</div><h2 className="h2">The bench is the evidence gate</h2></div></Reveal>
            {[
              ['Design', 'Generate a biologically constrained candidate set and document why each candidate survives the filters.'],
              ['Test', 'Measure readthrough, protein restoration, amino-acid identity, normal-stop effects and relevant cellular responses.'],
              ['Learn', 'Return assay-labelled results to the platform, update uncertainty and select the next experiments.'],
            ].map(([title, text], i) => <Reveal key={title} delay={i * 0.05}><div style={{ display: 'flex', gap: 16, padding: '16px 0', borderTop: '1px solid var(--rule)' }}><span style={{ fontFamily: 'var(--mono)', color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--violet)' : 'var(--cyan)' }}>{String(i + 1).padStart(2, '0')}</span><div><div style={{ fontWeight: 600 }}>{title}</div><div style={{ color: 'var(--ink-soft)', fontSize: '.94rem' }}>{text}</div></div></div></Reveal>)}
          </div>
          <Reveal delay={0.1}><img src="/ribosome.png" alt="Ribosome structure representing the translation system" style={{ width: '100%', filter: 'saturate(.9)' }} /></Reveal>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <Reveal><p style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'var(--ink-mute)', maxWidth: '68ch', margin: '0 auto' }}>KritRNA is at an early, preclinical research stage. These pages describe a platform under active development, not a validated therapeutic product. Experimental validation remains the next major evidence gate.</p></Reveal>
        </div>
      </section>
    </>
  );
}
