import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
await mkdir('noir-artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const report={viewports:[],routes:[],failures:[],notes:[],screenshots:[]};
const assert=(condition,message)=>{if(!condition)report.failures.push(message);};
try{
 for(const width of [1440,768,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1000},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'networkidle',timeout:60000});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
  assert(await page.locator('h1').count()===1,`${width}: one main heading`);
  assert(await page.locator('body').innerText().then(t=>['HBB','DMD','TP53'].every(g=>t.includes(g))),`${width}: programme priorities`);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
  assert(!overflow,`${width}: horizontal overflow`);
  const heroState=await page.locator('[data-scene="trna"]').getAttribute('data-renderer');
  report.viewports.push({width,overflow,heroRenderer:heroState});
  const name=`noir-artifacts/home-${width}.png`;await page.screenshot({path:name,fullPage:false});report.screenshots.push(name);
  const pause=page.getByRole('button',{name:'Pause decorative motion'});await pause.click();assert(await page.locator('html').getAttribute('data-motion')==='off',`${width}: pause control`);
  const stop=page.getByRole('button',{name:'02 A premature stop',exact:false});await stop.scrollIntoViewIfNeeded();await stop.click();assert(await stop.getAttribute('aria-pressed')==='true',`${width}: translation chapter selection`);
  await page.getByRole('button',{name:'03 Suppressor tRNA',exact:false}).click();await page.waitForTimeout(650);
  const mechanism=`noir-artifacts/mechanism-${width}.png`;await page.locator('.translation-observatory').screenshot({path:mechanism});report.screenshots.push(mechanism);
  await page.locator('[data-scene="network"]').first().scrollIntoViewIfNeeded();await page.waitForTimeout(1600);
  const networkState=await page.locator('[data-scene="network"]').first().getAttribute('data-renderer');report.viewports.at(-1).networkRenderer=networkState;
  const networkShot=`noir-artifacts/network-${width}.png`;await page.locator('.engine-two').screenshot({path:networkShot});report.screenshots.push(networkShot);
  const mark=page.locator('.brand-monument img');await mark.scrollIntoViewIfNeeded();await expectLoaded(mark,`brand ${width}`);
  if(width<1000){await page.getByRole('button',{name:'Open menu'}).click();assert(await page.locator('#mobile-navigation').isVisible(),`${width}: mobile navigation`);await page.keyboard.press('Escape');assert(!(await page.locator('#mobile-navigation').isVisible()),`${width}: Escape closes menu`);}
  assert(errors.length===0,`${width}: browser page errors ${errors.join('; ')}`);
  report.viewports.at(-1).errors=errors;
  // A complete screenshot after visiting sections; no forms are submitted.
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=750){await page.evaluate(n=>scrollTo(0,n),y);await page.waitForTimeout(75);}await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`noir-artifacts/full-${width}.png`,fullPage:true});
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 for(const route of ['/science','/platform','/small-world','/about','/india','/team','/pipeline','/evidence','/careers','/contact','/partners','/investors','/resources','/ask','/search']){
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForTimeout(200);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),status=response?.status();report.routes.push({route,status,overflow});assert(status===200,`${route}: HTTP ${status}`);assert(!overflow,`${route}: mobile overflow`);
  if(route==='/about')assert((await page.locator('body').innerText()).includes('Pragati Bhaisora'),'/about: both founders');
 }
 await page.goto(base,{waitUntil:'networkidle'});assert(await page.locator('html').getAttribute('data-motion')==='off','OS reduced motion');
 const structure=await page.request.get(base+'/molecular/1ehz.json');const structureData=await structure.json();report.publicReference=structureData.fallback?'labelled fallback':`${structureData.label} / ${structureData.residueCount} residues`;
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base);assert(await nojs.locator('h1').isVisible(),'No-JavaScript heading');assert(await nojs.getByText('A premature stop', {exact:false}).count()>0,'No-JavaScript scientific content');await nojs.close();
 async function expectLoaded(locator,label){await locator.waitFor();await locator.evaluate(img=>img.decode()).catch(()=>{});assert(await locator.evaluate(img=>img.complete&&img.naturalWidth>0),label+': image loads');}
}catch(error){report.failures.push(error.stack||String(error));}
finally{await browser.close();await writeFile('noir-artifacts/report.json',JSON.stringify(report,null,2));console.log('NOIR_SMOKE_REPORT '+JSON.stringify(report));}
if(report.failures.length)process.exitCode=1;
