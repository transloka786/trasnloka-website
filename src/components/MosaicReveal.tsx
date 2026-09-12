'use client';
import {useEffect,useId,useRef,type RefObject} from 'react';
import {useExperienceMotion} from './Experience';

/** A tiled alpha mask AND displacement filter on the real hero, not a screenshot. */
export default function MosaicReveal({root,replay=0}:{root:RefObject<HTMLDivElement|null>;replay?:number}){
 const disabled=useExperienceMotion();
 const id='mosaic-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 const image=useRef<SVGFEImageElement>(null),displace=useRef<SVGFEDisplacementMapElement>(null);
 useEffect(()=>{
  const element=root.current?.querySelector<HTMLElement>('.hero-composition');
  if(!element)return;
  const clear=()=>{element.style.removeProperty('mask-image');element.style.removeProperty('-webkit-mask-image');element.style.removeProperty('mask-size');element.style.removeProperty('-webkit-mask-size');element.style.removeProperty('filter');element.dataset.reveal='ready';};
  if(disabled||window.scrollY>200){clear();return;}
  const bounds=element.getBoundingClientRect();
  const cols=Math.ceil(bounds.width/(innerWidth<600?21:16)),rows=Math.ceil(bounds.height/(innerWidth<600?21:16));
  const mask=document.createElement('canvas'),map=document.createElement('canvas');
  mask.width=map.width=Math.max(4,cols*4);mask.height=map.height=Math.max(4,rows*4);
  const m=mask.getContext('2d'),w=map.getContext('2d');if(!m||!w){clear();return;}
  let frame=0,start=0,last=-100,disposed=false;
  const duration=innerWidth<600?2200:2900;
  element.dataset.reveal='running';
  element.style.setProperty('mask-size','100% 100%');element.style.setProperty('-webkit-mask-size','100% 100%');
  element.style.filter=`url(#${id})`;
  const smooth=(x:number)=>{const v=Math.min(1,Math.max(0,x));return v*v*(3-2*v);};
  const draw=(now:number)=>{
   if(disposed)return;if(!start)start=now;
   const p=(now-start)/duration;if(p>=1){clear();return;}
   frame=requestAnimationFrame(draw);if(now-last<32)return;last=now;
   m.clearRect(0,0,mask.width,mask.height);w.fillStyle='rgb(128,128,128)';w.fillRect(0,0,map.width,map.height);
   for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
    const noise=((x*73+y*137)%101)/101;
    const delay=.27*x/cols+.1*y/rows+.05*Math.sin(y*.28)+noise*.07;
    const a=smooth((p-delay)/.46),gap=(1-a)*.7;
    m.fillStyle=`rgba(255,255,255,${a})`;m.fillRect(x*4+gap,y*4+gap,4-gap*2,4-gap*2);
    const r=Math.round(128+110*Math.sin(x*.12+y*.21-now*.0018));
    const b=Math.round(128+110*Math.cos(x*.19-y*.1-now*.0015));
    w.fillStyle=`rgb(${r},128,${b})`;w.fillRect(x*4,y*4,4,4);
   }
   const alpha=`url(${mask.toDataURL()})`;element.style.setProperty('mask-image',alpha);element.style.setProperty('-webkit-mask-image',alpha);
   image.current?.setAttribute('href',map.toDataURL());displace.current?.setAttribute('scale',String(6*(1-smooth(p))));
  };
  frame=requestAnimationFrame(draw);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);clear();}};
  document.addEventListener('visibilitychange',visibility);
  return()=>{disposed=true;cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility);clear();};
 },[disabled,id,root,replay]);
 return <svg className="journey-filter" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB"><feImage ref={image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="tileWave"/><feDisplacementMap ref={displace} in="SourceGraphic" in2="tileWave" scale="6" xChannelSelector="R" yChannelSelector="B"/></filter></defs></svg>;
}
