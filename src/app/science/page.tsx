import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Science',
  description: 'Why premature termination codons create a shared disease mechanism, how suppressor tRNAs can enable readthrough, and why therapeutic design is biologically difficult.',
};

const FAILURE = [
  ['01', 'Premature stop', 'A nonsense mutation changes a coding triplet into UAA, UAG or UGA before the intended end of the message.'],
  ['02', 'Interrupted translation', 'The ribosome terminates early, producing a shortened protein or no useful protein output.'],
  ['03', 'Message surveillance', 'The transcript may also be reduced through nonsense-mediated mRNA decay, further lowering protein production.'],
];

const CONSTRAINTS = [
  ['Codon recognition', 'Recognise the selected premature stop in its local sequence context.'],
  ['Folding', 'Preserve the tRNA architecture required for processing and function.'],
  ['Aminoacylation identity', 'Retain the identity elements needed for charging by the intended aminoacyl-tRNA synthetase.'],
  ['Release-factor competition', 'Reach the ribosomal A site and compete with eRF1/eRF3 at the premature stop.'],
  ['Natural-stop control', 'Limit unacceptable readthrough at normal termination codons.'],
  ['Cellular context', 'Function under the tRNA abundance, modification and stress state of the relevant cell.'],
  ['Protein consequence', 'Insert an amino acid compatible with restoration of useful protein structure or function.'],
  ['Processing and delivery', 'Survive maturation, expression and delivery constraints without losing activity.'],
  ['Stress and toxicity', 'Avoid excessive mistranslation, ribosome stress or integrated-stress-response activation.'],
  ['Therapeutic threshold', 'Restore enough correctly functioning protein to justify experimental advancement.'],
];

export default function SciencePage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Science</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.35rem,6vw,4.5rem)' }}>One molecular failure.<br /><em>Many disease contexts.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 26 }}>Premature termination codons are scattered across different genes and rare diseases, but they can create the same translation-level problem: the protein-making message stops before completion. KritRNA is building around that shared mechanism.</p></Reveal>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">08 — why this matters</div><h2 className="h2">A platform opportunity hidden inside fragmented diseases</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>Traditional development often begins with a disease name. KritRNA begins with a defined molecular failure class: premature termination that prevents full-length protein production.</p></div></Reveal>
          <div className="grid cols-3" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
            {FAILURE.map(([n, title, text], i) => (
              <Reveal key={n} delay={i * 0.06}>
                <div className="cell" style={{ height: '100%', background: i === 1 ? '#141210' : '#10100f' }}>
                  <div className="k" style={{ color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : 'var(--violet)' }}>{n}</div>
                  <h3 style={{ color: 'var(--cream)' }}>{title}</h3>
                  <p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}><blockquote style={{ marginTop: 32, maxWidth: '34ch', fontFamily: 'var(--serif)', fontSize: 'clamp(1.45rem,3vw,2.2rem)', lineHeight: 1.25, color: 'var(--cream)' }}>Hundreds of mutations can be viewed as variations of the same translation-level silence.</blockquote></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'start' }}>
          <Reveal>
            <div>
              <div className="eyebrow">The modality</div>
              <h2 className="h2" style={{ marginTop: 14 }}>Programmable translation correction</h2>
              <p className="lead" style={{ marginTop: 20 }}>An engineered suppressor tRNA is designed to recognise a selected premature stop and deliver an amino acid so the ribosome can continue translation. The approach acts at the level of translation; it does not edit the patient’s DNA.</p>
              <div className="callout" style={{ marginTop: 24 }}>Readthrough is not automatically therapeutic. The inserted amino acid, restored protein, normal-stop effects, delivery and cellular response must be tested for every candidate and disease context.</div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ border: '1px solid var(--rule)', background: 'var(--paper)', borderRadius: 10, padding: 28 }}>
              <div className="k" style={{ color: 'var(--cyan)' }}>Mechanistic sequence</div>
              {['Disease-causing PTC identified', 'Suppressor-tRNA candidates designed', 'Biological constraints and risks assessed', 'Selected candidates tested experimentally', 'Protein restoration and safety readouts reviewed'].map((step, i) => (
                <div key={step} style={{ display: 'flex', gap: 15, padding: '13px 0', borderTop: i ? '1px solid var(--rule)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--magenta)', minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">10 — why suppressor tRNA is hard</div><h2 className="h2">It is not an anticodon edit</h2><p>A candidate must satisfy several coupled biological constraints at once. Improving one property can damage another, which is why random sequence testing is an inefficient development strategy.</p></div></Reveal>
          <div className="grid cols-2">
            {CONSTRAINTS.map(([title, text], i) => (
              <Reveal key={title} delay={(i % 4) * 0.035}>
                <article className="cell" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: i % 2 ? 'var(--cyan)' : 'var(--magenta)', marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="center">
        <div className="wrap">
          <Reveal><h2 className="h2">The science defines the platform architecture.</h2></Reveal>
          <Reveal delay={0.06}><p className="lead" style={{ margin: '16px auto 0' }}>KritRNA combines candidate design with translation-system modelling so a suppressor tRNA is evaluated as both a molecule and a network intervention.</p></Reveal>
          <Reveal delay={0.1}><div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">Explore the platform →</Link><Link className="btn btn-ghost" href="/small-world">Enter the small-world model</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
