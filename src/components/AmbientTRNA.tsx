'use client';
import { motion, useReducedMotion } from 'framer-motion';

// Positions chosen to sit in the margins so they never fight the text.
const ITEMS = [
  { src: '/trna/blue.png', top: '14%', left: '4%', size: 74, dur: 28, delay: 0, drift: 26 },
  { src: '/trna/red.png', top: '62%', left: '2%', size: 62, dur: 34, delay: 2, drift: 20 },
  { src: '/trna/green.png', top: '30%', left: '92%', size: 80, dur: 30, delay: 1, drift: 30 },
  { src: '/trna/purple.png', top: '78%', left: '90%', size: 66, dur: 32, delay: 3, drift: 22 },
  { src: '/trna/yellow.png', top: '50%', left: '95%', size: 54, dur: 36, delay: 1.5, drift: 18 },
];

export default function AmbientTRNA() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {ITEMS.map((it, i) => (
        <motion.img
          key={i}
          src={it.src}
          alt=""
          style={{ position: 'absolute', top: it.top, left: it.left, width: it.size, opacity: 0.16, filter: 'saturate(.8)' }}
          animate={reduce ? undefined : { y: [0, -it.drift, 0], x: [0, it.drift / 2, 0], rotate: [0, 8, 0] }}
          transition={{ duration: it.dur, delay: it.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
