import type { Metadata } from 'next';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of the KritRNA website operated by Transloka Bio Pvt. Ltd.',
};

export default function TermsPage() {
  return (
    <section style={{ borderTop: 'none' }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Legal</div>
        <h1 className="h1" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Terms of Use</h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 14 }}>Last updated: July 2026 · {SITE.legal} · CIN {SITE.cin}</p>
        <div className="prose" style={{ marginTop: 34 }}>
          <h2>1. Acceptance</h2>
          <p>By accessing this website you agree to these Terms. If you do not agree, please do not use the site. The site is operated by {SITE.legal} (“we”, “us”).</p>

          <h2>2. Informational purpose only</h2>
          <p>All content on this site is provided for general information about our research and company. It is <strong>not</strong> medical advice, a diagnosis, a treatment offer, an offer of securities, or a solicitation to invest. Nothing here creates a doctor–patient, advisory, or contractual relationship.</p>

          <h2>3. No reliance</h2>
          <p>KritRNA is an early-stage research company. Statements about our platform, pipeline and timelines are forward-looking and may change. Do not make medical, financial or other decisions in reliance on this site. See our <a href="/disclaimer" style={{ color: 'var(--magenta)' }}>Disclaimer</a>.</p>

          <h2>4. Intellectual property</h2>
          <p>The KritRNA name and logo, the “Reading through silence, restoring the protein” tagline, site text, and design are the property of {SITE.legal} or its licensors. Trademark applications for “KritRNA” are filed in Classes 5, 42 and 44. You may not copy, reproduce or reuse them without written permission.</p>

          <h2>5. Acceptable use</h2>
          <p>You agree not to misuse the site — including attempting to breach security, overload or attack the service or its APIs, scrape at scale, submit malicious files, or abuse the on-site assistant. We may rate-limit, block, or take action against such activity.</p>

          <h2>6. Submissions</h2>
          <p>Information you submit (contact, applications, résumés) is handled per our <a href="/privacy" style={{ color: 'var(--magenta)' }}>Privacy & Data Residency</a> policy. Do not submit confidential third-party information or another person’s data without authorisation.</p>

          <h2>7. Third-party links</h2>
          <p>We are not responsible for the content or practices of external sites we may link to.</p>

          <h2>8. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, we are not liable for any loss arising from use of, or reliance on, this website. The site is provided “as is” without warranties of any kind.</p>

          <h2>9. Governing law</h2>
          <p>These Terms are governed by the laws of India, with exclusive jurisdiction in the courts of Uttar Pradesh, India.</p>

          <h2>10. Contact</h2>
          <p>Questions about these Terms: <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>.</p>
        </div>
      </div>
    </section>
  );
}
