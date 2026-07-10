import Link from 'next/link';
import { SITE, NAV } from '@/lib/content';

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
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
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
