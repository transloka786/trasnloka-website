import Link from 'next/link';
import LogoFormation from '@/components/LogoFormation';
import TranslationTrack from '@/components/TranslationTrack';
import Reveal from '@/components/Reveal';
import { PROGRAMS } from '@/lib/content';

const AUDIENCES = [
  ['Patients & families', 'Understand the science in plain language. KritRNA is research-stage and does not currently offer a treatment or trial.', '/science', 'Read the science'],
  ['Scientists & CROs', 'Review the platform architecture, experimental gates and collaboration areas for candidate validation.', '/platform', 'Explore the platform'],
  ['Investors & partners', 'See the platform thesis, milestones, risks and India-first execution strategy.', '/investors', 'Investor overview'],
  ['Talent', 'See open founding and internship roles across computation, research, operations and outreach.', '/careers', 'View careers'],
];

const CREDIBILITY = [
  ['Entity', 'Transloka Bio Pvt. Ltd.'],
  ['Base', 'Noida, Uttar Pradesh, India'],
  ['Scientific anchor', 'Peer-reviewed suppressor-tRNA work in Nature'],
  ['Stage', 'Early preclinical research'],
  ['Initial programmes', 'HBB · DMD · CFTR'],
];

export default function Home() {
  return (
    <>
      <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--rule)' }}>
        <LogoFormation />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 24 }}>AI-guided suppressor tRNA therapeutics</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1">Reading through <em>silence</em>,<br />restoring the protein.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 28 }}>A premature stop codon can interrupt protein synthesis and contribute to genetic disease. KritRNA is developing suppressor-tRNA designs intended to help the ribosome read through selected premature stops. Every candidate must be tested experimentally for activity, identity and safety.</p></Reveal>
          <Reveal delay={0.15}><div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/science">Understand the science →</Link><Link className="btn btn-ghost" href="/platform">Explore the platform</Link></div></Reveal>
          <Reveal delay={0.2}><p style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', letterSpacing: '.04em' }}>Scroll to assemble the tRNAs. Return upward to release them.</p></Reveal>
        </div>
      </header>

      <section style={{ padding: '26px 0' }}><div className="wrap"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', border: '1px solid var(--rule)', borderRadius: 8, overflow: 'hidden' }} className="credibility-strip">{CREDIBILITY.map(([label, value], i) => <div key={label} style={{ padding: '17px 16px', background: 'var(--paper)', borderLeft: i ? '1px solid var(--rule)' : 'none' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.61rem', letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>{label}</div><div style={{ marginTop: 5, fontSize: '.84rem', fontWeight: 600 }}>{value}</div></div>)}</div></div></section>

      <section className="ink-sec" style={{ borderTop: 'none' }}><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">19 — the disease, simply</div><h2 className="h2">The cell reaches “stop” too early</h2></div></Reveal>
        <Reveal delay={0.05}><p className="lead">Genes carry instructions for making proteins. The ribosome reads those instructions three letters at a time. A nonsense mutation can place an early stop signal in the message, so the ribosome leaves before the protein is finished.</p></Reveal>
        <Reveal delay={0.1}><TranslationTrack /></Reveal>
        <div style={{ marginTop: 40 }}><Reveal><div className="sec-head" style={{ marginBottom: 20 }}><div className="eyebrow">A possible route forward</div><h2 className="h2">Help the ribosome continue past the early stop</h2></div></Reveal><Reveal delay={0.05}><p className="lead">A suppressor tRNA can be engineered to recognise a selected premature stop and add an amino acid so translation may continue. It must still be proven that the resulting protein is correctly restored and that the design is selective and safe.</p></Reveal><Reveal delay={0.1}><TranslationTrack readthrough /></Reveal></div>
        <Reveal delay={0.12}><div style={{ marginTop: 28 }}><Link className="btn btn-ghost" href="/science" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Read the detailed science →</Link></div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">18 — choose your pathway</div><h2 className="h2">One website, four different questions</h2><p>The public, scientists, investors and potential team members need different levels of detail. Start with the path relevant to you.</p></div></Reveal>
        <div className="grid cols-4">{AUDIENCES.map(([title, text, href, action], i) => <Reveal key={title} delay={i * 0.05}><article className="cell" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)'}` }}><h3>{title}</h3><p style={{ flex: 1 }}>{text}</p><Link href={href} style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: '.72rem', color: i === 0 ? 'var(--magenta)' : i === 1 ? 'var(--cyan)' : i === 2 ? 'var(--forest)' : 'var(--violet)' }}>{action} →</Link></article></Reveal>)}</div>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">The platform</div><h2 className="h2">Design the molecule. Model the system.</h2><p>KritRNA is developing two connected engines to move from a target nonsense variant to a biologically constrained, experimentally testable shortlist.</p></div></Reveal>
        <div className="grid cols-2"><Reveal><div className="cell"><div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · suppressor-tRNA design</div><h3>Candidate generation and ranking</h3><p>Sequence design, processing and identity constraints, structure and thermodynamics, kinetic context, normal-stop risk, explainable scoring and Pareto selection.</p></div></Reveal><Reveal delay={0.08}><div className="cell"><div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · translation small-world</div><h3>System-level consequence modelling</h3><p>A mechanistic network connecting initiation, elongation, termination, ribosome traffic, NMD, rescue, stress signalling, folding and protein output.</p></div></Reveal></div>
        <Reveal delay={0.1}><div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">See the dual-engine architecture →</Link><Link className="btn btn-ghost" href="/small-world">Explore the small-world engine</Link></div></Reveal>
      </div></section>

      <section className="ink-sec"><div className="wrap split-2" style={{ display: 'grid', gap: 46, alignItems: 'center' }}>
        <Reveal><div><div className="eyebrow">21 — India-first proposition</div><h2 className="h2" style={{ marginTop: 14 }}>Built in India. Designed for global science.</h2><p className="lead" style={{ marginTop: 20 }}>KritRNA is being developed in Noida as an India-first biotechnology platform: locally owned scientific capability, India-relevant research priorities and a validation network built through formal laboratories, CROs, clinicians and disease communities.</p><div style={{ marginTop: 25 }}><Link className="btn btn-ghost" href="/india" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>See the India-first strategy →</Link></div></div></Reveal>
        <Reveal delay={0.08}><div style={{ border: '1px solid rgba(244,234,213,.18)', borderRadius: 9, padding: 25 }}>{['Scientific ownership from India', 'β-thalassemia as an India-priority programme', 'Evidence generated through formal collaborations', 'Global scientific and regulatory standards'].map((item, i) => <div key={item} style={{ padding: '14px 0', borderTop: i ? '1px solid rgba(244,234,213,.14)' : 'none', color: 'rgba(244,234,213,.8)', display: 'flex', gap: 12 }}><span style={{ color: i % 2 ? 'var(--cyan)' : 'var(--magenta)' }}>→</span>{item}</div>)}</div></Reveal>
      </div></section>

      <section><div className="wrap">
        <Reveal><div className="sec-head"><div className="eyebrow">Initial research focus</div><h2 className="h2">Three programmes, one platform thesis</h2><p>These are early research programmes. They are not clinical-stage assets or available treatments.</p></div></Reveal>
        <div className="grid cols-3">{PROGRAMS.map((program, i) => <Reveal key={program.name} delay={i * 0.06}><div className="cell"><div className="k" style={{ color: program.accent }}>{program.area}</div><h3>{program.name}</h3><p>{program.goal}</p><div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--rule)' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Current milestone</div><div style={{ marginTop: 5, fontWeight: 600 }}>{program.stage}</div><div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '.86rem' }}>Next: {program.next}</div></div></div></Reveal>)}</div>
        <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/pipeline">Full research-program view →</Link></div></Reveal>
      </div></section>

      <section className="ink-sec center"><div className="wrap">
        <Reveal><div className="eyebrow" style={{ justifyContent: 'center' }}>25 — act from your role</div></Reveal><Reveal delay={0.04}><h2 className="h1" style={{ margin: '18px auto 0', maxWidth: '20ch' }}>Every message deserves to be <em style={{ color: '#ff6f9c' }}>read to completion.</em></h2></Reveal>
        <Reveal delay={0.08}><div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/contact" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>Scientific or CRO collaboration</Link><Link className="btn btn-ghost" href="/investors" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Investor discussion</Link><Link className="btn btn-ghost" href="/careers" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Join the team</Link></div></Reveal>
      </div></section>
    </>
  );
}
