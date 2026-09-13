import {chromium,webkit} from '@playwright/test';
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
await mkdir('hotfix-artifacts',{recursive:true});
const report={cases:[],failures:[]};
const assert=(ok,message)=>{if(!ok)report.failures.push(message);};
const tests=[
 {name:'iphone-webkit',engine:webkit,mobile:true,viewport:{width:390,height:844}},
 {name:'ipad-webkit',engine:webkit,mobile:true,viewport:{width:820,height:1180}},
 {name:'android-chromium',engine:chromium,mobile:true,viewport:{width:390,height:844}},
 {name:'desktop-chromium',engine:chromium,mobile:false,viewport:{width:1440,height:1000}}
];
for(const test of tests){
 let browser,page;const row={name:test.name};
 try{
  browser=await test.engine.launch({headless:true,...(test.engine===chromium?{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{} )});
  const context=await browser.newContext({viewport:test.viewport,isMobile:test.mobile,hasTouch:test.mobile,deviceScaleFactor:1});
  page=await context.newPage();page.setDefaultTimeout(20000);
  await page.addInitScript(()=>{window.__audioEvents=[];for(const name of ['loadedmetadata','seeking','seeked','playing','pause','volumechange','error'])document.addEventListener(name,e=>{if(e.target instanceof HTMLAudioElement)window.__audioEvents.push({event:name,time:e.target.currentTime,muted:e.target.muted,ready:e.target.readyState,at:performance.now()});},true);});
  row.errors=[];page.on('pageerror',e=>row.errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>!!document.querySelector('audio')?.getAttribute('src'));
  // Safari can defer metadata until a trusted gesture. Do not require preload before tapping.
  if(test.mobile)await page.touchscreen.tap(test.viewport.width-16,130);else await page.mouse.click(test.viewport.width-16,130);
  await page.waitForFunction(()=>{const a=document.querySelector('audio');return a&&a.readyState>=1&&a.currentTime>=10;},{},{timeout:20000});
  row.initial=await page.locator('audio').evaluate(a=>({time:a.currentTime,duration:a.duration,paused:a.paused,muted:a.muted,error:a.error?.code||null}));
  assert(row.initial.time>=10,test.name+': source position starts beyond quiet intro');
  // Pause only the media for stable visual inspection; keep the mosaic running.
  await page.locator('audio').evaluate(a=>a.pause());
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.querySelector('.editorial-hero')?.dataset.mosaic==='pulsing',{},{timeout:20000});
  const hero=page.locator('.editorial-hero'),heading=page.locator('h1');
  row.css=await page.locator('.hero-composition').evaluate(e=>{const s=getComputedStyle(e);return {filtered:s.filter!=='none',masked:s.maskImage!=='none',webkitMasked:s.webkitMaskImage!=='none',opacity:s.opacity,visibility:s.visibility};});
  row.mode=await hero.getAttribute('data-mosaic-content');
  if(test.mobile){assert(!row.css.filtered&&!row.css.masked,test.name+': no content mask/filter');assert(row.mode==='unmasked',test.name+': mobile safe path');}
  else assert(row.mode==='desktop-filter'&&row.css.filtered,test.name+': desktop effect retained');
  assert(await heading.isVisible(),test.name+': heading layout visible');
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  const box=await heading.boundingBox();const screenshot=await page.screenshot({path:`hotfix-artifacts/${test.name}.png`,timeout:20000});
  if(!box)throw new Error('Heading has no bounding box');
  const left=Math.max(0,Math.floor(box.x)),top=Math.max(0,Math.floor(box.y));
  const image=await sharp(screenshot).extract({left,top,width:Math.min(Math.floor(box.width),test.viewport.width-left),height:Math.min(Math.floor(box.height),test.viewport.height-top)}).png().toBuffer();
  await writeFile(`hotfix-artifacts/${test.name}-heading.png`,image);
  const {data,info}=await sharp(image).removeAlpha().raw().toBuffer({resolveWithObject:true});
  let bright=0;for(let p=0;p<data.length;p+=info.channels)if(data[p]>125&&data[p+1]>125&&data[p+2]>125)bright++;
  row.brightPixels=bright;assert(bright>150,test.name+': real rendered text pixels');
  row.frame1=Number(await hero.getAttribute('data-mosaic-frame'));await page.waitForTimeout(900);row.frame2=Number(await hero.getAttribute('data-mosaic-frame'));assert(row.frame2>row.frame1,test.name+': background keeps pulsing');
  assert(await page.locator('input[type=file],.journey-dock').count()===0,test.name+': no upload/dashboard');
  if(test.mobile)await page.touchscreen.tap(test.viewport.width-16,130);else await page.mouse.click(test.viewport.width-16,130);
  await page.waitForFunction(()=>{const a=document.querySelector('audio');return a&&!a.paused&&!a.muted&&a.currentTime>10.15;},{},{timeout:15000});
  row.playing=await page.locator('audio').evaluate(a=>({time:a.currentTime,paused:a.paused,muted:a.muted,volume:a.volume,error:a.error?.code||null}));
  assert(!row.playing.paused&&!row.playing.muted&&!row.playing.error,test.name+': unmuted playback after gesture');
  await page.getByRole('button',{name:'Pause decorative motion'}).click();
  await page.waitForFunction(()=>document.querySelector('audio')?.paused&&document.querySelector('.editorial-hero')?.dataset.mosaic==='off');
  assert(await heading.isVisible(),test.name+': content survives pause');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),test.name+': no overflow');
  if(test.mobile){await page.getByRole('button',{name:'Open menu'}).click();assert(await page.locator('#mobile-navigation').isVisible(),test.name+': menu works');}
  assert(row.errors.length===0,test.name+': browser errors '+row.errors.join('; '));
 }catch(error){row.failure=error.stack||String(error);report.failures.push(test.name+': '+row.failure);}
 finally{
  if(page){row.audioEvents=await page.evaluate(()=>window.__audioEvents).catch(()=>[]);row.finalAudio=await page.locator('audio').evaluate(a=>({time:a.currentTime,paused:a.paused,muted:a.muted,ready:a.readyState,error:a.error?.message||null,src:a.currentSrc})).catch(()=>null);const starts=row.audioEvents?.filter(e=>e.event==='playing')||[];assert(starts.every(e=>e.time>=9.9),test.name+': no playing event in skipped intro');}
  report.cases.push(row);await browser?.close();
 }
}
await writeFile('hotfix-artifacts/report.json',JSON.stringify(report,null,2));console.log('MOBILE_HOTFIX_REPORT '+JSON.stringify(report));
if(report.failures.length)process.exitCode=1;
