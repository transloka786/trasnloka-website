'use client';
import Link from 'next/link';
import { useState } from 'react';

const LINKS = [
  { href: '/science', label: 'Science' },
  { href: '/platform', label: 'Platform' },
  { href: '/pipeline', label: 'Pipeline' },
  { href: '/india', label: 'India' },
  { href: '/team', label: 'Team' },
  { href: '/investors', label: 'Investors' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="KritRNA logo" />
          <span>Krit<span className="rna">RNA</span></span>
        </Link>
        <div className="nav-links">
          {LINKS.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/careers#apply" className="nav-cta">Apply →</Link>
        </div>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>≡</button>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <Link href="/small-world" onClick={() => setOpen(false)}>Small-world engine</Link>
        {LINKS.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link href="/careers#apply" onClick={() => setOpen(false)}>Apply →</Link>
      </div>
    </nav>
  );
}
