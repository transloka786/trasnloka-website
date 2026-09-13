// Public reference geometry and the existing brand asset only; never load candidate data.
import {mkdir,writeFile,readFile,copyFile} from 'node:fs/promises';
import sharp from 'sharp';
const destination=new URL('../public/molecular/',import.meta.url),brand=new URL('../public/brand/',import.meta.url);
await mkdir(destination,{recursive:true});await mkdir(brand,{recursive:true});
// Preserve original colours/geometry. Remove only border-connected near-white background.
try{
 const {data,info}=await sharp(new URL('../public/logo.png',import.meta.url).pathname).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const {width:w,height:h}=info,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
 const background=i=>data[i*4+3]>0&&Math.min(data[i*4],data[i*4+1],data[i*4+2])>238;
 const push=i=>{if(i>=0&&i<w*h&&!seen[i]&&background(i)){seen[i]=1;queue[tail++]=i;}};
 for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1);}
 while(head<tail){const i=queue[head++];data[i*4+3]=0;const x=i%w;if(x>0)push(i-1);if(x<w-1)push(i+1);push(i-w);push(i+w);}
 await sharp(data,{raw:{width:w,height:h,channels:4}}).trim().resize({width:700,height:700,fit:'inside',withoutEnlargement:true}).png().toFile(new URL('kritrna-mark.png',brand).pathname);
 console.log('Original KritRNA logo prepared; geometry and brand colours retained.');
}catch(error){await copyFile(new URL('../public/logo.png',import.meta.url),new URL('kritrna-mark.png',brand));console.warn('Using unchanged original logo:',error.message);}
const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const norm=a=>{const n=Math.hypot(...a);if(n<1e-7)throw new Error('Degenerate orientation');return a.map(v=>v/n);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
try{
 const response=await fetch('https://files.rcsb.org/download/1EHZ.pdb',{signal:AbortSignal.timeout(18000)});if(!response.ok)throw new Error(`RCSB HTTP ${response.status}`);
 const pdb=await response.text(),residues=new Map();
 for(const line of pdb.split('\n')){
  if(!/^(ATOM  |HETATM)/.test(line)||line[21]!=='A'||![' ','A'].includes(line[16]))continue;
  const id=Number(line.slice(22,26));if(!Number.isInteger(id)||id<1||id>76)continue;
  const atom=line.slice(12,16).trim(),p=[30,38,46].map(i=>Number(line.slice(i,i+8)));if(!p.every(Number.isFinite))throw new Error('Non-finite coordinate');
  if(!residues.has(id))residues.set(id,{});residues.get(id)[atom]=p;
 }
 const data=[...residues.entries()].sort((a,b)=>a[0]-b[0]);
 if(data.length!==76||!data.every(([,r])=>r.P||r["C4'"]))throw new Error('Incomplete backbone trace');
 const position=r=>r.P||r["C4'"],mean=ids=>[0,1,2].map(k=>ids.reduce((s,id)=>s+position(residues.get(id))[k],0)/ids.length);
 const centre=mean(data.map(([id])=>id)),y=norm(sub(mean([74,75,76]),mean([34,35,36]))),z=norm(cross(y,sub(mean([18,19,55,56]),centre))),x=norm(cross(y,z));
 const transform=p=>{const a=sub(p,centre);return [dot(a,x),dot(a,y),dot(a,z)].map(n=>Number((n/13).toFixed(5)));};
 const geometry={source:'https://www.rcsb.org/structure/1EHZ',doi:'10.1017/S1355838200000364',label:'Public reference: yeast phenylalanine tRNA, 1EHZ',chain:'A',residueCount:76,backbone:data.map(([,r])=>transform(position(r))),bases:data.map(([,r])=>transform(r.N9||r.N1||r["C1'"]||position(r)))};
 await writeFile(new URL('1ehz.json',destination),JSON.stringify(geometry));console.log('PUBLIC_STRUCTURE_OK: 1EHZ / 76 residues / single chain A.');
}catch(error){
 let cached=false;try{const old=JSON.parse(await readFile(new URL('1ehz.json',destination),'utf8'));cached=old.backbone?.length===76;}catch{}
 if(!cached)await writeFile(new URL('1ehz.json',destination),JSON.stringify({fallback:true}));
 console.warn('PUBLIC_STRUCTURE_FALLBACK:',error.message);
}
