import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
let activePage;
const browser=await chromium.launch({headless:true,args:['--disable-dev-shm-usage']});
await mkdir('privacy-artifacts',{recursive:true});
try {
  for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:900}});
    const page=await context.newPage();activePage=page;page.setDefaultTimeout(15000);const requests=[],errors=[];
    page.on('request',req=>{if(new URL(req.url()).pathname==='/api/analytics')requests.push(req);});
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(`${base}/contact`,{waitUntil:'networkidle'});
    await expect(page.getByRole('region',{name:'Website privacy choices'})).toBeVisible();
    if(requests.length)throw new Error('Analytics ran before consent');
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw new Error(`Overflow at ${width}`);
    for(const button of await page.getByRole('region',{name:'Website privacy choices'}).getByRole('button').all()) {
      const unobstructed=await button.evaluate(element=>{
        const box=element.getBoundingClientRect();
        return [[8,8],[box.width-8,8],[8,box.height-8],[box.width-8,box.height-8]].every(([x,y])=>element.contains(document.elementFromPoint(box.left+x,box.top+y)));
      });
      if(!unobstructed)throw new Error(`Privacy button is covered at ${width}: ${await button.innerText()}`);
    }
    await page.screenshot({path:`privacy-artifacts/banner-${width}.png`});
    await page.getByRole('button',{name:'Reject optional',exact:true}).click();
    await page.reload({waitUntil:'networkidle'});
    await expect(page.getByRole('region',{name:'Website privacy choices'})).toHaveCount(0);
    if(requests.length)throw new Error('Analytics ran after rejection');
    await page.getByRole('button',{name:'Privacy settings',exact:true}).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('checkbox',{name:'Optional analytics'})).not.toBeChecked();
    await page.screenshot({path:`privacy-artifacts/settings-${width}.png`});
    await page.getByRole('checkbox',{name:'Optional analytics'}).check();
    const saveResponse=page.waitForResponse(res=>new URL(res.url()).pathname==='/api/privacy/preferences');
    await page.getByRole('button',{name:'Save settings'}).click();
    const saved=await saveResponse; if(!saved.ok())throw new Error(`Preference save failed: ${saved.status()} ${await saved.text()}`);
    await expect.poll(()=>requests.length).toBeGreaterThan(0);
    await page.getByRole('button',{name:'Privacy settings',exact:true}).click();
    await page.getByRole('dialog').getByRole('button',{name:'Reject optional',exact:true}).click();
    const count=requests.length;
    await page.reload({waitUntil:'networkidle'});
    if(requests.length!==count)throw new Error('Analytics continued after withdrawal');
    await page.goto(`${base}/admin/website`,{waitUntil:'domcontentloaded'});
    await expect(page.getByRole('heading',{name:'Website reporting'})).toBeVisible();
    await expect(page.getByRole('heading',{name:'Reporting is not active yet'})).toBeVisible();
    if(requests.length!==count)throw new Error('Admin page was tracked');
    const report=await page.request.get(`${base}/api/reporting/summary`);if(report.status()!==401)throw new Error('Unauthenticated reports were accessible');
    await page.screenshot({path:`privacy-artifacts/dashboard-${width}.png`,fullPage:true});
    await page.goto(`${base}/newsletter/confirm#token=${'a'.repeat(64)}`,{waitUntil:'domcontentloaded'});
    await expect(page.getByRole('button',{name:'Confirm subscription',exact:true})).toBeVisible();
    if(page.url().includes('token'))throw new Error('Confirmation token was not cleared from history');
    if(requests.length!==count)throw new Error('Newsletter token page was tracked');
    // No contact, subscription, confirmation or email submission occurs in this test.
    if(errors.length)throw new Error(errors.join('\n'));
    await context.close();
  }
  console.log('Privacy browser checks passed: first visit, reject, accept, withdraw, mobile layout, restricted reports, token pages.');
}catch(error){
  if(activePage&&!activePage.isClosed()){await activePage.screenshot({path:'privacy-artifacts/failure.png',fullPage:true}).catch(()=>{});console.error('Visible page at failure:',await activePage.locator('body').innerText().catch(()=>''));}
  throw error;
}finally{await browser.close();}
