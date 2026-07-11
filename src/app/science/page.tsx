import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Science',
  description: 'One molecular failure across many diseases—and the promise of programmable suppressor tRNA therapeutics.',
};

const FAILURE = [
  ['01', 'Premature stop', 'A nonsense mutation changes a coding triplet into UAA, UAG or UGA before the intended end of the message.'],
  ['02', 'Interrupted translation', 'The ribosome terminates early, producing a shortened protein or no useful protein output.'],
  ['03', 'Message surveillance', 'The transcript may also be reduced through nonsense-mediated mRNA decay, further lowering protein production.'],
];

const ADVANTAGES = [
  ['Works at the translation layer', 'Suppressor tRNAs act on the mRNA message during protein synthesis rather than permanently editing genomic DNA.'],
  ['Programmable by stop codon and context', 'Candidate tRNAs can be designed around the selected premature stop, intended amino acid and local sequence environment.'],
  ['Potentially reusable across diseases', 'Different diseases can share the same molecular failure class, allowing knowledge to compound across programmes.'],
  ['Compatible with the patient’s own mRNA', 'The goal is to recover full-length protein from the endogenous transcript already produced by the cell.'],
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
];

const REFERENCES = [
  { label: 'Suppressor-tRNA evidence', title: 'Engineered tRNAs suppress nonsense mutations in cells and in vivo', detail: 'Nature 618, 842–848 (2023) · DOI 10.1038/s41586-023-06133-1', href: 'https://doi.org/10.1038/s41586-023-06133-1' },
  { label: 'Lead-gene reference', title: 'HBB — haemoglobin subunit beta', detail: 'NCBI Gene record 3043', href: 'https://www.ncbi.nlm.nih.gov/gene/3043' },
  { label: 'Program-gene reference', title: 'DMD — dystrophin', detail: 'NCBI Gene record 1756', href: 'https://www.ncbi.nlm.nih.gov/gene/1756' },
  { label: 'Program-gene reference', title: 'TP53 — tumour protein p53', detail: 'NCBI Gene record 7157', href: 'https://www.ncbi.nlm.nih.gov/gene/7157' },
];

export default function SciencePage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}><div className="wrap">
        <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Science</div></Reveal>
        <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.35rem,6vw,4.5rem)' }}>One molecular failure.<br /><em>Many diseases. One programmable answer.</em></h1></Reveal>
        <Reveal delay={0.1}><p className="lead" style={{ marginTop: 26 }}>Premature termination codons appear in different genes and diseases, yet they create the same translation-level failure: protein synthesis stops before completion. KritRNA is building around that shared mechanism with engineered suppressor tRNAs designed to help the ribosome continue.</p></Reveal>
      </div></section>

      <section className="ink-sec"><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">The shared mechanism</div><h2 className="h2">A common molecular failure hidden across fragmented diseases</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>Disease names differ. The molecular event can be the same: a premature stop prevents production of the full-length protein.</p></div></Reveal>
        <div className="grid cols-3" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>
          {FAILURE.map(([n, title, text], i) => <Reveal key={n} delay={i * 0.06}><div className="cell" style={{ height: '100%', background: i === 1 ? '#141210' : '#10100f' }}><div className="k" style={{ color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : 'var(--violet)' }}>{n}</div><h3 style={{ color: 'var(--cream)' }}>{title}</h3><p style={{ color: 'rgba(244,234,213,.7)' }}>{text}</p></div></Reveal>)}
        </div>
        <Reveal delay={0.12}><blockquote style={{ marginTop: 32, maxWidth: '34ch', fontFamily: 'var(--serif)', fontSize: 'clamp(1.45rem,3vw,2.2rem)', lineHeight: 1.25, color: 'var(--cream)' }}>Many disease labels. One interrupted instruction.</blockquote></Reveal>
      </div></section>

      <section><div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'start' }}>
        <Reveal><div><div className="eyebrow">The answer</div><h2 className="h2" style={{ marginTop: 14 }}>Suppressor tRNA: a programmable way to restore translation</h2><p className="lead" style={{ marginTop: 20 }}>An engineered suppressor tRNA can recognise a selected premature stop and deliver an amino acid, allowing the ribosome to continue toward a full-length protein. This is a distinct therapeutic modality: it operates at the level of translation, works with the cell’s own mRNA and does not require permanent DNA editing.</p><div className="callout" style={{ marginTop: 24 }}>Engineered suppressor tRNAs have already shown promise in peer-reviewed cellular and in-vivo studies. KritRNA’s role is to make that promise more precise, designable and experimentally actionable.</div></div></Reveal>
        <Reveal delay={0.08}><div style={{ border: '1px solid var(--rule)', background: 'var(--paper)', borderRadius: 10, padding: 28 }}><div className="k" style={{ color: 'var(--cyan)' }}>Mechanistic sequence</div>{['Disease-causing PTC identified', 'Suppressor-tRNA candidates designed', 'Biological constraints and risks assessed', 'Selected candidates tested experimentally', 'Protein restoration and safety readouts reviewed'].map((step, i) => <div key={step} style={{ display: 'flex', gap: 15, padding: '13px 0', borderTop: i ? '1px solid var(--rule)' : 'none' }}><span style={{ fontFamily: 'var(--mono)', color: 'var(--magenta)', minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</span><span>{step}</span></div>)}</div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Why this modality matters</div><h2 className="h2">A new therapeutic logic for nonsense mutations</h2><p>Suppressor tRNAs offer a combination of programmability, molecular specificity and cross-disease platform potential that is unusual among therapeutic modalities.</p></div></Reveal>
        <div className="grid cols-2">{ADVANTAGES.map(([title, text], i) => <Reveal key={title} delay={(i % 2) * 0.05}><article className="cell" style={{ height: '100%', borderTop: `4px solid ${i % 2 ? 'var(--cyan)' : 'var(--magenta)'}` }}><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Design constraints</div><h2 className="h2">The opportunity is powerful because the biology is demanding</h2><p>A successful candidate must satisfy several coupled biological constraints at once. KritRNA evaluates each design as a complete molecule in a specific transcript and cellular context.</p></div></Reveal>
        <div className="grid cols-2">{CONSTRAINTS.map(([title, text], i) => <Reveal key={title} delay={(i % 4) * 0.035}><article className="cell" style={{ height: '100%' }}><div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}><span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: i % 2 ? 'var(--cyan)' : 'var(--magenta)', marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></div></article></Reveal>)}</div>
      </div></section>

      <section className="ink-sec"><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Scientific foundation</div><h2 className="h2">Built on evidence, advanced through experimentation</h2><p style={{ color: 'rgba(244,234,213,.72)' }}>The modality has credible scientific precedent. KritRNA’s programmes now focus on designing better candidates, testing them rigorously and building a repeatable platform around the biology.</p></div></Reveal>
        <div className="grid cols-2" style={{ background: 'rgba(244,234,213,.14)', borderColor: 'rgba(244,234,213,.14)' }}>{REFERENCES.map((reference, i) => <Reveal key={reference.href} delay={(i % 2) * 0.05}><a href={reference.href} target="_blank" rel="noopener noreferrer" className="cell" style={{ height: '100%', display: 'block', background: i % 2 ? '#141210' : '#10100f' }}><div className="k" style={{ color: i % 2 ? 'var(--cyan)' : 'var(--magenta)' }}>{reference.label}</div><h3 style={{ color: 'var(--cream)' }}>{reference.title}</h3><p style={{ color: 'rgba(244,234,213,.68)' }}>{reference.detail}</p><div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--cyan)' }}>Open source ↗</div></a></Reveal>)}</div>
      </div></section>

      <section className="center"><div className="wrap"><Reveal><h2 className="h2">The science defines the platform.</h2></Reveal><Reveal delay={0.06}><p className="lead" style={{ margin: '16px auto 0' }}>KritRNA combines candidate design with translation-system modelling so every suppressor tRNA is evaluated as both a molecule and a systems-level intervention.</p></Reveal><Reveal delay={0.1}><div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">Explore the platform →</Link><Link className="btn btn-ghost" href="/small-world">Enter the small-world model</Link></div></Reveal></div></section>
    </>
  );
}
