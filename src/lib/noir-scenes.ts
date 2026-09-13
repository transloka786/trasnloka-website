import * as THREE from 'three';
export type SceneKind='trna'|'network'|'translation';
export type SceneHandle={reference:boolean;motion:(on:boolean)=>void;step:(n:number)=>void;dispose:()=>void};
type Point=[number,number,number];
type Reference={backbone:Point[];bases:Point[];fallback?:boolean};
let referencePromise:Promise<Reference|null>|undefined;
function reference(){return referencePromise??=(fetch('/molecular/1ehz.json').then(r=>r.ok?r.json():null).then((r:Reference|null)=>r&&!r.fallback&&r.backbone?.length===76&&r.backbone.every(p=>p.length===3&&p.every(Number.isFinite))?r:null).catch(()=>null));}
const v=(p:Point)=>new THREE.Vector3(...p);
// One OPEN RNA chain. Paired stems are parts of this same folded molecule.
const fallback:Point[]=[[-.16,2.1,0],[-.16,1.6,.05],[-.16,1.1,.12],[-.42,.72,.18],[-.9,.95,.25],[-1.35,.76,.3],[-1.48,.32,.25],[-1.1,.03,.18],[-.62,.24,.1],[-.2,.04,0],[-.2,-.85,-.15],[-.63,-1.36,-.1],[-.4,-1.86,.05],[0,-2,.1],[.4,-1.86,.05],[.63,-1.36,-.1],[.2,-.85,-.15],[.2,.04,0],[.62,.24,.1],[1.1,.03,.18],[1.48,.32,.25],[1.35,.76,.3],[.9,.95,.25],[.42,.72,.18],[.16,1.1,.12],[.16,1.6,.05],[.16,2.1,0],[.31,2.38,-.06]];
const materials=new Set<THREE.Material>();
function surface(colour:number,roughness=.28,metalness=.25){const m=new THREE.MeshPhysicalMaterial({color:colour,roughness,metalness,clearcoat:.5,clearcoatRoughness:.3});return m;}
function tube(points:THREE.Vector3[],radius:number,material:THREE.Material,segments=160){return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,false,'centripetal'),segments,radius,8,false),material);}
function link(a:THREE.Vector3,b:THREE.Vector3,r:number,material:THREE.Material){const d=b.clone().sub(a),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,d.length(),6),material);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return mesh;}
function molecule(data:Reference|null){
 const group=new THREE.Group(),pts=(data?.backbone||fallback).map(v),base=surface(0xafd4cb,.24,.34),gold=surface(0xd4c3a1,.29,.25),lavender=surface(0xb7a5c6,.3,.24);
 group.add(tube(pts,.055,base,320));
 const beadGeo=new THREE.SphereGeometry(.077,12,8),beads=new THREE.InstancedMesh(beadGeo,base,pts.length),matrix=new THREE.Matrix4();
 pts.forEach((p,i)=>{matrix.makeTranslation(p.x,p.y,p.z);beads.setMatrixAt(i,matrix);});group.add(beads);
 if(data){data.bases.forEach((p,i)=>{const a=pts[i],b=v(p);group.add(link(a,b,.019,i>=31&&i<=37?lavender:gold));const bead=new THREE.Mesh(new THREE.SphereGeometry(.046,8,6),i>=31&&i<=37?lavender:gold);bead.position.copy(b);group.add(bead);});}
 else{for(let i=0;i<3;i++)group.add(link(new THREE.Vector3(-.16,1.15+i*.32,.1),new THREE.Vector3(.16,1.15+i*.32,.1),.015,gold));for(let i=0;i<3;i++)group.add(link(new THREE.Vector3(-.2,-.1-i*.26,0),new THREE.Vector3(.2,-.1-i*.26,0),.015,gold));}
 const end=new THREE.Mesh(new THREE.SphereGeometry(.095,16,12),gold);end.position.copy(pts[pts.length-1]);group.add(end);
 return group;
}
function network(){
 const group=new THREE.Group(),nodes:THREE.Vector3[]=[],centres=[[-1.35,.55,.5],[.75,.95,-.75],[1.25,-.8,.8],[-.85,-1.0,-.4]];
 let seed=1709;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const nodeMaterial=[surface(0xa6cdc3),surface(0xb5a2c5),surface(0xd5c4a0),surface(0x8bb0bd)],lineMat=new THREE.LineBasicMaterial({color:0x9daab4,transparent:true,opacity:.22});
 centres.forEach(c=>{for(let i=0;i<12;i++)nodes.push(new THREE.Vector3(c[0]+(rand()-.5)*1.45,c[1]+(rand()-.5)*1.2,c[2]+(rand()-.5)*1.35));});
 const edges=new Set<string>();nodes.forEach((p,i)=>{const nearest=nodes.map((q,j)=>({j,d:p.distanceTo(q)})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,3);nearest.forEach(({j})=>edges.add([Math.min(i,j),Math.max(i,j)].join(':')));if(i%11===0)edges.add([i,(i+23)%nodes.length].sort((a,b)=>a-b).join(':'));});
 const positions:number[]=[];edges.forEach(edge=>{const [a,b]=edge.split(':').map(Number);positions.push(...nodes[a].toArray(),...nodes[b].toArray());});
 const lines=new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3)),lineMat);group.add(lines);
 const geo=new THREE.SphereGeometry(1,14,10);nodes.forEach((p,i)=>{const mesh=new THREE.Mesh(geo,nodeMaterial[Math.floor(i/12)]);mesh.position.copy(p);mesh.scale.setScalar(i%12===0?.14:.045+rand()*.04);group.add(mesh);});
 return group;
}
function label(text:string,colour='#bfc8c7',size=1){const c=document.createElement('canvas');c.width=768;c.height=100;const ctx=c.getContext('2d')!;ctx.font='500 40px Arial';ctx.fillStyle=colour;ctx.textAlign='center';ctx.fillText(text,384,66);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false}));sprite.scale.set(3.4*size,.44*size,1);return sprite;}
function ribosome(){
 const group=new THREE.Group(),dummy=new THREE.Object3D(),geo=new THREE.IcosahedronGeometry(1,1);
 function shell(count:number,rx:number,ry:number,rz:number,cy:number,colour:number){
  const mesh=new THREE.InstancedMesh(geo,surface(colour,.58,.1),count);
  for(let i=0;i<count;i++){const y=1-2*(i+.5)/count,phi=i*2.399963229728653,x=Math.cos(phi)*Math.sqrt(1-y*y),z=-Math.abs(Math.sin(phi)*Math.sqrt(1-y*y));const ripple=1+.06*Math.sin(i*1.43);dummy.position.set(x*rx*ripple,y*ry*ripple+cy,z*rz);dummy.scale.setScalar(.066+.024*(.5+.5*Math.sin(i*6.1)));dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);}
  group.add(mesh);
 }
 // Open front shell: a declared educational cutaway, not opaque cartoon blobs.
 shell(1150,1.95,1.28,1.08,1.15,0x728888);shell(620,1.9,.52,.8,-.72,0x877c91);
 return group;
}
function translation(){
 const group=new THREE.Group(),machine=new THREE.Group();machine.add(ribosome());group.add(machine);
 const chainMat=surface(0xd5bb8d,.3,.2),rnaMat=surface(0x88c9bb,.4,.2),ptcMat=surface(0xdd95b7,.3,.2),tMat=surface(0xafdacf,.25,.2);
 const codons=['AUG','GCU','CAG','UUC','GAC','UAA'];
 const mrna=tube([new THREE.Vector3(-4.7,-.25,.65),new THREE.Vector3(0,-.25,.65),new THREE.Vector3(4.7,-.25,.65)],.04,rnaMat,45);group.add(mrna);
 const codonLabels:THREE.Sprite[]=[];
 codons.forEach((c,i)=>{const x=(i-2.5)*1.45;for(let j=0;j<3;j++){const mesh=new THREE.Mesh(new THREE.SphereGeometry(.075,12,8),i===2?ptcMat:rnaMat);mesh.position.set(x+(j-1)*.19,-.25,.68);group.add(mesh);}const t=label(c,i===2?'#e3aec8':'#c4d5cf',.43);t.position.set(x,-1.65,1.1);group.add(t);codonLabels.push(t);});
 const d1=label('5′  —  mRNA  —  3′','#c4d5cf',.48);d1.position.set(0,-2.17,0);group.add(d1);
 const l1=label('LARGE SUBUNIT · CUTAWAY','#a5b4b5',.37);l1.position.set(0,2.76,0);machine.add(l1);
 const l2=label('SMALL SUBUNIT','#bdafca',.36);l2.position.set(0,-1.16,1);machine.add(l2);
 function adaptor(x:number,colour:THREE.Material){const a=new THREE.Group();const path=[[-.10,1.64,0],[-.18,1.26,0],[-.64,1.01,0],[-.68,.66,0],[-.31,.48,0],[-.13,.19,0],[-.1,-.13,0],[0,-.2,0],[.10,-.13,0],[.13,.19,0],[.31,.48,0],[.68,.66,0],[.64,1.01,0],[.18,1.26,0],[.1,1.64,0]] as Point[];a.add(tube(path.map(v),.026,colour,70));a.scale.set(.57,.8,.7);a.position.set(x,-.02,.94);return a;}
 const p=adaptor(-.55,tMat),a=adaptor(.6,tMat);machine.add(p,a);
 const charged=new THREE.Mesh(new THREE.SphereGeometry(.115,20,14),chainMat);charged.position.set(.6,1.38,.94);machine.add(charged);
 const release=new THREE.Group();[[.52,.05],[.72,.35],[.64,.69],[.55,.98]].forEach(([x,y],i)=>{const m=new THREE.Mesh(new THREE.IcosahedronGeometry(.2+i*.015,2),surface(0xc895ae,.4,.17));m.position.set(x,y,.92);release.add(m);});machine.add(release);
 const nascent=new THREE.Group();const peptideGeo=new THREE.SphereGeometry(.083,12,8);for(let i=0;i<22;i++){const bead=new THREE.Mesh(peptideGeo,chainMat);bead.position.set(-.55-i*.105,1.44+Math.sin(i*.56)*.11+i*.019,.92);nascent.add(bead);}machine.add(nascent);
 const site=label('P              A','#dccba9',.31);site.position.set(0,-.48,1.4);machine.add(site);
 let pose=0,targetX=-1.32;
 function set(n:number){pose=n;targetX=n===3?1.58:-1.32;release.visible=n===1;p.visible=n!==1;a.visible=n!==1;charged.visible=n!==1;nascent.children.forEach((c,i)=>c.visible=i<(n===3?22:9));nascent.position.y=n===1?.45:0;const old=codonLabels[2];group.remove(old);old.material.map?.dispose();old.material.dispose();const next=label(n===0?'CAG':'UAG','#e3aec8',.43);next.position.copy(old.position);group.add(next);codonLabels[2]=next;}
 set(0);
 return {group,set,tick:(t:number,animate:boolean)=>{machine.position.x=animate?THREE.MathUtils.lerp(machine.position.x,targetX,.10):targetX;charged.position.y=1.38+(animate&&pose===2?Math.sin(t*.7)*.035:0);}};
}
export async function mountScene(host:HTMLElement,kind:SceneKind,initialStep:number,onLost:()=>void):Promise<SceneHandle>{
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6));renderer.setClearColor(0x080b0e,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(kind==='translation'?33:32,1,.1,50);camera.position.set(0,0,kind==='translation'?15:12);
 scene.add(new THREE.HemisphereLight(0xe3ece7,0x18222c,2));const key=new THREE.DirectionalLight(0xf6e3c5,4);key.position.set(-3,5,6);scene.add(key);const rim=new THREE.DirectionalLight(0x9fcfe4,3);rim.position.set(4,1,-3);scene.add(rim);const fill=new THREE.DirectionalLight(0xd1a9cb,1.4);fill.position.set(-4,-2,3);scene.add(fill);
 const data=kind==='trna'?await reference():null;
 const mechanism=kind==='translation'?translation():null;
 const object=kind==='trna'?molecule(data):kind==='network'?network():mechanism!.group;scene.add(object);
 if(kind==='trna'){object.rotation.set(.1,-.25,-.23);object.scale.setScalar(.93);}
 if(kind==='network')object.rotation.set(.22,-.27,-.14);
 mechanism?.set(initialStep);
 host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 let stopped=false,animate=false,visible=true,frame=0,last=0,time=0,px=0,py=0;
 function render(now=0){frame=0;if(stopped||!visible||document.hidden)return;if(now-last>31||!animate){if(animate)time+=Math.min((now-last)/1000,.05);last=now;
  if(kind==='trna'){object.rotation.y=-.25+(animate?Math.sin(time*.25)*.3+px*.17:0);object.rotation.x=.1+(animate?py*.10:0);object.position.y=animate?Math.sin(time*.55)*.05:0;}
  if(kind==='network'){object.rotation.y=-.27+(animate?time*.052+px*.2:0);object.rotation.x=.22+(animate?Math.sin(time*.3)*.08+py*.12:0);object.rotation.z=-.14+(animate?Math.sin(time*.17)*.045:0);}
  mechanism?.tick(time,animate);renderer.render(scene,camera);
 }if(animate)frame=requestAnimationFrame(render);}
 function wake(){if(!stopped&&!frame&&visible&&!document.hidden){last=performance.now();render(last);}}
 function resize(){const r=host.getBoundingClientRect();if(r.width<2||r.height<2)return;renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.position.z=kind==='translation'?(camera.aspect<1.2?18:15):(camera.aspect<.8?14:12);camera.updateProjectionMatrix();renderer.render(scene,camera);wake();}
 const ro=new ResizeObserver(resize);ro.observe(host);
 const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'30px'});io.observe(host);
 const pointer=(e:PointerEvent)=>{if(e.pointerType==='touch'||!animate)return;const r=host.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;};host.addEventListener('pointermove',pointer,{passive:true});
 const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener('visibilitychange',visibility);
 const lost=(e:Event)=>{e.preventDefault();animate=false;cancelAnimationFrame(frame);frame=0;onLost();};renderer.domElement.addEventListener('webglcontextlost',lost);
 resize();
 return {reference:!!data,motion(on){animate=on;cancelAnimationFrame(frame);frame=0;wake();},step(n){mechanism?.set(n);renderer.render(scene,camera);wake();},dispose(){stopped=true;cancelAnimationFrame(frame);ro.disconnect();io.disconnect();host.removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',visibility);renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set<THREE.BufferGeometry>(),mats=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();scene.traverse(o=>{const mesh=o as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);const material=mesh.material;if(material)(Array.isArray(material)?material:[material]).forEach(m=>{mats.add(m);const map=(m as THREE.MeshBasicMaterial).map;if(map)textures.add(map);});});geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());mats.forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove();}};
}
