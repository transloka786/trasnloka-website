'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const CORE = [['/problem','Problem'],['/science','Science'],['/platform','Platform'],['/pipeline','Programs'],['/india','India']];
const COMPANY = [['/about','About'],['/team','Team'],['/how-we-work','How we work'],['/impact','Impact'],['/updates','Updates']];
const CONNECT = [['/partners','Partners'],['/community','Communities'],['/investors','Investors'],['/careers','Careers'],['/contact','Contact']];
const LEARN = [['/resources','Public resources'],['/explorer','Disease explorer'],['/glossary','Glossary'],['/faq','FAQ']];

type GroupName = 'learn' | 'company' | 'connect' | null;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupName>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu(name: Exclude<GroupName, null>) {
    cancelClose();
    setOpenGroup(name);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setOpenGroup(null);
      closeTimer.current = null;
    }, 550);
  }

  function closeMenu() {
    cancelClose();
    setOpenGroup(null);
  }

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        closeMenu();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('keydown', key);
      cancelClose();
    };
  }, []);

  const group = (name: Exclude<GroupName, null>, label: string, items: string[][]) => (
    <details
      className="nav-group"
      open={openGroup === name}
      onMouseEnter={() => openMenu(name)}
      onMouseLeave={scheduleClose}
      onFocus={() => openMenu(name)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleClose();
      }}
    >
      <summary
        aria-expanded={openGroup === name}
        onClick={(event) => {
          event.preventDefault();
          openGroup === name ? closeMenu() : openMenu(name);
        }}
      >
        {label}
      </summary>
      <div className="nav-popover" onMouseEnter={cancelClose}>
        {items.map(([href,itemLabel]) => (
          <Link key={href} href={href} onClick={closeMenu}>{itemLabel}</Link>
        ))}
      </div>
    </details>
  );

  return <nav className="nav" aria-label="Primary navigation"><div className="wrap nav-in">
    <Link href="/" className="brand" aria-label="KritRNA home"><Image src="/logo.png" alt="" width={34} height={40} priority/><span>Krit<span className="rna">RNA</span></span></Link>
    <div className="nav-links">
      {CORE.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
      {group('learn','Learn',LEARN)}
      {group('company','Company',COMPANY)}
      {group('connect','Connect',CONNECT)}
      <Link href="/search" aria-label="Search website">⌕</Link><Link href="/ask" className="nav-cta">Ask →</Link>
    </div>
    <button className="burger" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?'×':'≡'}</button>
  </div><div id="mobile-navigation" className={`mobile-menu${open?' open':''}`}>
    {[['Understand',CORE],['Learn',LEARN],['Company',COMPANY],['Connect',CONNECT]].map(([title,items])=><div className="mobile-section" key={title as string}><span>{title as string}</span>{(items as string[][]).map(([href,label])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}</div>)}
    <div className="mobile-actions"><Link href="/search" onClick={()=>setOpen(false)}>Search</Link><Link href="/ask" onClick={()=>setOpen(false)}>Ask KritRNA</Link></div>
  </div></nav>;
}
