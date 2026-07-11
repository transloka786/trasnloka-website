'use client';
import Link from 'next/link';
import { useState } from 'react';
import { NAV } from '@/lib/content';

const LINKS = [
  { href: '/science', label: 'Science' },
  { href: '/platform', label: 'Platform' },
  { href: '/small-world', label: 'Small-world' },
  ...NAV.filter((item) => item.href !== '/platform'),
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
          {LINKS.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/careers#apply" className="nav-cta">Apply →</Link>
        </div>
        <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>≡</button>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {LINKS.map((n) => <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>)}
        <Link href="/careers#apply" onClick={() => setOpen(false)}>Apply →</Link>
      </div>
    </nav>
  );
}
