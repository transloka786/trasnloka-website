/** Brand sculpture, not an atomic coordinate model. No molecular predictions are shown. */
export function mountMolecule(canvas: HTMLCanvasElement, animate: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const context = ctx;
  let width = 0, height = 0, frame = 0, phase = 0, last = 0, visible = true;
  let pointerX = 0, pointerY = 0, destroyed = false;
  const points = [[-.12,-1.48],[.15,-1.48],[.15,-.56],[.48,-.5],[.69,-.86],[1.03,-.66],[1.05,-.28],[.72,-.07],[.29,-.12],[.28,.43],[.54,.82],[.38,1.15],[0,1.32],[-.38,1.15],[-.54,.82],[-.28,.43],[-.29,-.12],[-.72,-.07],[-1.05,-.28],[-1.03,-.66],[-.69,-.86],[-.48,-.5],[-.15,-.56],[-.12,-1.48]];
  const sample = (t: number) => {
    const n = points.length - 1, f = t * n, i = Math.min(n - 1, Math.floor(f)), u = f - i;
    const p0 = points[Math.max(0, i-1)], p1 = points[i], p2 = points[i+1], p3 = points[Math.min(n,i+2)];
    return [0,1].map(k => .5 * ((2*p1[k])+(-p0[k]+p2[k])*u+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*u*u+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*u*u*u));
  };
  const atoms: {x:number;y:number;z:number;r:number;h:number}[] = [];
  for (let i=0; i<300; i++) {
    const t=i/299, [x,y]=sample(t), [nx,ny]=sample(Math.min(1,t+.002)), tangent=Math.atan2(ny-y,nx-x);
    for (let strand=0; strand<2; strand++) {
      const twist=t*Math.PI*36+strand*Math.PI, spread=.068;
      atoms.push({x:x+Math.cos(tangent+Math.PI/2)*Math.cos(twist)*spread,y:y+Math.sin(tangent+Math.PI/2)*Math.cos(twist)*spread,z:Math.sin(twist)*.09+Math.sin(t*9)*.17,r:strand ? .028 : .041,h:t>.3&&t<.66?315:178});
    }
  }
  function draw() {
    if (destroyed || !width || !height) return;
    context.clearRect(0,0,width,height);
    const angle = -.32 + Math.sin(phase*.32)*.24 + pointerX*.18;
    const tilt = -.22 + pointerY*.09;
    const scale = Math.min(width*.32,height*.3);
    const projected = atoms.map(a => {
      const rx=a.x*Math.cos(angle)+a.z*Math.sin(angle), z=-a.x*Math.sin(angle)+a.z*Math.cos(angle);
      const xx=rx*Math.cos(tilt)-a.y*Math.sin(tilt), yy=rx*Math.sin(tilt)+a.y*Math.cos(tilt);
      const perspective=3.8/(3.8-z);
      return {x:width*.5+xx*scale*perspective,y:height*.5+yy*scale*perspective+Math.sin(phase*.6)*5,z,r:Math.max(1.8,a.r*scale*perspective),h:a.h};
    });
    context.lineWidth=.7;
    for(let i=2;i<projected.length;i++) {
      const p=projected[i], q=projected[i-2];
      context.strokeStyle=`hsla(${p.h},55%,78%,.24)`;
      context.beginPath();context.moveTo(q.x,q.y);context.lineTo(p.x,p.y);context.stroke();
      if(i%8===0){const b=projected[i+1];if(b){context.strokeStyle='rgba(216,240,227,.24)';context.beginPath();context.moveTo(p.x,p.y);context.lineTo(b.x,b.y);context.stroke();}}
    }
    projected.sort((a,b)=>a.z-b.z).forEach(p=>{
      const light = context.createRadialGradient(p.x-p.r*.34,p.y-p.r*.4,p.r*.06,p.x,p.y,p.r);
      light.addColorStop(0,`hsl(${p.h},35%,95%)`);light.addColorStop(.36,`hsl(${p.h},48%,72%)`);light.addColorStop(1,`hsl(${p.h},48%,${p.z<0?24:34}%)`);
      context.fillStyle=light;context.beginPath();context.arc(p.x,p.y,p.r,0,Math.PI*2);context.fill();
    });
  }
  function tick(now:number){frame=0;if(!animate||!visible||document.hidden||destroyed)return;if(now-last>=32){phase+=.025;last=now;draw();}frame=requestAnimationFrame(tick);}
  function start(){if(animate&&visible&&!document.hidden&&!frame&&!destroyed)frame=requestAnimationFrame(tick);}
  function resize(){const box=canvas.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(window.devicePixelRatio||1,1.6);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);context.setTransform(dpr,0,0,dpr,0,0);draw();start();}
  function pointer(e:PointerEvent){if(!animate||e.pointerType==='touch')return;const r=canvas.getBoundingClientRect();pointerX=(e.clientX-r.left)/Math.max(r.width,1)-.5;pointerY=(e.clientY-r.top)/Math.max(r.height,1)-.5;}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'});intersection.observe(canvas);
  canvas.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('visibilitychange',visibility);resize();
  return ()=>{destroyed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();canvas.removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',visibility);};
}
