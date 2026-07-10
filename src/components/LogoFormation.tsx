'use client';
import { useEffect, useRef } from 'react';
import points from '../../public/logo-points.json';

// tRNA sprites drift freely, then converge to sampled logo points as the
// user scrolls through the hero — assembling the KritRNA glyph out of tRNAs.
const SRCS = ['/trna/blue.png', '/trna/red.png', '/trna/green.png', '/trna/purple.png', '/trna/yellow.png'];

type P = { x: number; y: number };
type Node = {
  img: HTMLImageElement; size: number;
  fx: number; fy: number;         // free-drift home
  ph: number; sp: number; amp: number;
  tx: number; ty: number;         // target (logo) position, normalized
};

export default function LogoFormation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = points as P[];

    // logo bounds (normalized) → to map targets into a centred box
    const minX = Math.min(...pts.map((p) => p.x)), maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y)), maxY = Math.max(...pts.map((p) => p.y));

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    SRCS.forEach((s) => { const im = new Image(); im.src = s; im.onload = () => { loaded++; }; imgs.push(im); });

    const N = Math.min(pts.length, 90);
    for (let i = 0; i < N; i++) {
      nodes.push({
        img: imgs[i % imgs.length],
        size: 20 + Math.random() * 20,
        fx: Math.random(), fy: Math.random(),
        ph: Math.random() * Math.PI * 2, sp: 0.4 + Math.random() * 0.6, amp: 8 + Math.random() * 14,
        tx: pts[i].x, ty: pts[i].y,
      });
    }

    function resize() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // scroll progress across the hero (0 at top of hero → 1 when scrolled one viewport)
    function progress() {
      const rect = wrap.getBoundingClientRect();
      const p = -rect.top / (window.innerHeight * 0.8);
      return Math.max(0, Math.min(1, p));
    }

    // target box: centred, ~46% of the smaller dimension
    function target(n: Node) {
      const boxW = Math.min(W, H) * 0.5;
      const boxH = boxW * ((maxY - minY) / (maxX - minX));
      const ox = (W - boxW) / 2, oy = (H - boxH) / 2;
      const nx = (n.tx - minX) / (maxX - minX);
      const ny = (n.ty - minY) / (maxY - minY);
      return { x: ox + nx * boxW, y: oy + ny * boxH };
    }

    let t = 0, raf = 0;
    function frame() {
      t += 0.016;
      const prog = reduce ? 1 : progress();
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        const free = {
          x: n.fx * W + Math.cos(t * n.sp + n.ph) * n.amp,
          y: n.fy * H + Math.sin(t * n.sp + n.ph) * n.amp,
        };
        const tg = target(n);
        const e = prog * prog * (3 - 2 * prog); // smoothstep
        const x = free.x + (tg.x - free.x) * e;
        const y = free.y + (tg.y - free.y) * e;
        const s = n.size * (1 - e * 0.35);
        ctx.globalAlpha = 0.22 + e * 0.65;
        if (n.img.complete) ctx.drawImage(n.img, x - s / 2, y - s / 2, s, s * 1.12);
      }
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={ref} />
    </div>
  );
}
