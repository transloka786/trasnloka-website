'use client';
import {useEffect,useId,useState} from 'react';
import Link from 'next/link';
import RibosomeGlyph from './RibosomeGlyph';
import {useExperienceMotion} from './Experience';
const chapters=[
 {title:'Normal translation',body:'A ribosome reads mRNA in three-letter codons. Aminoacyl-tRNAs deliver amino acids; the growing chain is extended until release factors recognise a normal stop.',detail:'The highlighted CAG is a sense codon. The ribosome moves along the message from 5′ to 3′.'},
 {title:'A premature stop',body:'Here, an illustrative CAG-to-UAG change replaces an amino-acid codon with a premature stop. Release factors can end translation early. Nonsense-mediated decay may also reduce the amount of message available.',detail:'Message decay is context-dependent and is not shown as an inevitable consequence of every premature stop.'},
 {title:'Suppressor tRNA',body:'An engineered suppressor tRNA can recognise a selected premature stop and carry an amino acid into the ribosome. If it succeeds in competing with termination, the protein chain can continue.',detail:'The molecular poses are a teaching schematic, not a candidate sequence, therapeutic result or exact decoding-cycle simulation.'},
 {title:'Beyond readthrough',body:'Translation can proceed downstream towards a full-length protein. The development question is whether that protein is correctly made, functional and produced in the right cells, with acceptable effects at normal stop codons.',detail:'Native-stop safety, transcript survival, delivery and protein function require experimental measurement. The native stop shown is UAA.'}
];
export default function TranslationStory(){
 const [step,setStep]=useState(0),[progress,setProgress]=useState(0),id=useId(),disabled=useExperienceMotion();
 const chapter=chapters[step];
 useEffect(()=>{const sync=(e:Event)=>{const {time,mode}=(e as CustomEvent<{time:number;mode:string}>).detail;if(mode!=='guided'||time<42||time>86)return;setStep(time<54?0:time<66?1:time<78?2:3);};window.addEventListener('kritrna:journey',sync);return()=>window.removeEventListener('kritrna:journey',sync);},[]);
 useEffect(()=>{if(disabled){setProgress(1);return;}let raf=0,start=0;const animate=(t:number)=>{if(!start)start=t;const p=Math.min(1,(t-start)/2600);setProgress(p);if(p<1)raf=requestAnimationFrame(animate);};raf=requestAnimationFrame(animate);return()=>cancelAnimationFrame(raf);},[step,disabled]);
 const travel=step===0?16+progress*72:step===1?16+progress*34:step===2?50:50+progress*38;
 const codons=['GCU','AAG','CUG',step===0?'CAG':'UAG','AUC','GAU','UAA'];
 return <div className="translation-observatory restored-translation">
  <figure className="noir-scene noir-scene-translation restored-translation-scene" data-scene="translation" data-renderer="ready" aria-label={chapter.title+' — illustrative translation schematic'}>
   <div className="translation-message"><span className="message-direction">5′</span><div className="translation-message-line"/>{codons.map((c,i)=><span key={i} className={`translation-codon${i===3?' target-codon':''}${i===6?' native-stop':''}`} style={{left:`${8+i*14}%`}}>{c}</span>)}<span className="message-direction message-end">3′</span></div>
   <div className="ribosome-carrier" style={{left:`${travel}%`}}><RibosomeGlyph/></div>
   {step===2&&<div className="suppressor-arrival"><svg viewBox="0 0 64 78" aria-hidden="true"><path d="M28 3v16C6 9 3 36 23 35L19 43C2 38 5 61 23 57l4 16h10l4-16c18 4 21-19 4-14l-4-8c20 1 17-26-5-16V3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg><span>Suppressor tRNA</span></div>}
   <div className={`translation-protein${step===1?' protein-stopped':''}`} style={{width:`${step===1?progress*39:step===2?39:step===3?39+progress*35:progress*74}%`}}/>
   <figcaption>{step===1?'Premature termination':step===2?'A chance to continue':step===3?'Continuation towards a full-length protein':'Reading the message'} · educational schematic</figcaption>
  </figure>
  <div className="translation-chapters" role="group" aria-label="Translation story chapters">{chapters.map((c,i)=><button key={c.title} type="button" aria-label={`0${i+1} ${c.title}`} aria-pressed={step===i} aria-controls={id} onClick={()=>setStep(i)}>{c.title}</button>)}</div>
  <div className="translation-explanation" id={id} aria-live="polite"><h3>{chapter.title}</h3><p>{chapter.body}</p><p className="scene-note">{chapter.detail}</p></div><Link className="underline-link" href="/science">Read the science in more detail ↗</Link>
 </div>;
}
