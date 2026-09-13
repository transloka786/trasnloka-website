'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {useExperienceMotion} from './Experience';
/** Server content stays visible without JavaScript. Only off-screen content is enhanced. */
export default function Reveal({children,delay=0,y=22}:{children:ReactNode;delay?:number;y?:number}){
  const ref=useRef<HTMLDivElement>(null),disabled=useExperienceMotion();
  useEffect(()=>{
    const el=ref.current;if(!el||disabled||!('IntersectionObserver' in window))return;
    let animation:Animation|undefined;
    if(el.getBoundingClientRect().top<window.innerHeight)return;
    el.style.opacity='0';
    const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){el.style.opacity='1';animation=el.animate([{opacity:0,transform:`translateY(${Math.min(y,28)}px)`},{opacity:1,transform:'translateY(0)'}],{duration:780,delay:Math.min(delay,.18)*1000,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});observer.disconnect();}},{threshold:.06});
    observer.observe(el);return()=>{observer.disconnect();animation?.cancel();el.style.opacity='1';};
  },[disabled,delay,y]);
  return <div className="reveal" ref={ref}>{children}</div>;
}
