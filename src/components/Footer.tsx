import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/content';

const EXPLORE = [['/problem','Problem'],['/science','Science'],['/platform','Platform'],['/small-world','Small-world engine'],['/pipeline','Programs'],['/india','India'],['/impact','Impact'],['/ask','Ask KritRNA']];
const COMPANY = [['/about','About'],['/team','Team'],['/how-we-work','How we work'],['/partners','Partners'],['/community','Communities'],['/investors','Investors'],['/updates','Updates'],['/careers','Careers']];
const LEARN = [['/resources','Public resources'],['/explorer','Disease explorer'],['/glossary','Glossary'],['/references','References'],['/faq','FAQ'],['/search','Search']];

export default function Footer() {
  return <footer className="footer"><div className="wrap"><div className="foot-grid">
    <div><div className="foot-brand"><Image src="/logo.png" alt="" width={30} height={36}/> Krit<span style={{color:'var(--cyan)'}}>RNA</span></div><p>Developing suppressor-tRNA designs through an India-first, evidence-gated research platform.</p></div>
    <div><h2>Explore</h2><ul>{EXPLORE.map(([href,label])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>
    <div><h2>Company</h2><ul>{COMPANY.map(([href,label])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>
    <div><h2>Learn &amp; contact</h2><ul>{LEARN.map(([href,label])=><li key={href}><Link href={href}>{label}</Link></li>)}<li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li><li><a href={`mailto:${SITE.careersEmail}`}>{SITE.careersEmail}</a></li><li>{SITE.phone}</li><li>{SITE.location}</li><li><Link href="/privacy">Privacy &amp; data use</Link></li><li><Link href="/terms">Terms</Link></li><li><Link href="/disclaimer">Disclaimer</Link></li></ul></div>
  </div><div className="foot-bar"><span>© {new Date().getFullYear()} {SITE.legal} · CIN {SITE.cin}</span><span>{SITE.tagline}</span></div></div></footer>;
}
