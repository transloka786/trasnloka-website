import type {Metadata} from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import EngineShowcase from '@/components/EngineShowcase';
import {DEPENDENCIES} from '@/lib/publicStory';
export const metadata:Metadata={title:'Our platform',description:'AI-guided design of suppressor tRNA at KritRNA.'};
export default function Platform(){return <div className="noir-platform-page"><section className="page-hero"><div className="wrap"><Reveal><div className="eyebrow">THE KRITRNA PLATFORM</div><h1 className="h1">Selection is the question.<br/><em>Evidence is the way forward.</em></h1><p className="lead">We are developing suppressor tRNA through AI-guided design. Our research asks whether cells can produce useful protein after a premature stop.</p></Reveal></div></section><EngineShowcase/>
 
 <section className="ink-sec"><div className="wrap"><div className="sec-head"><div className="eyebrow">CONNECTED BIOLOGY</div><h2 className="h2">The right molecule must work in the right context.</h2><p>These public biological questions explain why translation therapeutics needs an integrated approach. Safety and useful protein function run across all four.</p></div><div className="system-layer-list">{DEPENDENCIES.map(([n,t,q,p])=><Reveal key={n}><article><span className="micro">{n} / {t}</span><h3>{q}</h3><p>{p}</p></article></Reveal>)}</div></div></section>
 
 <section className="page-bottom-cta"><div className="wrap"><Reveal><h2 className="display-heading smaller">The model proposes.<br/><em>The experiment decides.</em></h2><p>We welcome enquiries about experimental research.</p><Link className="underline-link" href="/partners">Build the evidence with us ↗</Link><br/><Link className="underline-link" href="/small-world">Explore the translation-system perspective ↗</Link></Reveal></div></section></div>;}
