import Link from 'next/link';
import LogoFormation from '@/components/LogoFormation';
import TranslationTrack from '@/components/TranslationTrack';
import Reveal from '@/components/Reveal';
import { PROGRAMS } from '@/lib/content';

export default function Home() {
  return (
    <>
      <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--rule)' }}>
        <LogoFormation />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
          <Reveal><div className="eyebrow" style={{ marginBottom: 24 }}>AI-guided suppressor tRNA therapeutics</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1">Reading through <em>silence</em>,<br />restoring the protein.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 28 }}>A premature stop codon can interrupt protein synthesis and contribute to genetic disease. KritRNA is developing suppressor-tRNA designs intended to help the ribosome read through selected premature stops. Every candidate must be tested experimentally for activity, identity and safety.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" href="/science">Understand the science →</Link>
              <Link className="btn btn-ghost" href="/platform">Explore the platform</Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}><p style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', letterSpacing: '.04em' }}>Scroll to assemble the tRNAs. Return upward to release them.</p></Reveal>
        </div>
      </header>

      <section className="ink-sec" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">01 — the shared failure</div><h2 className="h2">Different diseases can converge on the same translation problem</h2></div></Reveal>
          <Reveal delay={0.05}>
            <p className="lead">A nonsense mutation can create a <strong>premature termination codon</strong>. The ribosome stops before the intended protein is complete, and the transcript may also be reduced through nonsense-mediated mRNA decay. KritRNA begins with this shared molecular failure rather than treating every mutation as an unrelated problem.</p>
          </Reveal>
          <Reveal delay={0.1}><TranslationTrack /></Reveal>
          <div style={{ marginTop: 40 }}>
            <Reveal><div className="sec-head" style={{ marginBottom: 20 }}><div className="eyebrow">02 — programmable readthrough</div><h2 className="h2">A suppressor tRNA can help translation continue</h2></div></Reveal>
            <Reveal delay={0.05}><p className="lead">In experimental systems, an engineered suppressor tRNA can recognise a selected premature stop and deliver an amino acid instead of terminating translation. Whether that produces useful restoration depends on sequence context, amino-acid identity, processing, delivery, competition and safety.</p></Reveal>
            <Reveal delay={0.1}><TranslationTrack readthrough /></Reveal>
          </div>
          <Reveal delay={0.12}><div style={{ marginTop: 28 }}><Link className="btn btn-ghost" href="/science" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Why suppressor-tRNA design is difficult →</Link></div></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">03 — the platform</div><h2 className="h2">Design the molecule. Model the system.</h2><p>KritRNA is developing two connected engines to move from a target nonsense variant to a biologically constrained, experimentally testable shortlist.</p></div></Reveal>
          <div className="grid cols-2">
            <Reveal><div className="cell"><div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · suppressor-tRNA design</div><h3>Candidate generation and ranking</h3><p>Sequence design, processing and identity constraints, structure and thermodynamics, kinetic context, normal-stop risk, explainable scoring and Pareto selection.</p></div></Reveal>
            <Reveal delay={0.08}><div className="cell"><div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · translation small-world</div><h3>System-level consequence modelling</h3><p>A mechanistic network connecting initiation, elongation, termination, ribosome traffic, NMD, rescue, stress signalling, folding and protein output.</p></div></Reveal>
          </div>
          <Reveal delay={0.1}><div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}><Link className="btn btn-solid" href="/platform">See the dual-engine architecture →</Link><Link className="btn btn-ghost" href="/small-world">Explore the small-world engine</Link></div></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">04 — initial research focus</div><h2 className="h2">Three programs, one platform thesis</h2><p>These are early research programs. They are not clinical-stage assets or available treatments.</p></div></Reveal>
          <div className="grid cols-3">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.name} delay={i * 0.06}>
                <div className="cell">
                  <div className="k" style={{ color: program.accent }}>{program.area}</div>
                  <h3>{program.name}</h3>
                  <p>{program.goal}</p>
                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--rule)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>Current milestone</div>
                    <div style={{ marginTop: 5, fontWeight: 600 }}>{program.stage}</div>
                    <div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '.86rem' }}>Next: {program.next}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/pipeline">Full research-program view →</Link></div></Reveal>
        </div>
      </section>

      <section className="ink-sec center">
        <div className="wrap">
          <Reveal><h2 className="h1" style={{ margin: '0 auto', maxWidth: '20ch' }}>Every message deserves to be <em style={{ color: '#ff6f9c' }}>read to completion.</em></h2></Reveal>
          <Reveal delay={0.08}>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" href="/contact" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>Discuss a collaboration</Link>
              <Link className="btn btn-ghost" href="/careers" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Join the team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
