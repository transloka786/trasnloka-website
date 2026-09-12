'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
const MotionState = createContext(false);
export function useExperienceMotion(){return useContext(MotionState);}
export default function Experience({children}:{children:ReactNode}){
  const reduced=useReducedMotion(), [paused,setPaused]=useState(false), [ready,setReady]=useState(false);
  const path=usePathname(), progress=useRef<HTMLDivElement>(null);
  const disabled=!ready||!!reduced||paused;
  useEffect(()=>{setReady(true);try{setPaused(sessionStorage.getItem('kritrna-motion')==='paused');}catch{}},[]);
  useEffect(()=>{document.documentElement.dataset.motion=disabled?'off':'on';},[disabled]);
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;const h=document.documentElement.scrollHeight-window.innerHeight;progress.current?.style.setProperty('transform',`scaleX(${h>0?window.scrollY/h:0})`);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);};
  },[path]);
  function toggle(){setPaused(v=>{try{sessionStorage.setItem('kritrna-motion',!v?'paused':'running');}catch{}return !v;});}
  return <MotionState.Provider value={disabled}><MotionConfig reducedMotion={disabled?'always':'user'}>
    <div className="reading-progress" ref={progress} aria-hidden="true"/>
    {children}
    <button type="button" className="motion-control" onClick={toggle} aria-pressed={paused} disabled={!!reduced} aria-label={reduced?'Reduced motion follows your device setting':paused?'Resume decorative motion':'Pause decorative motion'}><span aria-hidden="true">{disabled?'▷':'Ⅱ'}</span> {reduced?'Reduced motion':paused?'Motion paused':'Pause motion'}</button>
  </MotionConfig></MotionState.Provider>;
}
