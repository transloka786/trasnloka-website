import Link from 'next/link';
import LogoFormation from '@/components/LogoFormation';
import TranslationTrack from '@/components/TranslationTrack';
import Reveal from '@/components/Reveal';
import { PROGRAMS } from '@/lib/content';

export default function Home() {
  return (
    <>
      {/* HERO — tRNAs assemble automatically shortly after first paint */}
      <header style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid var(--rule)' }}>
        <LogoFormation />
        <div className="wrap" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 24 }}>AI-guided suppressor tRNA therapeutics</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="h1">Reading through <em>silence</em>,<br />restoring the protein.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead" style={{ marginTop: 28 }}>
              A premature stop codon can interrupt protein synthesis and contribute to genetic disease.
              KritRNA is developing suppressor-tRNA designs intended to help the ribosome read through selected
              premature stops. Every candidate must be tested experimentally for activity, identity and safety.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" href="/platform">Explore the platform →</Link>
              <Link className="btn btn-ghost" href="/pipeline">See the research programs</Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', letterSpacing: '.04em' }}>
              Watch the tRNAs assemble the KritRNA mark.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="ink-sec" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">01 — the failure</div><h2 className="h2">Where the message stops short</h2></div></Reveal>
          <Reveal delay={0.05}>
            <p className="lead">
              The ribosome reads mRNA one codon at a time until it reaches a stop signal. A <strong>nonsense mutation</strong> can
              create that signal too early — a <strong>premature termination codon</strong> — so translation ends before the intended
              protein is complete. The affected mRNA may also be reduced through nonsense-mediated mRNA decay.
            </p>
          </Reveal>
          <Reveal delay={0.1}><TranslationTrack /></Reveal>
          <div style={{ marginTop: 40 }}>
            <Reveal><div className="sec-head" style={{ marginBottom: 20 }}><div className="eyebrow">02 — the read-through</div><h2 className="h2">A suppressor tRNA can help translation continue</h2></div></Reveal>
            <Reveal delay={0.05}>
              <p className="lead">In experimental systems, an engineered suppressor tRNA can recognise a selected premature stop and deliver an amino acid instead of terminating translation. Whether that produces useful protein restoration depends on sequence context, amino-acid identity, delivery and safety.</p>
            </Reveal>
            <Reveal delay={0.1}><TranslationTrack readthrough /></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">03 — the platform</div><h2 className="h2">A dual-engine design system</h2>
            <p>Computational design and systems modelling are being developed to support a future design–test–learn loop.</p></div></Reveal>
          <div className="grid cols-2">
            <Reveal><div className="cell"><div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · active development</div><h3>Suppressor-tRNA sequence design</h3><p>Candidate generation, biological constraint checks, structure and thermodynamic assessment, explainable scoring and shortlist generation for experimental testing.</p></div></Reveal>
            <Reveal delay={0.08}><div className="cell"><div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · concept architecture</div><h3>Translation small-world modelling</h3><p>A systems model intended to connect stop-codon context, tRNA behaviour, termination, NMD, ribosome traffic, stress responses and protein output.</p></div></Reveal>
          </div>
          <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/platform">How the engines are being built →</Link></div></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">04 — initial research focus</div><h2 className="h2">Three programs, one platform thesis</h2>
            <p>These are early research programs. They are not clinical-stage assets or available treatments.</p></div></Reveal>
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
