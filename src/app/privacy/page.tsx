import type { Metadata } from 'next';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy & Data Residency',
  description: 'How KritRNA / Transloka Bio handles data. Clinical and patient data is held on in-house infrastructure in India and never replicated abroad. This website collects only contact and recruitment data.',
};

export default function PrivacyPage() {
  const updated = 'July 2026';
  return (
    <section style={{ borderTop: 'none' }}>
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>Legal</div>
        <h1 className="h1" style={{ fontSize: 'clamp(2rem,5vw,3.4rem)' }}>Privacy & Data Residency</h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)', marginTop: 14 }}>Last updated: {updated} · {SITE.legal} · CIN {SITE.cin}</p>

        <div className="prose" style={{ marginTop: 34 }}>
          <div className="callout">
            <strong>Our data-residency commitment.</strong> Any clinical or patient data associated with KritRNA’s
            research is stored on in-house infrastructure located in India. It is <strong>not</strong> stored online for
            access by any other country, and is never replicated to servers outside India. This public website does
            <strong> not</strong> collect clinical or patient data — it collects only the contact and recruitment
            information you choose to submit below.
          </div>

          <h2>1. Who we are</h2>
          <p>This website is operated by {SITE.legal} (“Transloka Bio”, “KritRNA”, “we”), a company incorporated in Noida, Uttar Pradesh, India (CIN {SITE.cin}). For any privacy question, contact <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a>.</p>

          <h2>2. What this website collects</h2>
          <p>We only process the information you actively provide:</p>
          <ul>
            <li><strong>Contact form:</strong> your name, email, organisation and message.</li>
            <li><strong>Careers / application form:</strong> your name, email, phone, links, your written answer and, if you upload one, your résumé (PDF).</li>
            <li><strong>Assistant (chatbot):</strong> the questions you type. We do not ask for personal or health information, and you should not enter any.</li>
            <li><strong>Basic technical logs:</strong> a truncated, partially-masked IP address is used only for rate-limiting and abuse prevention, not for tracking.</li>
          </ul>
          <p>We do <strong>not</strong> use advertising cookies or third-party marketing trackers on this site.</p>

          <h2>3. Clinical & patient data — held in India, in-house</h2>
          <p>KritRNA is a research-stage company. Any clinical, genetic or patient data that arises from our research or collaborations is handled <strong>separately from this website</strong>, on in-house infrastructure physically located in India. That data is not uploaded to this website, is not stored on foreign servers, and is not made accessible to other countries. This commitment is designed to align with the intent of India’s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.</p>

          <h2>4. Service providers for this website</h2>
          <p>To run this website and respond to you, we use a small number of processors. These handle only the website contact/recruitment data described in Section 2 — never clinical or patient data:</p>
          <ul>
            <li><strong>Hosting / delivery</strong> (e.g. Vercel) — serves the website.</li>
            <li><strong>Form storage</strong> (e.g. a managed database / object storage) — stores your submitted messages and résumés so we can respond.</li>
            <li><strong>Email delivery</strong> (e.g. Resend) — routes your enquiry to our inbox.</li>
            <li><strong>Assistant</strong> (e.g. OpenAI API) — generates answers to questions typed into the on-site assistant. Only the message text is sent; we instruct you not to include personal or health data.</li>
          </ul>
          <p>Some of these providers may process data outside India. We keep the data they see to the minimum needed to reply to you, and — to repeat — clinical and patient data never touches these services.</p>

          <h2>5. Why we process it, and for how long</h2>
          <p>We use your information solely to respond to your enquiry, evaluate applications, and keep the site secure. We retain contact and application data only as long as needed for those purposes, after which it is deleted or anonymised.</p>

          <h2>6. Your rights</h2>
          <p>You may ask us to access, correct or delete the personal data you have submitted through this site. Email <a href={`mailto:${SITE.email}`} style={{ color: 'var(--magenta)' }}>{SITE.email}</a> and we will act on reasonable requests.</p>

          <h2>7. Children</h2>
          <p>This website is not directed at children and we do not knowingly collect their data.</p>

          <h2>8. Changes</h2>
          <p>We may update this policy as the company and its systems evolve. Material changes will be reflected by the “last updated” date above.</p>
        </div>
      </div>
    </section>
  );
}
