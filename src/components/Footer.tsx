import Link from 'next/link';
import { SITE } from '@/lib/content';

const EXPLORE = [
  { href: '/science', label: 'Science' },
  { href: '/platform', label: 'Platform' },
  { href: '/small-world', label: 'Small-world engine' },
  { href: '/pipeline', label: 'Research pipeline' },
  { href: '/india', label: 'India-first strategy' },
  { href: '/investors', label: 'Investors' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand"><img src="/logo.png" alt="" /> Krit<span style={{ color: 'var(--cyan)' }}>RNA</span></div>
            <p style={{ maxWidth: '34ch' }}>Developing suppressor-tRNA designs for selected premature stop codons through an India-first, evidence-gated research platform.</p>
          </div>
          <div><h4>Explore</h4><ul>{EXPLORE.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><span style={{ color: 'rgba(244,234,213,.42)' }}>General: </span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><span style={{ color: 'rgba(244,234,213,.42)' }}>Careers: </span><a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></li>
              <li>{SITE.phone}</li>
              <li>{SITE.location}</li>
              <li><Link href="/privacy">Privacy & Data Use</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar"><span>© {new Date().getFullYear()} {SITE.legal} · CIN {SITE.cin}</span><span>{SITE.tagline}</span></div>
      </div>
    </footer>
  );
}
