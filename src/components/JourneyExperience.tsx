'use client';
import {useCallback,useEffect,useRef,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {useExperienceMotion} from './Experience';
import MosaicReveal from './MosaicReveal';

const DURATION=240.039;
const CHAPTERS=[
 {name:'Sunrise',start:0,end:30,selector:'.editorial-hero'},
 {name:'First Steps',start:30,end:90,selector:'.manifesto-section'},
 {name:'Discovery',start:90,end:150,selector:'.dependencies-section'},
 {name:'Horizon',start:150,end:210,selector:'.brand-origin'},
 {name:'Reflection',start:210,end:DURATION,selector:'.evidence-editorial'}
];
const CUES:[number,string][]=[
 [0,'.editorial-hero'],[25,'.editorial-hero'],[30,'.manifesto-section'],[39,'.manifesto-section'],
 [43,'.reading-intro'],[49,'.translation-observatory'],[78,'.translation-observatory'],[86,'.science-callout'],
 [90,'.dependencies-section'],[102,'.dependencies-section'],[107,'.platform-intro'],[116,'.engine-spread'],
 [129,'.capability-rail'],[136,'.programmes-section'],[145,'.programmes-section'],[150,'.brand-origin'],
 [174,'.brand-origin'],[180,'.people-section'],[204,'.people-section'],[210,'.evidence-editorial'],
 [222,'.evidence-editorial'],[228,'.audience-section'],[237,'.closing-section'],[DURATION,'.closing-section']
];
type Mode='explore'|'guided'|'paused';
const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v));
const chapterAt=(t:number)=>Math.max(0,CHAPTERS.findIndex(c=>t>=c.start&&t<c.end));

export default function JourneyExperience({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),audio=useRef<HTMLAudioElement>(null),file=useRef<HTMLInputElement>(null);
 const disabled=useExperienceMotion();
 const [host,setHost]=useState<HTMLElement|null>(null),[mode,setMode]=useState<Mode>('explore');
 const [chapter,setChapter]=useState(0),[engaged,setEngaged]=useState(false),[replay,setReplay]=useState(0);
 const [loaded,setLoaded]=useState(false),[sound,setSound]=useState(false),[notice,setNotice]=useState('');
 const runtime=useRef({mode:'explore' as Mode,time:0,chapter:0,sound:false,loaded:false,disabled:true,ended:false});
 const blob=useRef(''),seekTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const ctx=useRef<AudioContext|null>(null),analyser=useRef<AnalyserNode|null>(null);
 const points=useRef<{time:number;y:number}[]>([]),anchors=useRef<number[]>([]);
 runtime.current.disabled=disabled;
 const changeMode=useCallback((next:Mode)=>{runtime.current.mode=next;setMode(next);},[]);
 const selectChapter=useCallback((i:number)=>{runtime.current.chapter=i;setChapter(i);},[]);
 const stop=useCallback(()=>{audio.current?.pause();changeMode('paused');},[changeMode]);
 const measure=useCallback(()=>{
  const nav=document.querySelector('.nav')?.getBoundingClientRect().height||68;
  const maximum=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const y=(selector:string)=>{const e=root.current?.querySelector(selector);return e?clamp(e.getBoundingClientRect().top+scrollY-nav-20,0,maximum):0;};
  points.current=CUES.map(([time,selector])=>({time,y:y(selector)}));anchors.current=CHAPTERS.map(c=>y(c.selector));
 },[]);
 const animateAudio=()=>{
  try{if(!ctx.current){ctx.current=new AudioContext();const source=ctx.current.createMediaElementSource(audio.current!);analyser.current=ctx.current.createAnalyser();analyser.current.fftSize=256;source.connect(analyser.current);analyser.current.connect(ctx.current.destination);}void ctx.current.resume().catch(()=>{});}catch{/* Native HTML audio remains the fallback. */}
 };
 const play=async()=>{
  const r=runtime.current,a=audio.current;if(!a)return;
  measure();setEngaged(true);setNotice('');
  if(r.ended||r.time>=DURATION-.15){r.time=0;r.ended=false;selectChapter(0);}
  if(r.loaded){
   animateAudio();a.muted=!r.sound;a.volume=.5;
   if(Math.abs(a.currentTime-r.time)>.2)a.currentTime=Math.min(r.time,a.duration||DURATION);
   try{await a.play();}catch{setNotice('Playback was blocked. Press Play again, or explore without sound.');changeMode('paused');return;}
  }
  changeMode(r.disabled?'explore':'guided');
 };
 const toggleSound=async()=>{
  const r=runtime.current,a=audio.current;if(!r.loaded){file.current?.click();return;}
  r.sound=!r.sound;setSound(r.sound);if(!a)return;a.muted=!r.sound;
  if(r.sound){animateAudio();if(r.mode==='explore'){a.currentTime=CHAPTERS[r.chapter].start;try{await a.play();}catch{setNotice('Press Play to start the soundtrack.');}}}
 };
 const seekAudio=useCallback((t:number)=>{
  const a=audio.current,r=runtime.current;if(!a||!r.loaded)return;
  if(seekTimer.current)clearTimeout(seekTimer.current);
  a.volume=.12;
  seekTimer.current=setTimeout(()=>{if(!audio.current)return;audio.current.currentTime=Math.min(t,audio.current.duration||DURATION);audio.current.volume=.5;if(runtime.current.sound)void audio.current.play().catch(()=>setNotice('Press Play to resume the soundtrack.'));},150);
 },[]);
 const jump=(i:number)=>{
  measure();const r=runtime.current;r.time=CHAPTERS[i].start;r.ended=false;selectChapter(i);setEngaged(true);changeMode('explore');seekAudio(r.time);
  window.scrollTo({top:anchors.current[i]||0,behavior:disabled?'instant':'smooth'});
 };
 const loadTrack=(chosen:File)=>{
  if(chosen.size>30*1024*1024||!(/\.(mp3|wav|m4a|ogg|aac|webm)$/i.test(chosen.name)||chosen.type.startsWith('audio/'))){setNotice('Choose an audio file smaller than 30 MB.');return;}
  stop();const a=audio.current;if(!a)return;
  if(blob.current)URL.revokeObjectURL(blob.current);blob.current=URL.createObjectURL(chosen);
  runtime.current.loaded=false;setLoaded(false);a.src=blob.current;a.load();
  a.onloadedmetadata=()=>{
   if(!Number.isFinite(a.duration)||a.duration<235||a.duration>245){setNotice('The chapter map expects the supplied four-minute soundtrack. Choose that MP3.');return;}
   runtime.current.loaded=true;runtime.current.sound=true;runtime.current.time=CHAPTERS[runtime.current.chapter].start;
   a.currentTime=runtime.current.time;a.muted=false;a.volume=.5;setLoaded(true);setSound(true);setNotice('Soundtrack ready. Press Play with sound. The file stays on your device.');
  };
  a.onerror=()=>setNotice('This audio file could not be decoded. Try the supplied MP3.');
 };
 useEffect(()=>{
  const area=root.current;if(!area)return;
  setHost(area.querySelector('.hero-copy'));measure();
  const rs=new ResizeObserver(measure);rs.observe(area);
  CHAPTERS.forEach((c,i)=>{const e=area.querySelector<HTMLElement>(c.selector);if(e){e.dataset.journeyChapter=String(i);e.id=e.id||'journey-'+c.name.toLowerCase().replace(/\s/g,'-');}});
  let last=0,displayAt=0,frame=0,scrollTimer:ReturnType<typeof setTimeout>|null=null,lastEmitted=-1;
  const samples=new Uint8Array(128);
  const tick=(now:number)=>{
   const r=runtime.current,a=audio.current,dt=last?Math.min(.1,(now-last)/1000):0;last=now;
   if(r.mode==='guided'){
    r.time=r.loaded&&a?a.currentTime:Math.min(DURATION,r.time+dt);
    const p=points.current;let j=0;while(j<p.length-2&&r.time>=p[j+1].time)j++;
    if(p[j]&&p[j+1]&&!r.disabled){const f=clamp((r.time-p[j].time)/(p[j+1].time-p[j].time),0,1),e=f*f*(3-2*f);window.scrollTo({top:p[j].y+(p[j+1].y-p[j].y)*e,behavior:'instant'});}
    const i=r.time>=210?4:chapterAt(r.time);if(i!==r.chapter)selectChapter(i);
    if(r.time>=Math.min(DURATION,a?.duration||DURATION)-.08){r.ended=true;changeMode('paused');a?.pause();}
   }else if(r.mode==='explore'&&r.loaded&&a&&!a.paused&&a.currentTime>=CHAPTERS[r.chapter].end-.12){a.pause();}
   if(now-displayAt>100){displayAt=now;
    if(r.mode==='guided'&&Math.abs(r.time-lastEmitted)>.09){window.dispatchEvent(new CustomEvent('kritrna:journey',{detail:{time:r.time,mode:r.mode}}));lastEmitted=r.time;}
    let power=0;if(analyser.current&&r.sound&&a&&!a.paused){analyser.current.getByteTimeDomainData(samples);let sum=0;for(const v of samples)sum+=(v-128)*(v-128);power=clamp(Math.sqrt(sum/samples.length)/38,0,1);}
    area.style.setProperty('--journey-energy',String(power));area.dataset.journeyMode=r.mode;
   }
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);
  const user=()=>{if(runtime.current.mode==='guided')changeMode('explore');setEngaged(true);};
  const key=(e:KeyboardEvent)=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)&&!(e.target as HTMLElement)?.closest('input,textarea,select,.journey-ui'))user();};
  const pointer=(e:PointerEvent)=>{
   const target=e.target as HTMLElement;if(target.closest('.journey-ui'))return;
   if(target.closest('a,button,input,textarea,select,summary')){if(runtime.current.mode==='guided')stop();}
   else if(e.clientX>=document.documentElement.clientWidth-20)user();
  };
  const focus=(e:FocusEvent)=>{if((e.target as HTMLElement)?.closest('input,textarea,select')&&!(e.target as HTMLElement)?.closest('.journey-ui')&&runtime.current.mode==='guided')stop();};
  const scroll=()=>{
   if(runtime.current.mode==='guided')return;
   if(scrollY>60)setEngaged(true);
   if(scrollTimer)clearTimeout(scrollTimer);
   scrollTimer=setTimeout(()=>{
    const r=runtime.current;if(r.mode==='guided')return;
    let i=0;anchors.current.forEach((y,n)=>{if(scrollY+innerHeight*.24>=y)i=n;});
    if(i!==r.chapter){selectChapter(i);r.time=CHAPTERS[i].start;if(r.sound&&r.mode==='explore')seekAudio(r.time);}
   },180);
  };
  const visibility=()=>{if(document.hidden)stop();};
  const receiver=(e:MessageEvent)=>{
   // Optional local review launcher: only accept audio from the exact window that opened this preview.
   if(!new URLSearchParams(location.search).has('localSoundtrack')||e.source!==window.opener||e.data?.type!=='kritrna:local-audio'||!(e.data.audio instanceof Blob))return;
   loadTrack(new File([e.data.audio],'song_2026-09-12T162324.mp3',{type:'audio/mpeg'}));
  };
  window.addEventListener('wheel',user,{passive:true});window.addEventListener('touchstart',user,{passive:true});window.addEventListener('keydown',key);window.addEventListener('pointerdown',pointer);window.addEventListener('focusin',focus);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure);window.addEventListener('message',receiver);document.addEventListener('visibilitychange',visibility);
  if(new URLSearchParams(location.search).has('localSoundtrack'))window.opener?.postMessage({type:'kritrna:audio-ready'},'*');
  return()=>{cancelAnimationFrame(frame);rs.disconnect();if(scrollTimer)clearTimeout(scrollTimer);if(seekTimer.current)clearTimeout(seekTimer.current);audio.current?.pause();if(blob.current)URL.revokeObjectURL(blob.current);void ctx.current?.close().catch(()=>{});window.removeEventListener('wheel',user);window.removeEventListener('touchstart',user);window.removeEventListener('keydown',key);window.removeEventListener('pointerdown',pointer);window.removeEventListener('focusin',focus);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',measure);window.removeEventListener('message',receiver);document.removeEventListener('visibilitychange',visibility);};
 // Controls read runtime refs; this lifecycle is intentionally mounted once.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[changeMode,measure,seekAudio,selectChapter,stop]);
 useEffect(()=>{if(disabled&&runtime.current.mode==='guided'){audio.current?.pause();changeMode('paused');}},[disabled,changeMode]);
 const entry=<div className="journey-entry journey-ui"><div className="journey-entry-actions"><button className="editorial-button light-button" onClick={()=>void play()}>{loaded?'Play with sound':'Play silent preview'} <span aria-hidden="true">▷</span></button><button className="journey-text-button" onClick={()=>jump(1)}>Scroll to explore ↓</button></div><button className="journey-load" onClick={()=>file.current?.click()}>{loaded?'Change soundtrack':'Load your soundtrack'}</button>{notice&&<p className="journey-notice" role="status">{notice}</p>}</div>;
 return <div ref={root} className="journey-home" data-journey-build="mosaic-v1" data-mode={mode}><MosaicReveal root={root} replay={replay}/>{children}{host&&createPortal(entry,host)}<audio ref={audio} preload="none" onEnded={()=>{runtime.current.ended=true;stop();}}/><input ref={file} className="journey-file" type="file" accept="audio/*,.mp3" aria-label="Load the four-minute journey soundtrack" onChange={e=>{const f=e.currentTarget.files?.[0];if(f)loadTrack(f);e.currentTarget.value='';}}/>{engaged&&<div className="journey-dock journey-ui" role="region" aria-label="Journey playback controls"><button onClick={()=>mode==='guided'?stop():void play()}>{mode==='guided'?'Pause':'Play journey'}</button><button onClick={()=>void toggleSound()} aria-pressed={sound}>{loaded?(sound?'Sound on':'Sound off'):'Load soundtrack'}</button><select aria-label="Journey chapter" value={chapter} onChange={e=>jump(Number(e.target.value))}>{CHAPTERS.map((c,i)=><option key={c.name} value={i}>{c.name}</option>)}</select><button className="journey-explore" onClick={()=>{changeMode('explore');}}>Explore freely</button><button className="journey-replay" aria-label="Replay mosaic opening" onClick={()=>{stop();window.scrollTo({top:0,behavior:'instant'});runtime.current.time=0;selectChapter(0);setReplay(v=>v+1);}}>↻</button></div>}</div>;
}
