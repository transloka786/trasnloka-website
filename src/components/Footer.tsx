import Link from 'next/link';
import { SITE, NAV } from '@/lib/content';

const EXPLORE = [
  { href: '/science', label: 'Science' },
  { href: '/platform', label: 'Platform' },
  { href: '/small-world', label: 'Small-world engine' },
  ...NAV.filter((item) => item.href !== '/platform'),
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand"><img src="/logo.png" alt="" /> Krit<span style={{ color: 'var(--cyan)' }}>RNA</span></div>
            <p style={{ maxWidth: '34ch' }}>Engineering suppressor tRNAs to read through premature stop codons — restoring the proteins rare-disease patients are missing.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>{EXPLORE.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><span style={{ color: 'var(--ink-mute)' }}>General: </span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><span style={{ color: 'var(--ink-mute)' }}>Careers: </span><a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></li>
              <li>{SITE.phone}</li>
              <li>{SITE.location}</li>
              <li><Link href="/privacy">Privacy & Data Use</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <span>© {new Date().getFullYear()} {SITE.legal} · CIN {SITE.cin}</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
