import type { Metadata } from 'next';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy & Data Use Policy',
  description: 'How Transloka Bio Private Limited collects, uses, protects and retains personal data submitted through the KritRNA website.',
};

const EFFECTIVE_DATE = '11 July 2026';

export default function PrivacyPage() {
  return (
    <section className="page-hero">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div className="eyebrow">Legal</div>
        <h1 className="h1">Privacy &amp; Data Use Policy</h1>
        <p className="lead" style={{ marginTop: 18 }}>This policy explains how {SITE.legal} processes information submitted through the KritRNA website.</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--ink-mute)', marginTop: 14 }}>Effective and last updated: {EFFECTIVE_DATE}</p>

        <div className="prose" style={{ marginTop: 38 }}>
          <div className="callout"><strong>Do not submit health, medical, genetic or diagnostic information.</strong> This is a corporate and research website, not a clinical service, patient registry or secure health-data channel.</div>

          <h2>1. Who we are</h2>
          <p>{SITE.legal} is the legal entity operating KritRNA™ and determines why and how personal data submitted through this site is processed. Legal name: {SITE.legal}. CIN: {SITE.cin}. Location: {SITE.location}. Website: {SITE.url}. For privacy and grievance matters, email <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a>.</p>

          <h2>2. Scope and legal framework</h2>
          <p>This policy applies to website forms, email communications initiated through the site, newsletter subscriptions, job applications and the on-site assistant. We aim to align our practices with India’s Digital Personal Data Protection Act, 2023 and applicable rules and notifications, while continuing to observe other currently applicable Indian information-technology and data-protection requirements. Legal requirements may change; this policy will be updated when necessary.</p>

          <h2>3. Information we may collect</h2>
          <ul>
            <li><strong>Contact enquiries:</strong> name, email, organisation and message.</li>
            <li><strong>Partner and investor enquiries:</strong> professional details, organisation, area of interest and information voluntarily provided for qualification.</li>
            <li><strong>Career applications:</strong> contact details, CV or résumé, links, written answers and work samples.</li>
            <li><strong>Newsletter subscriptions:</strong> email address and confirmation status.</li>
            <li><strong>Assistant interactions:</strong> questions submitted and generated responses.</li>
            <li><strong>Technical information:</strong> limited server, security, rate-limit and privacy-preserving usage data required to operate and protect the site.</li>
          </ul>
          <p>We do not knowingly request government identifiers, biometric information, payment-card information or patient medical records through this site.</p>

          <h2>4. Why we process information</h2>
          <p>We process information to respond to enquiries; assess employment, internship and collaboration applications; provide requested company updates; operate and improve the site and assistant; prevent abuse and security incidents; maintain records; and comply with applicable law. We do not sell personal data or use it for behavioural advertising.</p>

          <h2>5. Consent and withdrawal</h2>
          <p>Submitting a form, confirming a subscription or sending a message is an affirmative action authorising processing for the stated purpose. You may withdraw consent by contacting <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a>. Withdrawal does not invalidate processing already completed lawfully and may prevent us from continuing the requested service.</p>

          <h2>6. Health and sensitive information</h2>
          <p>Patients, families and clinicians must not send medical records, genetic reports, diagnostic information or other sensitive health data through public forms, the assistant or ordinary email. If such information is sent despite this warning, we will restrict access, use it only to respond appropriately and erase it when no longer necessary, subject to legal requirements.</p>

          <h2>7. Cookies and analytics</h2>
          <p>The site is designed to use first-party, privacy-preserving and cookieless analytics. We do not deploy advertising cookies, behavioural trackers or cross-site profiling. Strictly necessary technical storage may be used where required for security or core functionality.</p>

          <h2>8. Service providers</h2>
          <p>We may use infrastructure and service providers for website hosting and content delivery, database and file storage, transactional email, the on-site AI assistant, security monitoring and internal productivity. These providers process information on our behalf for defined purposes. Depending on final production configuration, providers may include Vercel, Supabase, Resend, OpenAI and Google Workspace or Gmail.</p>

          <h2>9. International processing</h2>
          <p>Some providers may process information outside India. Where that occurs, we use providers and contractual arrangements intended to maintain protections consistent with this policy and applicable Indian restrictions on cross-border processing.</p>

          <h2>10. Retention</h2>
          <ul>
            <li>Enquiries are retained while being handled and for a reasonable record-keeping period.</li>
            <li>Recruitment data is retained for the recruitment process and a limited future-opportunity period unless earlier deletion is requested.</li>
            <li>Newsletter data is retained until unsubscribe or withdrawal.</li>
            <li>Security and operational logs are retained only for a proportionate period.</li>
          </ul>
          <p>Information is erased or anonymised when its purpose is complete unless legal, audit, security or dispute requirements justify continued retention.</p>

          <h2>11. Security</h2>
          <p>We use access controls, server-side credentials, rate limits, secure providers, security headers, controlled repositories and operational monitoring. No transmission or storage system is completely secure, so absolute security cannot be guaranteed.</p>

          <h2>12. Your requests</h2>
          <p>Subject to applicable law, you may request access, correction, completion, updating, erasure, withdrawal of consent or grievance redressal. Send the request to <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a> with sufficient detail for verification. Do not impersonate another person or provide false particulars.</p>

          <h2>13. Children</h2>
          <p>The site is intended for a general adult audience and is not directed at children. We do not knowingly collect information from a person under 18 without appropriate parent or lawful-guardian involvement. Contact us if you believe a child has submitted information improperly.</p>

          <h2>14. Breach response</h2>
          <p>We will investigate personal-data incidents, contain and remediate them, preserve required records and provide notices to affected individuals or authorities when required by applicable law.</p>

          <h2>15. Third-party links</h2>
          <p>External scientific, government and partner links have their own privacy practices. We are not responsible for third-party websites.</p>

          <h2>16. No medical advice and forward-looking information</h2>
          <p>KritRNA is research-stage. Website content is informational, not medical, diagnostic, treatment or investment advice. Research plans, platform capabilities and future milestones are uncertain and do not guarantee efficacy, approval, financing or commercial outcomes.</p>

          <h2>17. Intellectual property</h2>
          <p>KritRNA™, Transloka Bio names, logos, site design and original materials are owned by or licensed to {SITE.legal}. They may not be reproduced or used to create derivative works without written permission, except where law permits.</p>

          <h2>18. Governing law and contact</h2>
          <p>This policy is governed by Indian law. Subject to statutory rights and regulatory forums, courts at Gautam Budh Nagar, Uttar Pradesh have jurisdiction. Contact: {SITE.legal}, {SITE.location}; <a href={`mailto:${SITE.adminEmail}`}>{SITE.adminEmail}</a>.</p>

          <div className="callout">This public policy reflects the intended website implementation and is not a substitute for legal advice. Final production publication should be reviewed by the company’s legal or company-secretarial adviser, particularly after the complete registered-office address and grievance designation are confirmed.</div>
        </div>
      </div>
    </section>
  );
}
