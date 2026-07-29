import Link from 'next/link';
import Reveal from '@/components/Reveal';

const pillars = [
  {
    title: 'Landscape intelligence',
    text: 'KritRNA maps the premature-stop landscape at variant, gene, transcript and disease-mechanism level so programme selection begins with biological relevance rather than raw mutation counts.',
    href: '/problem',
    action: 'Explore the problem landscape',
    color: 'var(--magenta)',
  },
  {
    title: 'Candidate-quality gates',
    text: 'Charging, transcript context, binding-tissue delivery and native-stop safety form the four decisive gates through which every therapeutic concept must pass.',
    href: '/science',
    action: 'See the scientific gates',
    color: 'var(--cyan)',
  },
  {
    title: 'Programme selection',
    text: 'Disease opportunity is assessed across mechanism, addressable mutation burden, restoration logic, delivery feasibility, model availability, India relevance and development fit.',
    href: '/pipeline',
    action: 'Review the programme logic',
    color: 'var(--forest)',
  },
  {
    title: 'India-originated capability',
    text: 'KritRNA is building population-aware evidence and therapeutic origination capability from India while aligning development decisions with global scientific standards.',
    href: '/india',
    action: 'Understand the India strategy',
    color: 'var(--violet)',
  },
];

const standards = [
  ['Measured', 'Directly supported by a cited dataset, publication or experimental result.'],
  ['Inferred', 'A reasoned conclusion derived from available evidence and labelled accordingly.'],
  ['To be tested', 'A defined question that becomes a specific experiment, collaboration or milestone.'],
];

export default function EvidencePage() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <Reveal><div className="eyebrow">Evidence at KritRNA</div></Reveal>
        <Reveal delay={0.04}><h1 className="h1" style={{ marginTop: 18 }}>Evidence that moves<br /><em>programmes forward.</em></h1></Reveal>
        <Reveal delay={0.08}><p className="lead" style={{ marginTop: 24 }}>KritRNA is building a public-facing evidence layer that shows why suppressor tRNA matters, how programmes are selected and which scientific questions create the next value inflection point—without disclosing candidate sequences, confidential rankings or unfiled intellectual property.</p></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Decision architecture</div><h2 className="h2">From a large biological opportunity to focused therapeutic programmes.</h2><p>The strength of a platform is not the volume of data it collects. It is the quality of the decisions that data enables.</p></div></Reveal>
        <div className="grid cols-2">{pillars.map((pillar, i) => <Reveal key={pillar.title} delay={i * 0.05}><article className="cell" style={{ height: '100%', borderTop: `4px solid ${pillar.color}` }}><h3>{pillar.title}</h3><p>{pillar.text}</p><Link href={pillar.href} style={{ display: 'inline-block', marginTop: 18, fontFamily: 'var(--mono)', fontSize: '.72rem', color: pillar.color }}>{pillar.action} →</Link></article></Reveal>)}</div>
      </div></section>

      <section className="ink-sec"><div className="wrap split-2">
        <Reveal><div><div className="eyebrow">Public evidence standard</div><h2 className="h2" style={{ marginTop: 16 }}>Clear about what is known. Precise about what comes next.</h2><p className="lead" style={{ marginTop: 20 }}>KritRNA separates direct evidence, scientific inference and future validation so collaborators and investors can see how each decision is supported and how uncertainty becomes an executable development plan.</p></div></Reveal>
        <Reveal delay={0.08}><div style={{ border: '1px solid rgba(244,234,213,.18)', borderRadius: 9, padding: 25 }}>{standards.map(([title, text], i) => <div key={title} style={{ padding: '16px 0', borderTop: i ? '1px solid rgba(244,234,213,.14)' : 'none' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: i === 0 ? 'var(--cyan)' : i === 1 ? '#ff6f9c' : '#a98bea', textTransform: 'uppercase', letterSpacing: '.08em' }}>{title}</div><p style={{ marginTop: 7, color: 'rgba(244,234,213,.75)' }}>{text}</p></div>)}</div></Reveal>
      </div></section>

      <section><div className="wrap center">
        <Reveal><div className="eyebrow" style={{ justifyContent: 'center' }}>Build with us</div></Reveal>
        <Reveal delay={0.04}><h2 className="h2" style={{ marginTop: 16 }}>The next layer of evidence is created through collaboration.</h2></Reveal>
        <Reveal delay={0.08}><p className="lead" style={{ margin: '18px auto 0' }}>KritRNA is seeking scientific, CRO, delivery, disease-model and strategic partners who can help convert rigorous programme logic into proprietary experimental evidence.</p></Reveal>
        <Reveal delay={0.12}><div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/partners">Explore collaboration →</Link><Link className="btn btn-ghost" href="/investors">View the investment thesis</Link></div></Reveal>
      </div></section>
    </>
  );
}