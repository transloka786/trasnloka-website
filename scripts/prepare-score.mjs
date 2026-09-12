import {mkdir,readFile,writeFile,copyFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const folder=path.join(process.cwd(),'public','audio');
await mkdir(folder,{recursive:true});
const names=['kritrna-score.mp3','song_2026-09-12T162324.mp3'];
let source;
for(const name of names){try{const p=path.join(folder,name);if((await stat(p)).size>10000){source=p;break;}}catch{}}
if(source){const bytes=await readFile(source),sha=createHash('sha256').update(bytes).digest('hex');await copyFile(source,path.join(folder,'kritrna-score.mp3')).catch(e=>{if(e.code!=='EINVAL')throw e;});await writeFile(path.join(folder,'score.json'),JSON.stringify({available:true,src:'/audio/kritrna-score.mp3?v='+sha.slice(0,12),sha256:sha,bytes:bytes.length}));console.log('SCORE_READY',sha,bytes.length);}
else{await writeFile(path.join(folder,'score.json'),JSON.stringify({available:false,src:null}));console.log('SCORE_NOT_BUNDLED: no source audio in this checkout; visitors retain silent browsing.');}
