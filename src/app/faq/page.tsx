import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { FAQ } from '@/lib/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about KritRNA — suppressor tRNA therapeutics, nonsense mutations, our pipeline, development stage, data handling, and how to partner or apply.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>FAQ</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Questions,<br />answered plainly.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>The science, the stage we’re at, and how we work. If your question isn’t here, ask the assistant in the corner or email us.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
                <details style={{ borderTop: '1px solid var(--rule)', padding: '4px 0' }}>
                  <summary style={{ cursor: 'pointer', listStyle: 'none', padding: '20px 0', display: 'flex', justifyContent: 'space-between', gap: 20, fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 600 }}>
                    <span>{f.q}</span><span style={{ color: 'var(--magenta)', flex: 'none' }}>+</span>
                  </summary>
                  <p style={{ color: 'var(--ink-soft)', paddingBottom: 22, maxWidth: '68ch' }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
