import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Translation Small-World Engine',
  description: 'KritRNA’s translation small-world architecture connects initiation, elongation, termination, quality control, stress signalling and protein output around a candidate suppressor tRNA.',
};

const LAYERS = [
  ['Transcription and splicing', 'Transcript production, exon architecture and exon-junction-complex context.'],
  ['Export and initiation', 'Message availability, initiation competence and ribosome loading.'],
  ['Elongation', 'Codon demand, endogenous tRNA supply, decoding velocity and local pausing.'],
  ['Collision and stress', 'Ribosome queues, collision sensing and activation thresholds for stress pathways.'],
  ['Termination', 'Competition among suppressor tRNA, eRF1/eRF3 and local stop-context effects.'],
  ['Recycling', 'Post-termination ribosome recycling and availability for subsequent translation rounds.'],
  ['NMD and quality control', 'UPF-dependent surveillance, ribosome rescue and no-go/quality-control responses.'],
  ['Folding and proteostasis', 'Consequences of altered translation timing for protein folding, chaperones and degradation.'],
];

const PLAYERS = [
  ['Ribosome', 'The central translation machine and the site of the candidate intervention.'],
  ['Suppressor tRNA', 'The designed perturbation introduced into the network.'],
  ['Aminoacyl-tRNA synthetase', 'Charges the tRNA and determines whether amino-acid identity is preserved.'],
  ['eRF1 / eRF3', 'Compete for recognition and termination at stop codons.'],
  ['ABCE1', 'Supports recycling after termination.'],
  ['UPF1 / UPF2 / UPF3', 'Core nonsense-mediated-decay machinery that influences transcript persistence.'],
  ['PELO / HBS1', 'Ribosome-rescue machinery relevant to stalled or problematic translation events.'],
  ['ZAKα / GCN2 / PERK / PKR / HRI', 'Stress sensors that can connect ribosome or cellular perturbation to the integrated stress response.'],
  ['eIF2α / ATF4', 'Downstream stress-response nodes affecting global translation and adaptation.'],
  ['Chaperones and proteostasis systems', 'Determine whether a restored polypeptide reaches a stable and useful state.'],
];

const MATH = [
  ['Small-world graph metrics', 'Represent high local clustering with short paths between translation, surveillance and stress modules.'],
  ['Graph Laplacian diffusion', 'Propagate a candidate perturbation across connected biological modules.'],
  ['Markov transitions', 'Model probabilistic progression among decoding, pausing, termination, readthrough and rescue states.'],
  ['Queueing models', 'Represent ribosome traffic, spacing, queues and collision probability on an mRNA.'],
  ['ODE thresholds', 'Describe stress-response activation and recovery as coupled dynamic systems.'],
  ['Stochastic simulation', 'Capture cell-to-cell and event-to-event variability that deterministic averages can hide.'],
];

const SOURCES = [
  ['tRNA sequence and annotation', 'GtRNAdb, tRNAscan-SE outputs and curated species-specific records.'],
  ['tRNA modification biology', 'MODOMICS and primary literature on identity, processing and modification.'],
  ['Transcript architecture', 'Ensembl, APPRIS and exon-junction / isoform context.'],
  ['Termination context', 'Stop-codon neighbourhoods, +4 base effects and curated readthrough literature.'],
  ['Expression and abundance', 'Expression Atlas and context-specific RNA/tRNA abundance datasets.'],
  ['Ribosome behaviour', 'Ribo-seq and other translation-profiling datasets where assay quality supports use.'],
  ['Structure and thermodynamics', 'RNA secondary/tertiary prediction, experimentally resolved structures and simulation-derived features.'],
  ['Experimental outcomes', 'Literature-curated suppressor-tRNA assays and future KritRNA wet-lab results stored with provenance.'],
];

const SCHEMA = [
  ['Assay identity', 'Reporter type, detection method, calibration, normalisation and analytical endpoint.'],
  ['Biological context', 'Species, cell type, gene, mutation, transcript isoform and local sequence.'],
  ['Candidate context', 'tRNA scaffold, anticodon, intended amino acid, expression design and delivery method.'],
  ['Dose and expression', 'Amount, promoter, copy number, transfection or delivery conditions and exposure time.'],
  ['Outcome separation', 'Readthrough signal, full-length protein, protein function, normal-stop readthrough and toxicity remain distinct labels.'],
  ['Provenance and uncertainty', 'Source, figure/table location, extraction method, confidence, missingness and curation notes.'],
];

export default function SmallWorldPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Engine 02</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.3rem,5.8vw,4.35rem)' }}>Translation is a network,<br /><em>not a single reaction.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 25 }}>A suppressor tRNA enters a connected system of decoding, termination, surveillance, ribosome traffic, stress signalling and protein folding. KritRNA’s small-world engine is intended to model those interactions before a candidate is advanced.</p></Reveal>
          <Reveal delay={0.14}><div style={{ marginTop: 30, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">Return to the dual platform →</Link><Link className="btn btn-ghost" href="/science">Read the core biology</Link></div></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">21 — biological layers</div><h2 className="h2">From transcript birth to protein fate</h2><p style={{ color: 'rgba(244,234,213,.7)' }}>The model is organised as connected layers rather than a flat feature list. A perturbation at the stop codon can propagate upstream and downstream through the translation system.</p></div></Reveal>
          <div className="grid cols-4" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            {LAYERS.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 4) * 0.04}>
                <article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f' }}>
                  <div className="k" style={{ color: i % 4 === 0 ? 'var(--magenta)' : i % 4 === 1 ? 'var(--cyan)' : i % 4 === 2 ? 'var(--forest)' : 'var(--violet)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ color: 'var(--cream)' }}>{title}</h3>
                  <p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">22 — molecular players</div><h2 className="h2">The candidate is only one node</h2><p>Each molecular player creates a possible bottleneck, source of competition or safety signal. The network model is intended to make those dependencies explicit.</p></div></Reveal>
          <div className="grid cols-2">
            {PLAYERS.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 4) * 0.03}>
                <article className="cell" style={{ height: '100%', display: 'flex', gap: 15, alignItems: 'flex-start' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--forest)', marginTop: 7, flex: 'none' }} />
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">23 — computational backbone</div><h2 className="h2">Different biological questions need different mathematics</h2><p>No single model class can credibly represent sequence design, ribosome traffic, network diffusion and stress dynamics. The architecture combines methods according to the mechanism being modelled.</p></div></Reveal>
          <div className="grid cols-3">
            {MATH.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 3) * 0.05}>
                <article className="cell" style={{ height: '100%', borderTop: `4px solid ${i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--forest)'}` }}>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><div className="callout" style={{ marginTop: 24 }}>These are architecture components under development. The public website does not claim that every module is fully trained, calibrated or experimentally validated.</div></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">24 — data architecture</div><h2 className="h2">Public knowledge becomes useful only after biological alignment</h2><p style={{ color: 'rgba(244,234,213,.7)' }}>Databases, structures, expression records and experiments describe different parts of the system. The platform is intended to connect them through explicit biological entities and provenance.</p></div></Reveal>
          <div className="grid cols-4" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            {SOURCES.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 4) * 0.04}>
                <article className="cell" style={{ height: '100%', background: i % 2 ? '#141210' : '#10100f' }}>
                  <div className="k" style={{ color: i % 4 === 0 ? 'var(--magenta)' : i % 4 === 1 ? 'var(--cyan)' : i % 4 === 2 ? 'var(--forest)' : 'var(--violet)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ color: 'var(--cream)' }}>{title}</h3>
                  <p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split-2" style={{ display: 'grid', gap: 44, alignItems: 'start' }}>
          <Reveal>
            <div>
              <div className="eyebrow">25 — dataset philosophy</div>
              <h2 className="h2" style={{ marginTop: 14 }}>Schema before scale</h2>
              <p className="lead" style={{ marginTop: 20 }}>A dual-luciferase readthrough value, Western-blot densitometry and functional protein rescue may describe related biology, but they are not the same label. Pooling them naively produces noise that looks like signal.</p>
              <div className="callout" style={{ marginTop: 24 }}>KritRNA’s dataset philosophy is to preserve assay context, separate outcome types and record uncertainty before increasing dataset size.</div>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)', borderRadius: 8, overflow: 'hidden' }}>
            {SCHEMA.map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div style={{ background: 'var(--paper)', padding: '19px 22px', display: 'grid', gridTemplateColumns: 'minmax(130px,.65fr) 1.35fr', gap: 18 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: i % 2 ? 'var(--cyan)' : 'var(--magenta)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{title}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: '.93rem' }}>{text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <Reveal><h2 className="h2">Model the translation system, then challenge it at the bench.</h2></Reveal>
          <Reveal delay={0.06}><p className="lead" style={{ margin: '16px auto 0' }}>The small-world engine is designed to generate testable system-level hypotheses. Experimental evidence remains the authority.</p></Reveal>
          <Reveal delay={0.1}><div style={{ marginTop: 28 }}><Link className="btn btn-solid" href="/pipeline">See the initial research programs →</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
