'use client';
import {useEffect,useRef,useState} from 'react';
import {useExperienceMotion} from './Experience';
import {mountMolecule} from '@/lib/molecular-canvas';
export default function MolecularHero(){
  const canvas=useRef<HTMLCanvasElement>(null),disabled=useExperienceMotion(),[supported,setSupported]=useState(false);
  useEffect(()=>{if(!canvas.current)return;setSupported(!!canvas.current.getContext('2d'));return mountMolecule(canvas.current,!disabled);},[disabled]);
  return <figure className="molecular-stage">
    <div className="molecule-halo" aria-hidden="true"/><div className="orbital orbital-a" aria-hidden="true"/><div className="orbital orbital-b" aria-hidden="true"/>
    <div className="molecule-coordinate" aria-hidden="true">MOLECULAR POSSIBILITY / 001</div>
    {!supported&&<svg className="molecule-fallback" viewBox="0 0 400 500" aria-hidden="true"><path d="M185 70V192L120 160Q55 140 70 215Q85 260 165 240V330Q115 410 200 440Q285 410 235 330V240Q315 260 330 215Q345 140 280 160L215 192V70" fill="none" stroke="#a8ddd1" strokeWidth="20" strokeLinecap="round"/></svg>}
    <canvas ref={canvas} className="molecule-canvas" aria-hidden="true"/>
    <div className="molecule-label molecule-label-top"><i/>Designed with purpose.</div>
    <div className="molecule-label molecule-label-bottom"><i/>Engineered to continue.</div>
    <figcaption>tRNA-inspired molecular sculpture <span>Conceptual · not an atomic model</span></figcaption>
  </figure>;
}
