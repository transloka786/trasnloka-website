'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CORE = [['/problem','Problem'],['/science','Science'],['/platform','Platform'],['/pipeline','Programs'],['/india','India']];
const COMPANY = [['/about','About'],['/team','Team'],['/how-we-work','How we work'],['/impact','Impact'],['/updates','Updates']];
const CONNECT = [['/partners','Partners'],['/community','Communities'],['/investors','Investors'],['/careers','Careers'],['/contact','Contact']];
const LEARN = [['/resources','Public resources'],['/explorer','Disease explorer'],['/glossary','Glossary'],['/faq','FAQ']];

export default function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  return <nav className="nav" aria-label="Primary navigation"><div className="wrap nav-in">
    <Link href="/" className="brand" aria-label="KritRNA home"><Image src="/logo.png" alt="" width={34} height={40} priority/><span>Krit<span className="rna">RNA</span></span></Link>
    <div className="nav-links">
      {CORE.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
      <details className="nav-group"><summary>Learn</summary><div className="nav-popover">{LEARN.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div></details>
      <details className="nav-group"><summary>Company</summary><div className="nav-popover">{COMPANY.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div></details>
      <details className="nav-group"><summary>Connect</summary><div className="nav-popover">{CONNECT.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</div></details>
      <Link href="/search" aria-label="Search website">⌕</Link><Link href="/ask" className="nav-cta">Ask →</Link>
    </div>
    <button className="burger" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?'×':'≡'}</button>
  </div><div id="mobile-navigation" className={`mobile-menu${open?' open':''}`}>
    {[['Understand',CORE],['Learn',LEARN],['Company',COMPANY],['Connect',CONNECT]].map(([title,items])=><div className="mobile-section" key={title as string}><span>{title as string}</span>{(items as string[][]).map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</div>)}
    <div className="mobile-actions"><Link href="/search" onClick={()=>setOpen(false)}>Search</Link><Link href="/ask" onClick={()=>setOpen(false)}>Ask KritRNA</Link></div>
  </div></nav>;
}
