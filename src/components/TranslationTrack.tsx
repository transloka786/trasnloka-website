'use client';

import { motion } from 'framer-motion';

const CODONS = ['GCU', 'AAG', 'CUG', 'UUC', 'GGA', 'UAG', 'AUC', 'CAG', 'GAU', 'UUC'];
const STOP = 5;

function RibosomeGlyph() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        style={{
          position: 'absolute',
          left: 3,
          bottom: 3,
          width: 58,
          height: 40,
          borderRadius: '52% 48% 46% 54% / 58% 54% 46% 42%',
          border: '1.5px solid var(--cyan)',
          background: 'radial-gradient(circle at 38% 30%, rgba(0,164,207,.52), rgba(0,164,207,.10) 68%, rgba(0,164,207,.03))',
          boxShadow: '0 0 22px rgba(0,164,207,.32)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 29,
          top: 3,
          width: 39,
          height: 30,
          borderRadius: '54% 46% 52% 48% / 58% 54% 46% 42%',
          border: '1.5px solid var(--cyan)',
          background: 'radial-gradient(circle at 40% 32%, rgba(107,220,255,.62), rgba(0,164,207,.13) 70%, rgba(0,164,207,.04))',
          boxShadow: '0 0 16px rgba(107,220,255,.28)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 19,
          top: 31,
          width: 40,
          height: 2,
          borderRadius: 2,
          background: 'rgba(244,234,213,.72)',
          boxShadow: '0 0 7px rgba(244,234,213,.22)',
        }}
      />
    </div>
  );
}

export default function TranslationTrack({ readthrough = false }: { readthrough?: boolean }) {
  const stopFrac = STOP / CODONS.length;
  const end = readthrough ? 0.92 : stopFrac;

  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          position: 'relative',
          height: 104,
          borderRadius: 6,
          background: 'rgba(244,234,213,.05)',
          border: '1px solid rgba(244,234,213,.14)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: 2,
            background: 'rgba(244,234,213,.18)',
            transform: 'translateY(-50%)',
          }}
        />
        {CODONS.map((codon, index) => {
          const isStop = index === STOP;
          return (
            <div
              key={codon + index}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${((index + 0.5) / CODONS.length) * 100}%`,
                transform: 'translate(-50%,-50%)',
                width: 34,
                height: 34,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--mono)',
                fontSize: '.6rem',
                background: isStop ? 'rgba(233,30,99,.16)' : 'rgba(244,234,213,.08)',
                border: `1px solid ${isStop ? 'var(--magenta)' : 'rgba(244,234,213,.18)'}`,
                color: isStop ? '#ff6f9c' : 'rgba(244,234,213,.75)',
              }}
            >
              {codon}
            </div>
          );
        })}

        <motion.div
          initial={{ left: '0%' }}
          whileInView={{ left: `${end * 100}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: [0.5, 0, 0.2, 1], delay: readthrough ? 0.3 : 0 }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 72,
            height: 62,
            zIndex: 3,
          }}
        >
          <RibosomeGlyph />
        </motion.div>

        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${end * 100}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2.4, ease: [0.5, 0, 0.2, 1], delay: readthrough ? 0.3 : 0 }}
          style={{
            position: 'absolute',
            top: 'calc(50% + 34px)',
            left: 0,
            height: 6,
            borderRadius: 3,
            background: readthrough
              ? 'linear-gradient(90deg,var(--forest),var(--magenta))'
              : 'linear-gradient(90deg,var(--forest),#4fd0a4)',
          }}
        />
      </div>
    </div>
  );
}
