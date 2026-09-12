'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
const SCIENCE=[['/science','Our science'],['/problem','The molecular challenge'],['/evidence','Evidence hub'],['/small-world','Translation small-world']];
const COMPANY=[['/about','About KritRNA'],['/india','India-first'],['/team','Our team'],['/how-we-work','How we work'],['/impact','Impact'],['/updates','Updates']];
const LEARN=[['/resources','Public resources'],['/explorer','Disease explorer'],['/glossary','Glossary'],['/faq','FAQ'],['/search','Search'],['/ask','Ask KritRNA']];
const CONNECT=[['/partners','Scientific partners'],['/community','Communities'],['/investors','Investors'],['/careers','Careers'],['/contact','Contact']];
type Group='science'|'company'|'learn'|'connect';
export default function Nav(){
 const [open,setOpen]=useState(false),[active,setActive]=useState<Group|null>(null),pathname=usePathname();
 const nav=useRef<HTMLElement>(null),timer=useRef<ReturnType<typeof setTimeout>|null>(null),burger=useRef<HTMLButtonElement>(null);
 const clear=()=>{if(timer.current){clearTimeout(timer.current);timer.current=null;}};
 const close=()=>{clear();setActive(null);};
 const enter=(name:Group)=>{clear();setActive(name);};
 const leave=()=>{clear();timer.current=setTimeout(()=>setActive(null),220);};
 useEffect(()=>{setOpen(false);setActive(null);},[pathname]);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){const group=nav.current?.querySelector<HTMLDetailsElement>('details[open]');if(group){group.querySelector('summary')?.focus();}else if(nav.current?.querySelector('.mobile-menu.open')){burger.current?.focus();}setOpen(false);setActive(null);}};
  const outside=(e:PointerEvent)=>{if(!nav.current?.contains(e.target as Node)){setActive(null);setOpen(false);}};
  document.addEventListener('keydown',key);document.addEventListener('pointerdown',outside);return()=>{clear();document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',outside);};
 },[]);
 const group=(name:Group,label:string,items:string[][])=><details key={name} className="nav-group" open={active===name} onMouseEnter={()=>enter(name)} onMouseLeave={leave} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))leave();}}><summary aria-expanded={active===name} onClick={e=>{e.preventDefault();active===name?close():enter(name);}}>{label}</summary><div className="nav-popover" onMouseEnter={clear}>{items.map(([href,text])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={close}>{text}</Link>)}</div></details>;
 return <nav ref={nav} className="nav" aria-label="Primary navigation"><div className="wrap nav-in"><Link href="/" className="brand" aria-label="KritRNA home"><Image src="/logo.png" alt="" width={34} height={40} priority/><span>Krit<span className="rna">RNA</span></span></Link><div className="nav-links">{group('science','Science',SCIENCE)}<Link href="/platform" aria-current={pathname==='/platform'?'page':undefined}>Platform</Link><Link href="/pipeline" aria-current={pathname==='/pipeline'?'page':undefined}>Programmes</Link>{group('company','Company',COMPANY)}{group('learn','Learn',LEARN)}{group('connect','Connect',CONNECT)}<Link href="/partners" className="nav-cta">Partner with us ↗</Link></div><button ref={burger} type="button" className="burger" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>{close();setOpen(!open);}}>{open?'×':'≡'}</button></div><div className={`mobile-menu${open?' open':''}`} id="mobile-navigation">{[['Science',[...SCIENCE,['/platform','Platform'],['/pipeline','Programmes']]],['Company',COMPANY],['Learn',LEARN],['Connect',CONNECT]].map(([title,items])=><div className="mobile-section" key={title as string}><span>{title as string}</span>{(items as string[][]).map(([href,label])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</div>)}<div className="mobile-actions"><Link href="/search" onClick={()=>setOpen(false)}>Search</Link><Link href="/ask" onClick={()=>setOpen(false)}>Ask KritRNA</Link></div></div></nav>;
}
