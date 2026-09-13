import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
await mkdir('noir-artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const report={viewports:[],failures:[],audio:null};
const assert=(value,message)=>{if(!value)report.failures.push(message);};
try{
 for(const width of [1440,768,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle',timeout:60000});await page.waitForTimeout(4200);
  const hero=page.locator('.editorial-hero');
  assert(await page.locator('[data-journey-build="mosaic-v2"]').count()===1,`${width}: ambient build marker`);
  const initial=Number(await hero.getAttribute('data-mosaic-frame'));
  await page.waitForTimeout(1300);const later=Number(await hero.getAttribute('data-mosaic-frame'));
  assert(later>initial,`${width}: mosaic keeps pulsing after reveal`);
  assert(await hero.getAttribute('data-mosaic')==='pulsing',`${width}: persistent pulse state`);
  assert(Number(await hero.getAttribute('data-tile-size'))<=18,`${width}: restrained tile size`);
  await page.screenshot({path:`noir-artifacts/ambient-home-${width}.png`});
  const waves=Number(await hero.getAttribute('data-pointer-waves')||0);
  await page.mouse.move(width*.55,250);await page.mouse.move(width*.82,350,{steps:15});await page.waitForTimeout(200);
  assert(Number(await hero.getAttribute('data-pointer-waves'))>waves,`${width}: pointer creates travelling waves`);
  await page.screenshot({path:`noir-artifacts/ambient-pointer-${width}.png`});
  const text=await page.locator('body').innerText();
  for(const word of ['Load your soundtrack','Load soundtrack','Play silent preview','Sunrise','First Steps','Horizon','Reflection'])assert(!text.includes(word),`${width}: no soundtrack UI ${word}`);
  assert(await page.locator('input[type=file]').count()===0,`${width}: no visitor audio upload`);
  assert(await page.locator('.journey-dock').count()===0,`${width}: no playback dashboard`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);assert(!overflow,`${width}: no horizontal overflow`);
  const audioState=await page.locator('.journey-home').getAttribute('data-audio');
  await page.getByRole('button',{name:'Pause decorative motion'}).click();await page.waitForTimeout(250);
  assert(await hero.getAttribute('data-mosaic')==='off',`${width}: pause stops tiles`);
  assert(await page.locator('audio').evaluate(a=>a.paused),`${width}: motion pause stops soundtrack`);
  assert(errors.length===0,`${width}: browser errors ${errors.join('; ')}`);
  report.viewports.push({width,initial,later,overflow,audioState,errors});await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(base,{waitUntil:'networkidle'});await reduced.waitForTimeout(300);
 assert(await reduced.locator('.editorial-hero').getAttribute('data-mosaic')==='off','Reduced motion disables displacement and pulse');
 const response=await reduced.request.get(base+'/audio/score.json');report.audio=await response.json();
 if(report.audio.available){const source=await reduced.request.get(base+report.audio.src);assert(source.ok(),'Bundled soundtrack resolves');assert((await source.body()).length>10000,'Bundled soundtrack is not empty');}
 else report.audio.note='Source MP3 is not in this repository; this tests silent fallback, not audible playback.';
 await reduced.close();
}catch(error){report.failures.push(error.stack||String(error));}
finally{await browser.close();await writeFile('noir-artifacts/ambient-report.json',JSON.stringify(report,null,2));console.log('AMBIENT_REPORT '+JSON.stringify(report));}
if(report.failures.length)process.exitCode=1;
