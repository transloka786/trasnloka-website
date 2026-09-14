import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000',origin='https://www.hellokritrna.com';
await mkdir('seo-artifacts',{recursive:true});
const report={routes:[],failures:[],discovery:{},liveAudit:[],screenshots:[]};
const assert=(ok,message)=>{if(!ok)report.failures.push(message);};
// Next serializes an origin root without a trailing slash; these are the same URL.
// Preserve full path/query/hash comparisons so a homepage canonical on an interior page still fails.
const sameUrl=(a,b)=>{try{return Boolean(a&&b)&&new URL(a).href===new URL(b).href;}catch{return false;}};
const browser=await chromium.launch({headless:true});
try{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:1280,height:900}});
 const page=await context.newPage();
 const sitemapResponse=await page.request.get(base+'/sitemap.xml'),xml=await sitemapResponse.text();
 const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert(sitemapResponse.ok(),'Sitemap returns HTTP 200');assert(urls.length===27,'27 indexable pages in sitemap');assert(new Set(urls).size===urls.length,'No duplicate sitemap URL');
 const titles=new Set();
 for(const url of urls){
  const path=new URL(url).pathname,response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:60000});
  const canonicals=await page.locator('link[rel="canonical"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
  const title=await page.title(),description=await page.locator('meta[name="description"]').getAttribute('content');
  const og=await page.locator('meta[property="og:url"]').getAttribute('content');
  const robots=await page.locator('meta[name="robots"]').getAttribute('content');
  assert(response?.status()===200,path+': HTTP 200');assert(canonicals.length===1&&sameUrl(canonicals[0],url),path+': one self canonical');
  assert(sameUrl(og,url),path+': route-specific Open Graph URL');assert(Boolean(description)&&description.length>35,path+': meaningful description');
  assert(title&&title!=='KritRNA'&&!titles.has(title),path+': distinct title');titles.add(title);
  assert(!robots?.includes('noindex'),path+': indexable production metadata');assert(!response?.headers()['x-robots-tag']?.includes('noindex'),path+': no production noindex header');
  const h1=await page.locator('h1').count();assert(h1===1,path+': one H1');
  const ld=await page.locator('script[type="application/ld+json"]').allTextContents();for(const value of ld){try{JSON.parse(value);}catch{assert(false,path+': malformed JSON-LD');}}
  assert(ld.some(v=>v.includes('#webpage')),path+': page identity in server HTML');
  report.routes.push({path,status:response?.status(),canonical:canonicals[0],title,description,og,robots,h1,jsonLdBlocks:ld.length});
 }
 for(const path of ['/search','/ask']){const response=await page.goto(base+path,{waitUntil:'domcontentloaded'});assert(!urls.includes(origin+path),path+': excluded from sitemap');assert((await page.locator('meta[name="robots"]').getAttribute('content'))?.includes('noindex'),path+': noindex metadata');assert(response?.headers()['x-robots-tag']?.includes('noindex'),path+': noindex header');}
 const robotsResponse=await page.request.get(base+'/robots.txt'),robotsText=await robotsResponse.text();
 assert(robotsText.includes('User-Agent: OAI-SearchBot')||robotsText.includes('User-agent: OAI-SearchBot'),'ChatGPT search crawler explicitly allowed');assert(robotsText.includes('PerplexityBot'),'Perplexity search crawler explicitly allowed');assert(robotsText.includes('Allow: /api/og'),'Social preview image crawl exception');assert(!robotsText.includes('Disallow: /search'),'Noindex pages remain crawlable');
 report.discovery={sitemapUrls:urls,robots:robotsText};
 await page.goto(base+'/rna-research-india',{waitUntil:'domcontentloaded'});
 const text=await page.locator('.research-guide-body').innerText();assert(text.length>6500,'Substantial guide in HTML without JavaScript');assert(text.includes('RNA India')&&text.includes('HBB')&&text.includes('TP53'),'Guide covers ecosystem and actual programme priorities');assert(await page.locator('.research-guide-sources a').count()===7,'Seven attributed primary sources');
 assert(await page.locator('footer a[href="/rna-research-india"]').count()===1,'Internal discovery link');
 for(const width of [1440,390]){await page.setViewportSize({width,height:width===390?844:1000});await page.evaluate(()=>document.fonts.ready);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),width+': guide no horizontal overflow');const path=`seo-artifacts/rna-india-${width}.png`;await page.screenshot({path,fullPage:false});report.screenshots.push(path);}
 // Observe the currently live deployment, without modifying it. A network failure is reported, not treated as proof of an outage.
 for(const url of ['https://hellokritrna.com/science',origin+'/science',origin+'/robots.txt',origin+'/sitemap.xml']){try{const r=await fetch(url,{signal:AbortSignal.timeout(15000)}),html=await r.text();const canonical=html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];report.liveAudit.push({requested:url,finalUrl:r.url,status:r.status,canonical:canonical||null,robots:r.headers.get('x-robots-tag')});}catch(error){report.liveAudit.push({requested:url,error:String(error)});}}
 await context.close();
}catch(error){report.failures.push(error.stack||String(error));}
finally{await browser.close();await writeFile('seo-artifacts/report.json',JSON.stringify(report,null,2));console.log('SEO_REPORT '+JSON.stringify(report));}
if(report.failures.length)process.exitCode=1;
