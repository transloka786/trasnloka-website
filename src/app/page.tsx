import Link from 'next/link';
import LogoFormation from '@/components/LogoFormation';
import TranslationTrack from '@/components/TranslationTrack';
import Reveal from '@/components/Reveal';
import { PROGRAMS } from '@/lib/content';

const AUDIENCES = [
  ['Families & advocates', 'Understand how premature stop codons interrupt protein production and why suppressor tRNA offers a new route toward restoration.', '/resources', 'Explore the science in plain language'],
  ['Scientists & development partners', 'Examine the molecular logic, dual-engine architecture, experimental strategy and collaboration opportunities behind the platform.', '/platform', 'Enter the platform'],
  ['Investors & strategic partners', 'Review the shared-mechanism thesis, development strategy, programme logic and India-built biotechnology opportunity.', '/investors', 'View the investment thesis'],
  ['Builders of the company', 'Join a founding-stage team working across computation, molecular biology, operations and scientific communication.', '/careers', 'Explore open roles'],
];

export default function Home() {
  return (
    <>
      <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--rule)' }}>
        <LogoFormation />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 24 }}>AI-guided suppressor tRNA therapeutics</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1">Reading through <em>silence</em>,<br />restoring the protein.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 28 }}>KritRNA is building a programmable therapeutic platform for diseases caused by premature stop codons. Our suppressor tRNA strategy is designed to help the ribosome continue translation and recover full-length protein from the cell’s own mRNA—without permanently editing DNA.</p></Reveal>
          <Reveal delay={0.15}><div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/science">Understand the science →</Link><Link className="btn btn-ghost" href="/platform">Explore the platform</Link></div></Reveal>
        </div>
      </header>

      <section className="ink-sec" style={{ borderTop: 'none' }}><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">The molecular problem</div><h2 className="h2">The cell reaches “stop” too early</h2></div></Reveal>
        <Reveal delay={0.05}><p className="lead">A nonsense mutation inserts an early stop signal into a protein-coding message. The ribosome leaves before the protein is complete, often reducing or eliminating a protein the cell needs.</p></Reveal>
        <Reveal delay={0.1}><TranslationTrack /></Reveal>
        <div style={{ marginTop: 40 }}><Reveal><div className="sec-head" style={{ marginBottom: 20 }}><div className="eyebrow">The KritRNA approach</div><h2 className="h2">Reprogramme translation to continue</h2></div></Reveal><Reveal delay={0.05}><p className="lead">Engineered suppressor tRNAs can recognise selected premature stop codons and deliver an amino acid, allowing the ribosome to continue toward a full-length protein. The modality has already shown promise in peer-reviewed cellular and in-vivo studies. KritRNA is building the computational and experimental system needed to make that possibility precise, programmable and disease-relevant.</p></Reveal><Reveal delay={0.1}><TranslationTrack readthrough /></Reveal></div>
        <Reveal delay={0.12}><div style={{ marginTop: 28 }}><Link className="btn btn-ghost" href="/science" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Read the detailed science →</Link></div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Discover KritRNA</div><h2 className="h2">Different perspectives. One scientific mission.</h2><p>KritRNA connects molecular science, therapeutic design, company building and patient-centred communication within one focused platform.</p></div></Reveal>
        <div className="grid cols-4">{AUDIENCES.map(([title, text, href, action], i) => <Reveal key={title} delay={i * 0.05}><article className="cell" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)'}` }}><h3>{title}</h3><p style={{ flex: 1 }}>{text}</p><Link href={href} style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: '.72rem', color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)' }}>{action} →</Link></article></Reveal>)}</div>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">The platform</div><h2 className="h2">Design the molecule. Model the system.</h2><p>KritRNA is developing two connected engines that transform a target nonsense mutation into a biologically constrained, experimentally testable suppressor tRNA shortlist.</p></div></Reveal>
        <div className="grid cols-2"><Reveal><div className="cell"><div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · suppressor-tRNA design</div><h3>Candidate generation and ranking</h3><p>Sequence design, processing and identity constraints, structure and thermodynamics, kinetic context, normal-stop risk, explainable scoring and Pareto selection.</p></div></Reveal><Reveal delay={0.08}><div className="cell"><div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · translation small-world</div><h3>System-level consequence modelling</h3><p>A mechanistic network connecting initiation, elongation, termination, ribosome traffic, NMD, rescue, stress signalling, folding and protein output.</p></div></Reveal></div>
        <Reveal delay={0.1}><div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">See the dual-engine architecture →</Link><Link className="btn btn-ghost" href="/small-world">Explore the small-world engine</Link></div></Reveal>
      </div></section>

      <section className="ink-sec"><div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'center' }}>
        <Reveal><div><div className="eyebrow">India-first biotechnology</div><h2 className="h2" style={{ marginTop: 14 }}>Built in India. Designed for global science.</h2><p className="lead" style={{ marginTop: 20 }}>KritRNA is creating India-owned capability in suppressor tRNA therapeutics, computational translation biology and evidence-driven drug discovery—while building to global scientific and regulatory standards.</p><div style={{ marginTop: 25 }}><Link className="btn btn-ghost" href="/india" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>See the India-first strategy →</Link></div></div></Reveal>
        <Reveal delay={0.08}><div style={{ border: '1px solid rgba(244,234,213,.18)', borderRadius: 9, padding: 25 }}>{['Scientific ownership from India', 'β-thalassemia as an India-priority programme', 'Evidence generated through formal collaborations', 'Global scientific and regulatory standards'].map((item, i) => <div key={item} style={{ padding: '14px 0', borderTop: i ? '1px solid rgba(244,234,213,.14)' : 'none', color: 'rgba(244,234,213,.8)', display: 'flex', gap: 12 }}><span style={{ color: i % 2 ? 'var(--cyan)' : 'var(--magenta)' }}>→</span>{item}</div>)}</div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Initial research focus</div><h2 className="h2">Three programmes. One programmable modality.</h2><p>Our first programmes test the platform across hematology, neuromuscular disease and oncology.</p></div></Reveal>
        <div className="grid cols-3">{PROGRAMS.map((program, i) => <Reveal key={program.name} delay={i * 0.06}><div className="cell"><div className="k" style={{ color: program.accent }}>{program.area}</div><h3>{program.name}</h3><p>{program.goal}</p><div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--rule)' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Current milestone</div><div style={{ marginTop: 5, fontWeight: 600 }}>{program.stage}</div><div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '.86rem' }}>Next: {program.next}</div></div></div></Reveal>)}</div>
        <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/pipeline">Explore the research programmes →</Link></div></Reveal>
      </div></section>

      <section className="ink-sec center"><div className="wrap">
        <Reveal><div className="eyebrow" style={{ justifyContent: 'center' }}>The meaning of KritRNA</div></Reveal><Reveal delay={0.04}><h2 className="h1" style={{ margin: '18px auto 0', maxWidth: '20ch' }}><em style={{ color: '#ff6f9c' }}>Creation</em> through the language of <em style={{ color: '#6bdcff' }}>RNA.</em></h2></Reveal><Reveal delay={0.08}><p className="lead" style={{ margin: '22px auto 0', color: 'rgba(244,234,213,.72)' }}>KritRNA brings together “Krit”—our shorthand for deliberate creation—with RNA, the molecular language we engineer. The name expresses our purpose: redesign translation so a premature stop does not have to be the end of the message.</p></Reveal>
        <Reveal delay={0.12}><div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/partners" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>Scientific or CRO collaboration</Link><Link className="btn btn-ghost" href="/investors" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Investor discussion</Link><Link className="btn btn-ghost" href="/careers" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Join the team</Link></div></Reveal>
      </div></section>
    </>
  );
}