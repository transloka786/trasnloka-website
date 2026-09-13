import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
await mkdir('noir-artifacts',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
const report={build:'mosaic-v1',checks:[],failures:[],screenshots:[]};
const check=(ok,name)=>{report.checks.push({name,ok});if(!ok)report.failures.push(name);};
function testAudio(){const rate=8000,seconds=240,bytes=rate*seconds*2,b=Buffer.alloc(44+bytes);b.write('RIFF',0);b.writeUInt32LE(36+bytes,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(bytes,40);for(let n=0;n<rate*seconds;n++)b.writeInt16LE(Math.round(1100*Math.sin(2*Math.PI*220*n/rate)),44+n*2);return b;}
try{
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});await page.locator('.journey-entry').waitFor();
  check(await page.locator('[data-journey-build="mosaic-v1"]').count()===1,width+': new journey build');
  await page.waitForTimeout(3300);
  check(await page.locator('.hero-composition').getAttribute('data-reveal')==='ready',width+': mosaic settles and mask is removed');
  check(!(await page.locator('.hero-baseline').isVisible()),width+': ornamental slogan rail removed');
  check(await page.locator('.editorial-hero').evaluate(e=>e.getBoundingClientRect().bottom>=innerHeight-3),width+': only landing in initial viewport');
  const shot=`noir-artifacts/journey-home-${width}.png`;await page.screenshot({path:shot});report.screenshots.push(shot);
  await page.getByRole('button',{name:'Play silent preview',exact:true}).click();await page.waitForTimeout(350);
  check(await page.locator('.journey-home').getAttribute('data-mode')==='guided',width+': silent guided preview starts');
  await page.mouse.wheel(0,300);await page.waitForTimeout(400);
  check(await page.locator('.journey-home').getAttribute('data-mode')==='explore',width+': user wheel immediately takes over');
  await page.getByLabel('Journey chapter',{exact:true}).selectOption('2');await page.waitForTimeout(1000);
  check(await page.getByLabel('Journey chapter',{exact:true}).inputValue()==='2',width+': Discovery chapter navigation');
  check(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)),width+': no overflow');
  await page.locator('.journey-file').setInputFiles({name:'journey-test.wav',mimeType:'audio/wav',buffer:testAudio()});
  await page.waitForFunction(()=>document.querySelector('.journey-home audio')?.readyState>=2);
  await page.locator('.journey-dock').getByRole('button',{name:'Play journey',exact:true}).click();await page.waitForTimeout(450);
  check(await page.locator('audio').evaluate(a=>!a.paused&&a.currentTime>0),width+': local audio plays');
  for(const [time,expected] of [[30.1,'1'],[90.1,'2'],[150.1,'3'],[210.1,'4']]){
   await page.locator('audio').evaluate((a,t)=>{a.currentTime=t;},time);await page.waitForTimeout(250);
   check(await page.getByLabel('Journey chapter',{exact:true}).inputValue()===expected,width+': audio chapter '+time);
  }
  await page.locator('.journey-dock').getByRole('button',{name:'Pause',exact:true}).click();check(await page.locator('audio').evaluate(a=>a.paused),width+': pause stops audio');
  await page.goto(base+'/science',{waitUntil:'networkidle'});check(await page.locator('.restored-ribosome').count()===1,width+': restored live-style ribosome');
  const biology=`noir-artifacts/journey-ribosome-${width}.png`;await page.locator('.translation-observatory').screenshot({path:biology});report.screenshots.push(biology);
  await page.goto(base+'/pipeline',{waitUntil:'networkidle'});check(await page.locator('.pipeline-programme').count()===3,width+': three programme cards');
  const dark=await page.locator('.pipeline-programme').evaluateAll(es=>es.every(e=>{const c=getComputedStyle(e).backgroundColor.match(/\d+/g)?.slice(0,3).map(Number)||[255];return Math.max(...c)<60;}));check(dark,width+': programme cards are dark');
  check(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)),width+': pipeline no overflow');
  const pipe=`noir-artifacts/journey-pipeline-${width}.png`;await page.screenshot({path:pipe,fullPage:true});report.screenshots.push(pipe);
  check(errors.length===0,width+': no browser errors '+errors.join(';'));await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto(base,{waitUntil:'networkidle'});await reduced.waitForTimeout(200);check(await reduced.locator('.hero-composition').getAttribute('data-reveal')==='ready','Reduced motion has no reveal displacement');check(await reduced.getByRole('heading',{level:1}).isVisible(),'Reduced motion retains heading');await reduced.close();
}catch(e){report.failures.push(e.stack||String(e));}
finally{await browser.close();await writeFile('noir-artifacts/journey-report.json',JSON.stringify(report,null,2));console.log('JOURNEY_SMOKE_REPORT '+JSON.stringify(report));}
if(report.failures.length)process.exitCode=1;
