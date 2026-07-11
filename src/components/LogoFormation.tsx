'use client';
import { useEffect, useRef } from 'react';
import points from '../../public/logo-points.json';

const SRCS = ['/trna/blue.png', '/trna/red.png', '/trna/green.png', '/trna/purple.png', '/trna/yellow.png'];
type P = { x: number; y: number };
type Node = { img: HTMLImageElement; size: number; fx: number; fy: number; ph: number; sp: number; amp: number; tx: number; ty: number };
const clamp = (value: number) => Math.max(0, Math.min(1, value));

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
    const mobile = window.innerWidth < 640;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = points as P[];
    const minX = Math.min(...pts.map((point) => point.x));
    const maxX = Math.max(...pts.map((point) => point.x));
    const minY = Math.min(...pts.map((point) => point.y));
    const maxY = Math.max(...pts.map((point) => point.y));
    let width = 0;
    let height = 0;
    let visible = true;
    let animationFrame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2);
    const images = SRCS.map((src) => { const image = new Image(); image.src = src; return image; });
    const nodes: Node[] = Array.from({ length: Math.min(pts.length, mobile ? 42 : 82) }, (_, index) => ({
      img: images[index % images.length], size: 20 + Math.random() * 20, fx: Math.random(), fy: Math.random(), ph: Math.random() * Math.PI * 2,
      sp: 0.38 + Math.random() * 0.72, amp: 9 + Math.random() * 16, tx: pts[index].x, ty: pts[index].y,
    }));

    function resize() {
      width = wrapElement.clientWidth;
      height = wrapElement.clientHeight;
      canvasElement.width = width * dpr;
      canvasElement.height = height * dpr;
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function target(node: Node) {
      const boxWidth = Math.min(width, height) * 0.5;
      const boxHeight = boxWidth * ((maxY - minY) / (maxX - minX));
      return { x: (width - boxWidth) / 2 + ((node.tx - minX) / (maxX - minX)) * boxWidth, y: (height - boxHeight) / 2 + ((node.ty - minY) / (maxY - minY)) * boxHeight };
    }
    resize();
    window.addEventListener('resize', resize);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !animationFrame) animationFrame = requestAnimationFrame(frame);
    }, { rootMargin: '150px' });
    observer.observe(wrapElement);
    const startedAt = performance.now();
    function frame(now: number) {
      animationFrame = 0;
      if (!visible) return;
      const progress = reduce ? 1 : clamp((now - startedAt - 260) / 2500);
      const eased = progress * progress * (3 - 2 * progress);
      context.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        const freeX = node.fx * width + Math.cos((now / 1000) * node.sp + node.ph) * node.amp;
        const freeY = node.fy * height + Math.sin((now / 1000) * node.sp + node.ph) * node.amp;
        const destination = target(node);
        const x = freeX + (destination.x - freeX) * eased;
        const y = freeY + (destination.y - freeY) * eased;
        const size = node.size * (1 - eased * 0.35);
        context.globalAlpha = 0.22 + eased * 0.65;
        if (node.img.complete && node.img.naturalWidth > 0) context.drawImage(node.img, x - size / 2, y - size / 2, size, size * 1.12);
      });
      animationFrame = requestAnimationFrame(frame);
    }
    animationFrame = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(animationFrame); observer.disconnect(); window.removeEventListener('resize', resize); };
  }, []);
  return <div ref={wrapRef} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}><canvas ref={ref} /></div>;
}
