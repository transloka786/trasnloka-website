'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Msg = { role: 'user' | 'assistant'; content: string };
const GREETING: Msg = { role: 'assistant', content: 'Hi — I can answer questions about KritRNA, suppressor tRNAs, and our platform. What would you like to know?' };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...msgs, { role: 'user', content: text } as Msg];
    setMsgs(next); setInput(''); setBusy(true);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const data = await r.json();
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply || data.error || 'Sorry, something went wrong.' }]);
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', content: 'Network error — please try again.' }]);
    } finally { setBusy(false); }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Ask KritRNA"
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 90, width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'var(--ink)', color: 'var(--cream)', boxShadow: '0 8px 30px rgba(13,13,13,.28)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >{open ? '×' : '✦'}</button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', bottom: 92, right: 24, zIndex: 90, width: 'min(380px, calc(100vw - 32px))', height: 'min(520px, 70vh)', background: 'var(--ink)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(13,13,13,.4)', border: '1px solid rgba(244,234,213,.14)' }}
          >
            <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(244,234,213,.14)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="/logo.png" alt="" style={{ height: 26, background: '#fff', borderRadius: 5, padding: 2 }} />
              <div><div style={{ fontFamily: 'var(--serif)', color: 'var(--cream)', fontSize: '.98rem' }}>Ask KritRNA</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'rgba(244,234,213,.45)' }}>Answers about our science</div></div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '84%', padding: '10px 13px', borderRadius: 10, fontSize: '.9rem', lineHeight: 1.5,
                  background: m.role === 'user' ? 'var(--cyan)' : 'rgba(244,234,213,.07)',
                  color: m.role === 'user' ? '#04222b' : 'rgba(244,234,213,.9)' }}>{m.content}</div>
              ))}
              {busy && <div style={{ alignSelf: 'flex-start', color: 'rgba(244,234,213,.5)', fontSize: '.85rem' }}>…</div>}
              <div ref={endRef} />
            </div>
            <div style={{ padding: 12, borderTop: '1px solid rgba(244,234,213,.14)', display: 'flex', gap: 8 }}>
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Type a question…"
                style={{ flex: 1, background: 'rgba(244,234,213,.06)', border: '1px solid rgba(244,234,213,.2)', borderRadius: 6, padding: '10px 12px', color: 'var(--cream)', fontSize: '.9rem' }}
              />
              <button onClick={send} disabled={busy} style={{ background: 'var(--cream)', color: 'var(--ink)', border: 'none', borderRadius: 6, padding: '0 15px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '.8rem' }}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
