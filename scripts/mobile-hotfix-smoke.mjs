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
 let browser;
 try{
  browser=await test.engine.launch({headless:true,...(test.engine===chromium?{args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']}:{} )});
  const context=await browser.newContext({viewport:test.viewport,isMobile:test.mobile,hasTouch:test.mobile,deviceScaleFactor:1});
  const page=await context.newPage();page.setDefaultTimeout(20000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>document.querySelector('.editorial-hero')?.dataset.mosaic==='pulsing',{},{timeout:20000});
  const hero=page.locator('.editorial-hero'),heading=page.locator('h1');
  const css=await page.locator('.hero-composition').evaluate(e=>{const s=getComputedStyle(e);return {filter:s.filter,mask:s.maskImage,webkitMask:s.webkitMaskImage,opacity:s.opacity,visibility:s.visibility};});
  const mode=await hero.getAttribute('data-mosaic-content');
  if(test.mobile){assert(css.filter==='none'&&css.mask==='none',test.name+': no content filter/mask');assert(mode==='unmasked',test.name+': mobile safe path');}
  else assert(mode==='desktop-filter'&&css.filter.includes('url('),test.name+': desktop effect retained');
  assert(await heading.isVisible(),test.name+': heading layout visible');
  // Pixel check: a masked-away heading can still satisfy DOM visibility assertions.
  const image=await heading.screenshot({timeout:20000});await writeFile(`hotfix-artifacts/${test.name}-heading.png`,image);
  const {data,info}=await sharp(image).removeAlpha().raw().toBuffer({resolveWithObject:true});
  let bright=0;for(let p=0;p<data.length;p+=info.channels)if(data[p]>125&&data[p+1]>125&&data[p+2]>125)bright++;
  assert(bright>150,test.name+': actual readable heading pixels, not an empty mosaic');
  await page.screenshot({path:`hotfix-artifacts/${test.name}.png`});
  const frame1=Number(await hero.getAttribute('data-mosaic-frame'));await page.waitForTimeout(900);const frame2=Number(await hero.getAttribute('data-mosaic-frame'));
  assert(frame2>frame1,test.name+': background keeps pulsing');
  assert(await page.locator('input[type=file],.journey-dock').count()===0,test.name+': no audio upload/dashboard');
  await page.waitForFunction(()=>{const a=document.querySelector('audio');return a&&a.readyState>=1&&a.currentTime>=10;},{},{timeout:20000});
  const initial=await page.locator('audio').evaluate(a=>({time:a.currentTime,duration:a.duration,paused:a.paused,error:a.error?.code||null}));
  assert(initial.time>=10&&initial.time<30,test.name+': initial playback offset is 10s');
  // A real pointer/touch interaction supplies normal autoplay permission.
  if(test.mobile)await page.touchscreen.tap(test.viewport.width-16,130);else await page.mouse.click(test.viewport.width-16,130);
  await page.waitForFunction(()=>{const a=document.querySelector('audio');return a&&!a.paused&&a.currentTime>10.15;},{},{timeout:20000});
  const playing=await page.locator('audio').evaluate(a=>({time:a.currentTime,paused:a.paused,muted:a.muted,volume:a.volume,error:a.error?.code||null}));
  assert(!playing.paused&&!playing.muted&&!playing.error,test.name+': media playing after gesture');
  await page.getByRole('button',{name:'Pause decorative motion'}).click();
  await page.waitForFunction(()=>document.querySelector('audio')?.paused&&document.querySelector('.editorial-hero')?.dataset.mosaic==='off');
  assert(await page.locator('h1').isVisible(),test.name+': content survives motion pause');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),test.name+': no horizontal overflow');
  if(test.mobile){await page.getByRole('button',{name:'Open menu'}).click();assert(await page.locator('#mobile-navigation').isVisible(),test.name+': menu works');}
  assert(errors.length===0,test.name+': browser errors '+errors.join('; '));
  report.cases.push({name:test.name,mode,css,brightPixels:bright,frame1,frame2,initial,playing,errors});
 }catch(error){report.failures.push(test.name+': '+(error.stack||String(error)));}
 finally{await browser?.close();}
}
await writeFile('hotfix-artifacts/report.json',JSON.stringify(report,null,2));console.log('MOBILE_HOTFIX_REPORT '+JSON.stringify(report));
if(report.failures.length)process.exitCode=1;
