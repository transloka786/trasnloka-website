import type { Metadata } from 'next';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy & Data Use',
  description: 'How KritRNA / Transloka Bio handles website contact, recruitment and chatbot information. This public website is not a patient registry and must not be used to submit medical records.',
};

export default function PrivacyPage() {
  const updated = 'July 2026';
  return (
    <section style={{ borderTop: 'none' }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Legal</div>
        <h1 className="h1" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Privacy & Data Use</h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 14 }}>Last updated: {updated} · {SITE.legal} · CIN {SITE.cin}</p>

        <div className="prose" style={{ marginTop: 34 }}>
          <div className="callout">
            <strong>This website is not a patient registry.</strong> Do not submit medical records, diagnostic reports, genetic data or other health information through the contact form, careers form or chatbot. The public website processes only the contact, recruitment and chatbot information a visitor chooses to provide.
          </div>

          <h2>1. Who we are</h2>
          <p>This website is operated by {SITE.legal} (“Transloka Bio”, “KritRNA”, “we”), a company incorporated in Noida, Uttar Pradesh, India (CIN {SITE.cin}). For privacy questions, contact <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>.</p>

          <h2>2. What this website processes</h2>
          <ul>
            <li><strong>Contact form:</strong> name, email, organisation and message. The form is routed to our designated company inbox.</li>
            <li><strong>Careers form:</strong> name, email, phone, links, written answers and, if supplied, a résumé in PDF format.</li>
            <li><strong>Assistant:</strong> questions entered into the chatbot. Visitors should not enter personal or health information.</li>
            <li><strong>Security logs:</strong> limited technical information used for abuse prevention and rate limiting.</li>
          </ul>
          <p>We do not use advertising cookies or third-party behavioural advertising trackers on this website.</p>

          <h2>3. Clinical and patient data</h2>
          <p>The public website does not collect clinical or patient data. Any future research collaboration involving clinical, genetic or patient information would require separate governance, contracts, ethics and consent processes, security controls and compliance with applicable law. Such information must not be submitted through this website.</p>

          <h2>4. Website service providers</h2>
          <p>We may use service providers to host the website, deliver email, store recruitment submissions and operate the chatbot. These providers process only the minimum website information required for those functions. Their processing locations and retention practices may differ from ours.</p>

          <h2>5. Purpose and retention</h2>
          <p>We use submitted information to respond to enquiries, evaluate applications, operate the website and prevent abuse. We retain it only for as long as reasonably needed for those purposes, legal obligations or dispute resolution.</p>

          <h2>6. Your requests</h2>
          <p>You may request access, correction or deletion of information you submitted through this website by emailing <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>. We will assess requests under applicable law and any legitimate retention requirements.</p>

          <h2>7. Children</h2>
          <p>This website is not directed at children and we do not knowingly request information from them.</p>

          <h2>8. Changes</h2>
          <p>We may update this policy as the company, website and service providers evolve. Material changes will be reflected in the date above.</p>
        </div>
      </div>
    </section>
  );
}
