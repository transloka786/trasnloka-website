'use client';
import {useEffect,useRef,useState} from 'react';
import {useExperienceMotion} from './Experience';
import type {SceneHandle,SceneKind} from '@/lib/noir-scenes';
export default function MolecularScene({kind='trna',step=0,label='Molecular visualisation',className=''}:{kind?:SceneKind;step?:number;label?:string;className?:string}){
 const host=useRef<HTMLDivElement>(null),handle=useRef<SceneHandle|null>(null),disabled=useExperienceMotion(),state=useRef({disabled,step});
 state.current={disabled,step};
 const [status,setStatus]=useState('loading'),[reference,setReference]=useState(false);
 useEffect(()=>{
  const el=host.current;if(!el)return;
  let disposed=false,started=false,visible=false;
  const activate=async()=>{
   if(started||disposed)return;started=true;
   try{const {mountScene}=await import('@/lib/noir-scenes');if(disposed)return;const scene=await mountScene(el,kind,state.current.step,()=>{if(!disposed)setStatus('fallback');});if(disposed){scene.dispose();return;}handle.current=scene;scene.motion(!state.current.disabled&&visible);scene.step(state.current.step);setReference(scene.reference);setStatus('ready');}
   catch{if(!disposed)setStatus('fallback');}
  };
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)void activate();handle.current?.motion(visible&&!state.current.disabled);},{rootMargin:'100px'});
  io.observe(el);
  return()=>{disposed=true;io.disconnect();handle.current?.dispose();handle.current=null;};
 },[kind]);
 useEffect(()=>{handle.current?.motion(!disabled);},[disabled]);
 useEffect(()=>{handle.current?.step(step);},[step]);
 return <figure className={`noir-scene noir-scene-${kind} ${className}`} aria-label={label} data-scene={kind} data-renderer={status}>
  <div ref={host} className="webgl-host" aria-hidden="true"/>
  {status!=='ready'&&<div className="scene-fallback"><span className="micro">{kind==='trna'?'ONE RNA STRAND · A FOLDED ADAPTOR':kind==='network'?'BIOLOGY IS CONNECTED':'THE MOLECULAR STORY'}</span><p>{kind==='trna'?'A single RNA backbone folds into stems and loops. One end carries an amino acid; the other reads the message.':kind==='network'?'Message availability, translation, quality control and protein output influence one another.':'Use the chapters below to follow normal translation, premature termination and suppressor-tRNA readthrough.'}</p></div>}
  <figcaption>{kind==='trna'?(reference?'Public reference tRNA · 1EHZ, yeast phenylalanine tRNA. Not a KritRNA candidate.':'Single-strand tRNA · folded schematic, not candidate geometry.'):kind==='network'?'Illustrative 3D network · not proprietary topology or model output.':'Simplified 3D cutaway · educational, not an atomic ribosome model.'}</figcaption>
 </figure>;
}
