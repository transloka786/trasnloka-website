import Link from 'next/link';
import LogoFormation from '@/components/LogoFormation';
import TranslationTrack from '@/components/TranslationTrack';
import Reveal from '@/components/Reveal';
import { PROGRAMS } from '@/lib/content';

export default function Home() {
  return (
    <>
      {/* HERO — tRNAs converge into the KritRNA glyph on scroll */}
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
              A single premature stop codon can silence an entire protein — and cause disease.
              KritRNA engineers suppressor tRNAs that read through that stop, letting the cell
              finish the message it was always meant to complete.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ marginTop: 34, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" href="/platform">Explore the platform →</Link>
              <Link className="btn btn-ghost" href="/pipeline">See the pipeline</Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', letterSpacing: '.04em' }}>
              ↓ scroll — watch the tRNAs assemble the mark
            </p>
          </Reveal>
        </div>
      </header>

      {/* THE FAILURE */}
      <section className="ink-sec" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">01 — the failure</div><h2 className="h2">Where the message stops short</h2></div></Reveal>
          <Reveal delay={0.05}>
            <p className="lead">
              The ribosome reads mRNA one codon at a time until it reaches a stop signal. A <strong>nonsense mutation</strong> plants
              that stop too early — a <strong>premature termination codon</strong> — and the ribosome halts mid-protein. The result is a short,
              non-functional fragment, and a disease with no protein to do the job.
            </p>
          </Reveal>
          <Reveal delay={0.1}><TranslationTrack /></Reveal>
          <div style={{ marginTop: 40 }}>
            <Reveal><div className="sec-head" style={{ marginBottom: 20 }}><div className="eyebrow">02 — the read-through</div><h2 className="h2">A suppressor tRNA finishes the sentence</h2></div></Reveal>
            <Reveal delay={0.05}>
              <p className="lead">An engineered suppressor tRNA decodes the premature stop, delivering an amino acid instead of terminating.
                The ribosome reads through, and the full-length protein is restored.</p>
            </Reveal>
            <Reveal delay={0.1}><TranslationTrack readthrough /></Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORM TEASER */}
      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">03 — the platform</div><h2 className="h2">A dual-engine design system</h2>
            <p>Two AI engines drive a closed wet-lab design loop — design, validate, optimise, repeat.</p></div></Reveal>
          <div className="grid cols-2">
            <Reveal><div className="cell"><div className="k" style={{ color: 'var(--cyan)' }}>Engine 01 · near complete</div><h3>Suppressor-tRNA sequence design</h3><p>Candidate generation → constraint gate → multi-axis scoring → Pareto ranking. Aminoacylation identity is largely rule-based, so the ML concentrates on read-through efficiency prediction.</p></div></Reveal>
            <Reveal delay={0.08}><div className="cell"><div className="k" style={{ color: 'var(--forest)' }}>Engine 02 · early-stage</div><h3>Translation small-world modelling</h3><p>Models read-through and system-level protein output — ribosome, stop context, tRNA, aaRS, NMD/RQC and proteostasis as one connected network.</p></div></Reveal>
          </div>
          <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/platform">How the engines work →</Link></div></Reveal>
        </div>
      </section>

      {/* PIPELINE TEASER */}
      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">04 — the pipeline</div><h2 className="h2">Four programs, one platform</h2>
            <p>All programs are at discovery / early-validation stage. No candidate is in human trials.</p></div></Reveal>
          <div className="grid cols-2">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div className="cell">
                  <div className="k" style={{ color: p.accent }}>{p.area}</div>
                  <h3>{p.name}</h3>
                  <p>{p.goal}</p>
                  <div style={{ marginTop: 16, height: 6, borderRadius: 4, background: 'var(--cream-deep)', overflow: 'hidden' }}>
                    <div style={{ width: `${p.progress}%`, height: '100%', background: p.accent }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/pipeline">Full pipeline →</Link></div></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="ink-sec center">
        <div className="wrap">
          <Reveal><h2 className="h1" style={{ margin: '0 auto', maxWidth: '20ch' }}>Every message deserves to be <em style={{ color: '#ff6f9c' }}>read to completion.</em></h2></Reveal>
          <Reveal delay={0.08}>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link className="btn btn-solid" href="/contact" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>Partner with us</Link>
              <Link className="btn btn-ghost" href="/careers" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }}>Join the team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
