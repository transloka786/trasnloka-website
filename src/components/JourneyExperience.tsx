'use client';
import {useEffect,useRef,type ReactNode} from 'react';
import {useExperienceMotion} from './Experience';
import MosaicReveal from './MosaicReveal';
import '../app/ambient.css';

const END=240.039;
// Timing stays internal. No soundtrack names, file chooser or playback dashboard.
const CHAPTERS=[{start:0,end:30,selector:'.editorial-hero'},{start:30,end:90,selector:'.manifesto-section'},{start:90,end:150,selector:'.dependencies-section'},{start:150,end:210,selector:'.brand-origin'},{start:210,end:END,selector:'.evidence-editorial'}];
const CUES:[number,string][]=[[0,'.editorial-hero'],[25,'.editorial-hero'],[30,'.manifesto-section'],[39,'.manifesto-section'],[43,'.reading-intro'],[49,'.translation-observatory'],[78,'.translation-observatory'],[86,'.science-callout'],[90,'.dependencies-section'],[102,'.dependencies-section'],[107,'.platform-intro'],[116,'.engine-spread'],[129,'.capability-rail'],[136,'.programmes-section'],[145,'.programmes-section'],[150,'.brand-origin'],[174,'.brand-origin'],[180,'.people-section'],[204,'.people-section'],[210,'.evidence-editorial'],[222,'.evidence-editorial'],[228,'.audience-section'],[237,'.closing-section'],[END,'.closing-section']];
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
export default function JourneyExperience({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),disabled=useExperienceMotion();
 const state=useRef({disabled:true,ready:false,mode:'explore',chapter:0,manual:false,muted:false,ended:false,available:false,attempting:false,blocked:false});
 state.current.disabled=disabled;
 const stopRef=useRef<()=>void>(()=>{});
 useEffect(()=>{
  const el=root.current,a=audio.current;if(!el||!a)return;
  let disposed=false,raf=0,last=0,scrollTimer:ReturnType<typeof setTimeout>|undefined,seekTimer:ReturnType<typeof setTimeout>|undefined;
  let points:{time:number;y:number}[]=[],anchors:number[]=[],ctx:AudioContext|null=null,analyser:AnalyserNode|null=null;
  const samples=new Uint8Array(256),abort=new AbortController();
  a.volume=.36;
  const mark=()=>{el.dataset.mode=state.current.mode;el.dataset.audio=state.current.available?(state.current.blocked?'awaiting-interaction':a.paused?'paused':'playing'):'unavailable';};
  const measure=()=>{const nav=document.querySelector('.nav')?.getBoundingClientRect().height||68,max=Math.max(0,document.documentElement.scrollHeight-innerHeight);const y=(selector:string)=>{const node=el.querySelector(selector);return node?clamp(node.getBoundingClientRect().top+scrollY-nav-20,0,max):0;};points=CUES.map(([time,selector])=>({time,y:y(selector)}));anchors=CHAPTERS.map(c=>y(c.selector));};
  const attachMeter=async()=>{try{if(ctx||disposed)return;const candidate=new AudioContext();await candidate.resume();if(disposed||candidate.state!=='running'){await candidate.close();return;}ctx=candidate;analyser=ctx.createAnalyser();analyser.fftSize=512;const source=ctx.createMediaElementSource(a);source.connect(analyser);analyser.connect(ctx.destination);}catch{/* Native audio remains available if a meter cannot start. */}};
  const attempt=()=>{
   const s=state.current;if(disposed||document.hidden||!s.available||s.muted||s.ended||s.attempting)return;
   s.attempting=true;
   void a.play().then(()=>{if(disposed){a.pause();return;}s.blocked=false;s.mode=!s.manual&&!s.disabled?'guided':'explore';mark();}).catch(()=>{s.blocked=true;s.mode='explore';mark();}).finally(()=>{s.attempting=false;});
  };
  const stop=()=>{state.current.muted=true;state.current.mode='paused';if(seekTimer)clearTimeout(seekTimer);a.pause();mark();};stopRef.current=stop;
  const user=()=>{state.current.manual=true;state.current.mode=state.current.muted?'paused':'explore';mark();};
  const gesture=(event:Event)=>{
   const target=event.target as HTMLElement|null;
   if(target?.closest('input,textarea,select,[contenteditable=true]')){user();return;}
   if(target?.closest('a,button,summary'))user();
   if(event.type==='keydown'){
    const key=(event as KeyboardEvent).key;
    if(key==='Escape'){stop();return;}
    if(key.toLowerCase()==='m'&&!(event as KeyboardEvent).ctrlKey&&!(event as KeyboardEvent).metaKey){state.current.muted=!state.current.muted;if(state.current.muted){a.pause();state.current.mode='paused';mark();return;}}
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(key))user();
   }
   attempt();if(!state.current.muted&&state.current.available)void attachMeter();
  };
  const scroll=()=>{if(state.current.mode==='guided')return;if(scrollTimer)clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{
   const s=state.current;let index=0;anchors.forEach((y,i)=>{if(scrollY+innerHeight*.22>=y)index=i;});
   if(index!==s.chapter){s.chapter=index;s.ended=false;if(s.available){if(seekTimer)clearTimeout(seekTimer);a.volume=.08;seekTimer=setTimeout(()=>{if(disposed)return;a.currentTime=Math.min(CHAPTERS[index].start,a.duration||END);a.volume=.36;attempt();},120);}}
  },180);};
  const tick=(now:number)=>{
   raf=0;if(disposed||document.hidden)return;raf=requestAnimationFrame(tick);if(now-last<50)return;last=now;
   const s=state.current,t=a.currentTime;
   if(!a.paused&&s.mode==='guided'&&!s.disabled){
    let i=0;while(i<points.length-2&&t>=points[i+1].time)i++;if(points[i]&&points[i+1]){const fraction=clamp((t-points[i].time)/(points[i+1].time-points[i].time),0,1),ease=fraction*fraction*(3-2*fraction);window.scrollTo({top:points[i].y+(points[i+1].y-points[i].y)*ease,behavior:'instant'});}
    s.chapter=t>=210?4:t>=150?3:t>=90?2:t>=30?1:0;
    window.dispatchEvent(new CustomEvent('kritrna:journey',{detail:{time:t,mode:'guided'}}));
   }else if(!a.paused&&s.mode==='explore'&&t>=CHAPTERS[s.chapter].end-.08){a.pause();mark();}
   let power=0;if(analyser&&!a.paused&&!s.disabled){analyser.getByteTimeDomainData(samples);let sum=0;for(const v of samples)sum+=(v-128)*(v-128);power=clamp(Math.sqrt(sum/samples.length)/38,0,1);}el.style.setProperty('--journey-energy',String(power));
  };
  const visibility=()=>{if(document.hidden){a.pause();cancelAnimationFrame(raf);raf=0;mark();}else{if(!raf)raf=requestAnimationFrame(tick);attempt();}};
  const ended=()=>{state.current.ended=true;state.current.mode='explore';mark();};
  const error=()=>{state.current.available=false;state.current.mode='explore';mark();};
  const ro=new ResizeObserver(measure);ro.observe(el);measure();
  // Only advertise a media source that the deployment actually contains.
  void fetch('/audio/score.json',{signal:abort.signal,cache:'no-store'}).then(r=>r.ok?r.json():null).then((asset:{available?:boolean;src?:string}|null)=>{
   if(disposed||!asset?.available||!asset.src?.startsWith('/audio/')){mark();return;}
   state.current.available=true;a.src=asset.src;a.load();attempt();mark();
  }).catch(()=>{if(!disposed)mark();});
  window.addEventListener('pointerup',gesture,{passive:true});window.addEventListener('keydown',gesture);window.addEventListener('wheel',user,{passive:true});window.addEventListener('touchmove',user,{passive:true});window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure);document.addEventListener('visibilitychange',visibility);a.addEventListener('ended',ended);a.addEventListener('error',error);raf=requestAnimationFrame(tick);
  return()=>{disposed=true;abort.abort();cancelAnimationFrame(raf);ro.disconnect();if(scrollTimer)clearTimeout(scrollTimer);if(seekTimer)clearTimeout(seekTimer);window.removeEventListener('pointerup',gesture);window.removeEventListener('keydown',gesture);window.removeEventListener('wheel',user);window.removeEventListener('touchmove',user);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',measure);document.removeEventListener('visibilitychange',visibility);a.removeEventListener('ended',ended);a.removeEventListener('error',error);a.pause();a.removeAttribute('src');a.load();void ctx?.close().catch(()=>{});};
 },[]);
 useEffect(()=>{if(!disabled)state.current.ready=true;else if(state.current.ready)stopRef.current();},[disabled]);
 return <div ref={root} className="journey-home" data-journey-build="mosaic-v2" data-audio="checking"><MosaicReveal root={root}/>{children}<audio ref={audio} preload="metadata" playsInline aria-label="Background instrumental soundtrack"/><span className="ambient-accessibility-note">Press M to mute the background soundtrack. Escape pauses it. The motion pause control also stops the soundtrack.</span></div>;
}
