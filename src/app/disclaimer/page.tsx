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
            <strong>Research-stage program.</strong> KritRNA is at an early, preclinical stage (TRL 2 → 3). No KritRNA
            candidate has completed wet-lab validation, entered animal or human studies, or received any regulatory
            approval. Nothing on this site is a therapy that is available to patients today.
          </div>

          <h2>Not medical advice</h2>
          <p>Content on this website is for information only and is not medical advice, diagnosis, or treatment. If you or someone you know has a genetic condition such as Duchenne muscular dystrophy, hemophilia, or a cancer, consult a qualified healthcare professional. Do not delay or change medical care based on anything here.</p>

          <h2>No treatment offer</h2>
          <p>We do not offer, sell, or provide any treatment, therapy, drug, or clinical service through this website, and we cannot enrol patients in a therapy. Descriptions of our platform and pipeline describe research intent and direction — not proven clinical outcomes.</p>

          <h2>Forward-looking statements</h2>
          <p>Statements about our technology, programs, timelines, milestones and market are forward-looking. They involve significant scientific, technical and business risk and may change or not come to pass. Pipeline progress indicators reflect research status, not clinical stage.</p>

          <h2>Scientific references</h2>
          <p>Disease-burden and background figures cited on this site are drawn from public sources (e.g. GARD/NIH, GeneReviews/NCBI, MedlinePlus/NLM, GLOBOCAN/IARC). They describe the disease landscape, not KritRNA results.</p>

          <h2>Not investment advice</h2>
          <p>Nothing here is an offer of securities or investment advice. Any partnership or investment discussion happens separately, under appropriate agreements.</p>

          <h2>The on-site assistant</h2>
          <p>The assistant provides general information and can make mistakes. It is not a medical professional and its answers are not advice. Verify anything important with us at <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
