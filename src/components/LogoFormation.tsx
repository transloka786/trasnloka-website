'use client';

import { useEffect, useRef } from 'react';

const SRCS = [
  '/trna/blue.png',
  '/trna/red.png',
  '/trna/green.png',
  '/trna/purple.png',
  '/trna/yellow.png',
];

type Point = {
  x: number;
  y: number;
  angle: number;
};

type Node = {
  img: HTMLImageElement;
  size: number;
  fx: number;
  fy: number;
  phase: number;
  speed: number;
  amplitude: number;
  target: Point;
  delay: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const smoothstep = (value: number) => value * value * (3 - 2 * value);

function createRandom(seed = 9173) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function addLine(points: Point[], x1: number, y1: number, x2: number, y2: number, count: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  for (let index = 0; index < count; index += 1) {
    const amount = count === 1 ? 0 : index / (count - 1);
    points.push({
      x: lerp(x1, x2, amount),
      y: lerp(y1, y2, amount),
      angle,
    });
  }
}

function addArc(
  points: Point[],
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  start: number,
  end: number,
  count: number,
) {
  for (let index = 0; index < count; index += 1) {
    const amount = count === 1 ? 0 : index / (count - 1);
    const theta = lerp(start, end, amount);
    const dx = -rx * Math.sin(theta);
    const dy = ry * Math.cos(theta);
    points.push({
      x: cx + rx * Math.cos(theta),
      y: cy + ry * Math.sin(theta),
      angle: Math.atan2(dy, dx),
    });
  }
}

function buildTRNA(targetCount: number) {
  const points: Point[] = [];

  // Acceptor stem and amino-acid end.
  addLine(points, 0.47, 0.08, 0.47, 0.34, 30);
  addLine(points, 0.53, 0.08, 0.53, 0.34, 30);
  addArc(points, 0.5, 0.075, 0.03, 0.018, Math.PI, Math.PI * 2, 10);

  // D arm on the left.
  addLine(points, 0.47, 0.31, 0.37, 0.35, 15);
  addArc(points, 0.29, 0.37, 0.09, 0.085, -0.15, Math.PI * 1.9, 38);
  addLine(points, 0.37, 0.42, 0.47, 0.45, 15);

  // T arm on the right.
  addLine(points, 0.53, 0.31, 0.63, 0.35, 15);
  addArc(points, 0.71, 0.37, 0.09, 0.085, Math.PI * 1.15, Math.PI * 3.2, 38);
  addLine(points, 0.63, 0.42, 0.53, 0.45, 15);

  // Anticodon stem and loop.
  addLine(points, 0.47, 0.43, 0.44, 0.64, 25);
  addLine(points, 0.53, 0.43, 0.56, 0.64, 25);
  addArc(points, 0.5, 0.69, 0.065, 0.075, Math.PI * 0.05, Math.PI * 1.95, 34);

  // Variable arm, giving the cloverleaf its asymmetric tRNA identity.
  addLine(points, 0.54, 0.47, 0.63, 0.56, 15);
  addArc(points, 0.66, 0.59, 0.045, 0.04, Math.PI * 1.2, Math.PI * 3.1, 18);
  addLine(points, 0.62, 0.61, 0.53, 0.52, 15);

  // Central junction density makes the final silhouette read clearly.
  addArc(points, 0.5, 0.41, 0.065, 0.055, 0, Math.PI * 2, 24);

  if (points.length <= targetCount) return points;

  return Array.from({ length: targetCount }, (_, index) => {
    const sourceIndex = Math.floor((index / targetCount) * points.length);
    return points[sourceIndex];
  });
}

export default function LogoFormation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const mobile = window.innerWidth < 700;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2);
    const random = createRandom();
    const images = SRCS.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });
    const shape = buildTRNA(mobile ? 96 : 176);
    const nodes: Node[] = shape.map((target, index) => ({
      img: images[index % images.length],
      size: mobile ? 14 + random() * 8 : 16 + random() * 12,
      fx: random(),
      fy: random(),
      phase: random() * Math.PI * 2,
      speed: 0.22 + random() * 0.34,
      amplitude: mobile ? 5 + random() * 8 : 8 + random() * 14,
      target,
      delay: random() * 0.14,
    }));

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = true;
    let scrollProgress = reducedMotion ? 1 : 0;

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateScrollProgress = () => {
      if (reducedMotion) {
        scrollProgress = 1;
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const travel = Math.max(0, -rect.top);
      // Formation spans most of the hero scroll and completes before the hero exits.
      scrollProgress = clamp(travel / Math.max(1, rect.height * 0.78));
    };

    const drawFallback = (x: number, y: number, size: number, angle: number, alpha: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.globalAlpha = alpha;
      context.strokeStyle = 'rgba(107, 220, 255, 0.9)';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, -size * 0.42);
      context.lineTo(0, size * 0.42);
      context.moveTo(-size * 0.34, -size * 0.02);
      context.lineTo(size * 0.34, -size * 0.02);
      context.stroke();
      context.restore();
    };

    const draw = (now: number) => {
      animationFrame = 0;
      if (!visible) return;

      context.clearRect(0, 0, width, height);
      const masterProgress = smoothstep(scrollProgress);
      const shapeWidth = Math.min(width * (mobile ? 0.82 : 0.64), height * 0.76);
      const shapeHeight = shapeWidth * 1.08;
      const originX = width * (mobile ? 0.55 : 0.69) - shapeWidth / 2;
      const originY = height * 0.5 - shapeHeight / 2;

      nodes.forEach((node) => {
        const localProgress = smoothstep(clamp((masterProgress - node.delay) / (1 - node.delay)));
        const freeX = node.fx * width + Math.cos(now * 0.001 * node.speed + node.phase) * node.amplitude;
        const freeY = node.fy * height + Math.sin(now * 0.001 * node.speed + node.phase) * node.amplitude;
        const targetX = originX + node.target.x * shapeWidth;
        const targetY = originY + node.target.y * shapeHeight;
        const x = lerp(freeX, targetX, localProgress);
        const y = lerp(freeY, targetY, localProgress);
        const finalSize = node.size * 0.72;
        const size = lerp(node.size, finalSize, localProgress);
        const angle = lerp(node.phase * 0.35, node.target.angle + Math.PI / 2, localProgress);
        const alpha = 0.18 + localProgress * 0.78;

        if (node.img.complete && node.img.naturalWidth > 0) {
          context.save();
          context.translate(x, y);
          context.rotate(angle);
          context.globalAlpha = alpha;
          context.drawImage(node.img, -size / 2, -size * 0.58, size, size * 1.16);
          context.restore();
        } else {
          drawFallback(x, y, size, angle, alpha);
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (!animationFrame && visible) animationFrame = window.requestAnimationFrame(draw);
    };

    const onScroll = () => {
      updateScrollProgress();
      startAnimation();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startAnimation();
        else if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      },
      { rootMargin: '120px' },
    );

    resize();
    updateScrollProgress();
    observer.observe(wrap);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    startAnimation();

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
