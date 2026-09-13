'use client';
import {useEffect,useId,useRef,useState,type RefObject} from 'react';
import {createPortal} from 'react-dom';
import {useExperienceMotion} from './Experience';

/** Live tile field: the real hero remains selectable, readable and interactive. */
export default function MosaicReveal({root,replay=0}:{root:RefObject<HTMLDivElement|null>;replay?:number}){
 const disabled=useExperienceMotion();
 const [hero,setHero]=useState<HTMLElement|null>(null);
 const canvas=useRef<HTMLCanvasElement>(null),image=useRef<SVGFEImageElement>(null),displace=useRef<SVGFEDisplacementMapElement>(null);
 const played=useRef(false),id='mosaic-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 useEffect(()=>{setHero(root.current?.querySelector<HTMLElement>('.editorial-hero')||null);},[root]);
 useEffect(()=>{
  const element=hero?.querySelector<HTMLElement>('.hero-composition'),field=canvas.current;
  if(!hero||!element||!field)return;
  const clear=()=>{for(const key of ['mask-image','-webkit-mask-image','mask-size','-webkit-mask-size','filter'])element.style.removeProperty(key);element.dataset.reveal='ready';hero.dataset.mosaic='off';};
  if(disabled||matchMedia('(forced-colors: active)').matches){clear();field.getContext('2d')?.clearRect(0,0,field.width,field.height);return;}
  const context=field.getContext('2d'),mask=document.createElement('canvas'),map=document.createElement('canvas');
  const alpha=mask.getContext('2d'),vector=map.getContext('2d');
  if(!context||!alpha||!vector){clear();return;}
  let width=0,height=0,cols=0,rows=0,pitch=18,offsetX=0,offsetY=0;
  let frame=0,last=0,elapsed=0,visible=true,disposed=false,frames=0,lastRipple=-999;
  const opening=!played.current&&scrollY<100;played.current=true;
  const ripples:{x:number;y:number;t:number;strength:number}[]=[];
  let pointer={x:-999,y:-999,speed:0},energy=0;
  const smooth=(v:number)=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
  const resize=()=>{
   const box=hero.getBoundingClientRect(),content=element.getBoundingClientRect();
   const nextW=Math.max(1,box.width),nextH=Math.max(1,box.height);
   offsetX=content.left-box.left;offsetY=content.top-box.top;
   if(nextW===width&&nextH===height)return;
   width=nextW;height=nextH;pitch=innerWidth<600?16:18;
   const dpr=Math.min(devicePixelRatio||1,1.5);
   field.width=Math.round(width*dpr);field.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);
   cols=Math.ceil(content.width/pitch);rows=Math.ceil(content.height/pitch);
   mask.width=map.width=cols*4;mask.height=map.height=rows*4;
   hero.dataset.tileSize=String(pitch);
  };
  resize();
  element.style.setProperty('mask-size','100% 100%');element.style.setProperty('-webkit-mask-size','100% 100%');
  element.style.filter=`url(#${id})`;
  const draw=(now:number)=>{
   frame=0;if(disposed||!visible||document.hidden)return;
   frame=requestAnimationFrame(draw);
   const period=innerWidth<600?55:42;if(last&&now-last<period)return;
   const dt=last?Math.min(.12,(now-last)/1000):0;last=now;elapsed+=dt;
   energy+=(Number(root.current?.style.getPropertyValue('--journey-energy')||0)-energy)*.12;
   const reveal=opening?smooth(elapsed/2.2):1;
   context.clearRect(0,0,width,height);alpha.clearRect(0,0,mask.width,mask.height);vector.fillStyle='rgb(128,128,128)';vector.fillRect(0,0,map.width,map.height);
   while(ripples.length&&elapsed-ripples[0].t>2.6)ripples.shift();
   for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
    const px=(x+.5)*pitch,py=(y+.5)*pitch;
    const phase=x*.18+y*.115-elapsed*1.28;
    const breathe=.5+.5*Math.sin(phase),cross=Math.sin(x*.075-y*.11+elapsed*.78);
    let ripple=0;
    for(const r of ripples){const age=elapsed-r.t,d=Math.hypot(px-r.x,py-r.y),ring=(d-age*145)/48;ripple+=Math.sin(ring*2.3)*Math.exp(-ring*ring*.72)*Math.exp(-age*.8)*r.strength;}
    const isCopy=x/cols<.51,readability=isCopy?.15:1;
    const intro=smooth((reveal-.17*x/cols-.08*y/rows)/.75);
    const a=intro*(isCopy?.975+.025*breathe:.86+.12*breathe);
    const gap=(isCopy?.025:.13)+(1-intro)*.75;
    alpha.fillStyle=`rgba(255,255,255,${a})`;alpha.fillRect(x*4+gap,y*4+gap,4-gap*2,4-gap*2);
    const dx=(Math.sin(phase)*.16+ripple*.66+cross*.07)*readability;
    const dy=(Math.cos(phase*.8)*.18+ripple*.76)*readability;
    vector.fillStyle=`rgb(${Math.round(128+Math.max(-1,Math.min(1,dx))*110)},128,${Math.round(128+Math.max(-1,Math.min(1,dy))*110)})`;vector.fillRect(x*4,y*4,4,4);
    const cx=offsetX+x*pitch,cy=offsetY+y*pitch;
    const envelope=Math.max(0,1-Math.pow(Math.abs(x/cols-.64)/.75,2));
    const glow=(.022+.044*breathe+Math.abs(ripple)*.12+energy*.026)*envelope;
    context.fillStyle=`rgba(137,175,176,${glow*intro})`;context.fillRect(cx+1.1,cy+1.1,pitch-2.2,pitch-2.2);
    context.strokeStyle=`rgba(177,199,190,${(.035+breathe*.032+Math.abs(ripple)*.15)*intro*envelope})`;context.lineWidth=.6;context.strokeRect(cx+1.2,cy+1.2,pitch-2.4,pitch-2.4);
   }
   const texture=`url(${mask.toDataURL('image/png')})`;element.style.setProperty('mask-image',texture);element.style.setProperty('-webkit-mask-image',texture);
   image.current?.setAttribute('href',map.toDataURL('image/png'));displace.current?.setAttribute('scale',String(innerWidth<600?6.5:9));
   element.dataset.reveal=reveal<1?'running':'ready';hero.dataset.mosaic=reveal<1?'revealing':'pulsing';hero.dataset.mosaicFrame=String(++frames);
  };
  const start=()=>{last=0;if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
  const move=(event:PointerEvent)=>{
   const box=element.getBoundingClientRect(),x=event.clientX-box.left,y=event.clientY-box.top;
   const speed=Math.min(1,Math.hypot(x-pointer.x,y-pointer.y)/45);pointer={x,y,speed};
   if(elapsed-lastRipple>.085){lastRipple=elapsed;ripples.push({x,y,t:elapsed,strength:.3+speed*.7});if(ripples.length>7)ripples.shift();hero.dataset.pointerWaves=String(Number(hero.dataset.pointerWaves||0)+1);}
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}},{threshold:.015});observer.observe(hero);
  const ro=new ResizeObserver(resize);ro.observe(hero);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();};
  hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerdown',move,{passive:true});document.addEventListener('visibilitychange',visibility);start();
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();ro.disconnect();hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerdown',move);document.removeEventListener('visibilitychange',visibility);context.clearRect(0,0,width,height);clear();};
 },[hero,disabled,id,root,replay]);
 return <><svg className="journey-filter" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id={id} x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB"><feImage ref={image} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="tileWave"/><feDisplacementMap ref={displace} in="SourceGraphic" in2="tileWave" scale="9" xChannelSelector="R" yChannelSelector="B"/></filter></defs></svg>{hero&&createPortal(<canvas ref={canvas} className="ambient-mosaic-field" aria-hidden="true"/>,hero)}</>;
}
