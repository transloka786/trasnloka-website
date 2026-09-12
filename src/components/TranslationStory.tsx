'use client';
import {useState} from 'react';
import Link from 'next/link';
const CODONS=['AUG','GCU','UGA','GAC','UUC','UAA'];
export default function TranslationStory(){
  const [readthrough,setReadthrough]=useState(false);
  return <div className={`translation-lab${readthrough?' is-reading':''}`}>
    <div className="lab-heading"><span className="micro">TRANSLATION / INTERACTIVE SCHEMATIC</span><span className="lab-state">{readthrough?'02 · A route to continuation':'01 · An early stop'}</span></div>
    <div className="lab-controls" role="group" aria-label="Compare translation mechanisms"><button type="button" aria-pressed={!readthrough} onClick={()=>setReadthrough(false)}>Premature stop</button><button type="button" aria-pressed={readthrough} onClick={()=>setReadthrough(true)}>With suppressor tRNA <span aria-hidden="true">↗</span></button></div>
    <div className="translation-scene" aria-hidden="true">
      <div className="protein-strand"><span/><span/><span/>{readthrough&&<><span/><span/><span/><span/><span/></>}</div>
      <div className="ribosome-sculpt"><div/><div/></div><span className="ribosome-caption">RIBOSOME</span>
      <div className="suppressor-adaptor"><span className="amino-acid"/><svg viewBox="0 0 60 100"><path d="M26 6V32H12Q0 32 5 45Q10 55 24 48V71Q12 83 30 95Q48 83 36 71V48Q50 55 55 45Q60 32 48 32H34V6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/></svg></div>
      <div className="mrna-track">{CODONS.map((codon,i)=><span className={i===2?'premature-codon':i===5?'native-codon':''} key={i}>{codon}</span>)}</div>
      <div className="track-labels"><span>mRNA · 5′ → 3′</span><span>Premature stop</span><span>Native stop</span></div>
    </div>
    <div className="lab-result" aria-live="polite"><span className="result-dot"/><p>{readthrough?'An engineered tRNA can deliver an amino acid at a selected premature stop, allowing translation to continue toward full-length protein.':'A premature stop can interrupt translation before the protein is complete. The message may also be reduced by nonsense-mediated decay.'}</p></div>
    <p className="lab-note">Illustrative UGA-targeted mechanism, not experimental data. Protein function, delivery and native-stop specificity require testing. <Link href="/science">Explore the science ↗</Link></p>
  </div>;
}
