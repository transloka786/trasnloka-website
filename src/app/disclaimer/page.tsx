import type { Metadata } from 'next';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'KritRNA is a preclinical, research-stage program. Nothing on this website is a medical claim or an offer of treatment.',
};

export default function DisclaimerPage() {
  return (
    <section style={{ borderTop: 'none' }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Legal</div>
        <h1 className="h1" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Disclaimer</h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 14 }}>Last updated: July 2026 · {SITE.legal}</p>
        <div className="prose" style={{ marginTop: 34 }}>
          <div className="callout" style={{ borderLeftColor: 'var(--magenta)', background: 'rgba(233,30,99,.06)' }}>
            <strong>Research-stage program.</strong> KritRNA is at an early, preclinical research stage. No KritRNA candidate has completed the experimental package required to establish safety or efficacy, entered human studies, or received regulatory approval. Nothing on this website is a therapy available to patients.
          </div>

          <h2>Not medical advice</h2>
          <p>Content on this website is for general information only and is not medical advice, diagnosis or treatment. Anyone seeking guidance about a genetic or rare disease should consult a qualified healthcare professional and should not delay or change medical care based on this website.</p>

          <h2>No treatment offer</h2>
          <p>We do not offer, sell or provide any treatment, therapy, drug or clinical service through this website, and we cannot enrol patients into a KritRNA therapy. Descriptions of the platform and research programs describe research intent and direction, not proven outcomes.</p>

          <h2>Forward-looking statements</h2>
          <p>Statements about technology, research programs, milestones, partnerships, timelines and potential applications are forward-looking. They involve scientific, technical, regulatory and business risk, and they may change or not come to pass. Descriptive milestones are not probabilities of success or clinical-development stages.</p>

          <h2>Scientific references</h2>
          <p>External scientific work is linked where a persistent DOI or bibliographic record has been verified. Publications involving a founder are personal publication records and do not imply endorsement of KritRNA by a former university, laboratory, journal or co-author.</p>

          <h2>Not investment advice</h2>
          <p>Nothing here is an offer of securities or investment advice. Any partnership or investment discussion happens separately and under appropriate agreements.</p>

          <h2>The on-site assistant</h2>
          <p>The assistant provides general information and can make mistakes. It is not a medical professional and its answers are not advice. Verify anything important with us at <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
