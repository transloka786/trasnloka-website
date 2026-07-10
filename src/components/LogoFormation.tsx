'use client';
import { useEffect, useRef } from 'react';
import points from '../../public/logo-points.json';

// tRNA sprites drift on first paint, then automatically assemble into the
// KritRNA glyph. Scrolling can accelerate the formation, but is never required.
const SRCS = ['/trna/blue.png', '/trna/red.png', '/trna/green.png', '/trna/purple.png', '/trna/yellow.png'];
const AUTO_DELAY_MS = 250;
const AUTO_DURATION_MS = 2200;

type P = { x: number; y: number };
type Node = {
  img: HTMLImageElement; size: number;
  fx: number; fy: number;
  ph: number; sp: number; amp: number;
  tx: number; ty: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export default function LogoFormation() {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasElement: HTMLCanvasElement = canvas;
    const wrapElement: HTMLDivElement = wrap;
    const context: CanvasRenderingContext2D = ctx;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = points as P[];
    const minX = Math.min(...pts.map((p) => p.x));
    const maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxY = Math.max(...pts.map((p) => p.y));

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const imgs: HTMLImageElement[] = [];

    SRCS.forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      imgs.push(image);
    });

    const N = Math.min(pts.length, window.innerWidth < 640 ? 64 : 90);
    for (let i = 0; i < N; i++) {
      nodes.push({
        img: imgs[i % imgs.length],
        size: 20 + Math.random() * 20,
        fx: Math.random(),
        fy: Math.random(),
        ph: Math.random() * Math.PI * 2,
        sp: 0.4 + Math.random() * 0.6,
        amp: 8 + Math.random() * 14,
        tx: pts[i].x,
        ty: pts[i].y,
      });
    }

    function resize() {
      W = wrapElement.clientWidth;
      H = wrapElement.clientHeight;
      canvasElement.width = W * dpr;
      canvasElement.height = H * dpr;
      canvasElement.style.width = `${W}px`;
      canvasElement.style.height = `${H}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function target(node: Node) {
      const boxW = Math.min(W, H) * 0.5;
      const boxH = boxW * ((maxY - minY) / (maxX - minX));
      const ox = (W - boxW) / 2;
      const oy = (H - boxH) / 2;
      const nx = (node.tx - minX) / (maxX - minX);
      const ny = (node.ty - minY) / (maxY - minY);
      return { x: ox + nx * boxW, y: oy + ny * boxH };
    }

    function scrollProgress() {
      const rect = wrapElement.getBoundingClientRect();
      return clamp01(-rect.top / (window.innerHeight * 0.8));
    }

    resize();
    window.addEventListener('resize', resize);

    const startedAt = performance.now();
    let raf = 0;
    let t = 0;

    function frame(now: number) {
      t += 0.016;
      const automatic = clamp01((now - startedAt - AUTO_DELAY_MS) / AUTO_DURATION_MS);
      const prog = reduce ? 1 : Math.max(automatic, scrollProgress());
      const eased = prog * prog * (3 - 2 * prog);

      context.clearRect(0, 0, W, H);
      for (const node of nodes) {
        const free = {
          x: node.fx * W + Math.cos(t * node.sp + node.ph) * node.amp,
          y: node.fy * H + Math.sin(t * node.sp + node.ph) * node.amp,
        };
        const destination = target(node);
        const settledDrift = eased > 0.98 ? Math.sin(t * 0.7 + node.ph) * 1.25 : 0;
        const x = free.x + (destination.x - free.x) * eased + settledDrift;
        const y = free.y + (destination.y - free.y) * eased + settledDrift * 0.6;
        const size = node.size * (1 - eased * 0.35);

        context.globalAlpha = 0.22 + eased * 0.65;
        if (node.img.complete && node.img.naturalWidth > 0) {
          context.drawImage(node.img, x - size / 2, y - size / 2, size, size * 1.12);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={ref} />
    </div>
  );
}
