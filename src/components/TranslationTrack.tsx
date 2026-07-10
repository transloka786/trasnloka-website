'use client';
import { motion } from 'framer-motion';

const CODONS = ['GCU', 'AAG', 'CUG', 'UUC', 'GGA', 'UAG', 'AUC', 'CAG', 'GAU', 'UUC'];
const STOP = 5;

export default function TranslationTrack({ readthrough = false }: { readthrough?: boolean }) {
  const stopFrac = STOP / CODONS.length;
  const end = readthrough ? 0.92 : stopFrac;
  return (
    <div style={{ marginTop: 22 }}>
      <div style={{ position: 'relative', height: 96, borderRadius: 6, background: 'rgba(244,234,213,.05)', border: '1px solid rgba(244,234,213,.14)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 2, background: 'rgba(244,234,213,.18)', transform: 'translateY(-50%)' }} />
        {CODONS.map((c, i) => {
          const isStop = i === STOP;
          return (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: `${(i + 0.5) / CODONS.length * 100}%`, transform: 'translate(-50%,-50%)',
              width: 34, height: 34, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: '.6rem',
              background: isStop ? 'rgba(233,30,99,.16)' : 'rgba(244,234,213,.08)',
              border: `1px solid ${isStop ? 'var(--magenta)' : 'rgba(244,234,213,.18)'}`,
              color: isStop ? '#ff6f9c' : 'rgba(244,234,213,.75)',
            }}>{c}</div>
          );
        })}
        {/* ribosome */}
        <motion.div
          initial={{ left: '0%' }}
          whileInView={{ left: `${end * 100}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: [0.5, 0, 0.2, 1], delay: readthrough ? 0.3 : 0 }}
          style={{ position: 'absolute', top: '50%', transform: 'translate(-50%,-50%)', width: 54, height: 54, borderRadius: '50%', border: '1.5px solid var(--cyan)', background: 'radial-gradient(circle at 40% 35%,rgba(0,164,207,.45),rgba(0,164,207,.06))', boxShadow: '0 0 22px rgba(0,164,207,.35)', zIndex: 3 }}
        />
        {/* protein bar */}
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${end * 100}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: [0.5, 0, 0.2, 1], delay: readthrough ? 0.3 : 0 }}
          style={{ position: 'absolute', top: 'calc(50% + 30px)', left: 0, height: 6, borderRadius: 3, background: readthrough ? 'linear-gradient(90deg,var(--forest),var(--magenta))' : 'linear-gradient(90deg,var(--forest),#4fd0a4)' }}
        />
      </div>
    </div>
  );
}
