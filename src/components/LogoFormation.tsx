'use client';
import { useEffect, useRef } from 'react';
import points from '../../public/logo-points.json';

const SRCS = ['/trna/blue.png', '/trna/red.png', '/trna/green.png', '/trna/purple.png', '/trna/yellow.png'];
const AUTO_DELAY_MS = 220;
const AUTO_DURATION_MS = 2400;

type P = { x: number; y: number };
type Node = {
  img: HTMLImageElement;
  size: number;
  fx: number;
  fy: number;
  ph: number;
  sp: number;
  amp: number;
  tx: number;
  ty: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pts = points as P[];
    const minX = Math.min(...pts.map((point) => point.x));
    const maxX = Math.max(...pts.map((point) => point.x));
    const minY = Math.min(...pts.map((point) => point.y));
    const maxY = Math.max(...pts.map((point) => point.y));

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const images: HTMLImageElement[] = [];

    SRCS.forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      images.push(image);
    });

    const count = Math.min(pts.length, window.innerWidth < 640 ? 64 : 90);
    for (let i = 0; i < count; i += 1) {
      nodes.push({
        img: images[i % images.length],
        size: 20 + Math.random() * 20,
        fx: Math.random(),
        fy: Math.random(),
        ph: Math.random() * Math.PI * 2,
        sp: 0.38 + Math.random() * 0.72,
        amp: 9 + Math.random() * 16,
        tx: pts[i].x,
        ty: pts[i].y,
      });
    }

    function resize() {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function target(node: Node) {
      const boxWidth = Math.min(width, height) * 0.5;
      const boxHeight = boxWidth * ((maxY - minY) / (maxX - minX));
      const offsetX = (width - boxWidth) / 2;
      const offsetY = (height - boxHeight) / 2;
      const normalizedX = (node.tx - minX) / (maxX - minX);
      const normalizedY = (node.ty - minY) / (maxY - minY);
      return { x: offsetX + normalizedX * boxWidth, y: offsetY + normalizedY * boxHeight };
    }

    function scrollProgress() {
      return clamp01(window.scrollY / Math.max(window.innerHeight * 0.72, 1));
    }

    resize();
    window.addEventListener('resize', resize);

    let userHasScrolled = false;
    const markScrolled = () => { userHasScrolled = true; };
    window.addEventListener('scroll', markScrolled, { passive: true });

    const startedAt = performance.now();
    let animationFrame = 0;
    let previous = startedAt;
    let elapsed = 0;
    let progress = reduceMotion ? 1 : 0;

    function frame(now: number) {
      const deltaSeconds = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      elapsed += deltaSeconds;

      const automatic = clamp01((now - startedAt - AUTO_DELAY_MS) / AUTO_DURATION_MS);
      const desired = reduceMotion ? 1 : userHasScrolled ? scrollProgress() : automatic;
      const follow = 1 - Math.exp(-deltaSeconds * 5.5);
      progress += (desired - progress) * follow;
      const eased = smoothstep(clamp01(progress));

      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        const fluidX = Math.cos(elapsed * node.sp + node.ph) * node.amp
          + Math.sin(elapsed * 0.34 + node.ph * 1.7) * node.amp * 0.28;
        const fluidY = Math.sin(elapsed * node.sp * 0.92 + node.ph) * node.amp
          + Math.cos(elapsed * 0.29 + node.ph * 1.3) * node.amp * 0.24;
        const freeX = node.fx * width + fluidX;
        const freeY = node.fy * height + fluidY;
        const destination = target(node);
        const formedRipple = Math.sin(elapsed * 1.15 + node.ph) * 1.7 * eased;
        const x = freeX + (destination.x - freeX) * eased + formedRipple;
        const y = freeY + (destination.y - freeY) * eased + Math.cos(elapsed * 1.05 + node.ph) * 1.15 * eased;
        const size = node.size * (1 - eased * 0.35);

        ctx.globalAlpha = 0.22 + eased * 0.65;
        if (node.img.complete && node.img.naturalWidth > 0) {
          ctx.drawImage(node.img, x - size / 2, y - size / 2, size, size * 1.12);
        }
      }

      animationFrame = requestAnimationFrame(frame);
    }

    animationFrame = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', markScrolled);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={ref} />
    </div>
  );
}
