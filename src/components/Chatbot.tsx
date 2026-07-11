'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Source = { id: string; title: string; href: string };
type Msg = { role: 'user' | 'assistant'; content: string; sources?: Source[] };

const GREETING: Msg = {
  role: 'assistant',
  content: 'Ask me about KritRNA’s science, platform, research programs, team, careers or partnership pathways. I use approved public information only.',
};

const SUGGESTIONS = [
  'How does a suppressor tRNA work?',
  'What is the dual-engine platform?',
  'Which diseases is KritRNA studying?',
  'How can a CRO or investor contact KritRNA?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open, busy]);

  async function send(prefilled?: string) {
    const text = (prefilled ?? input).trim();
    if (!text || busy) return;
    if (text.length > 900) {
      setNotice('Please keep the question under 900 characters.');
      return;
    }

    const next = [...msgs, { role: 'user', content: text } as Msg];
    setMsgs(next);
    setInput('');
    setNotice(null);
    setBusy(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await response.json();
      if (!response.ok && !data.reply) {
        setNotice(data.error || 'The assistant could not answer that request.');
        return;
      }
      setMsgs((current) => [...current, {
        role: 'assistant',
        content: data.reply || data.error || 'The assistant could not answer that request.',
        sources: Array.isArray(data.sources) ? data.sources : [],
      }]);
    } catch {
      setNotice('Network error. Please try again or email hello@hellokritrna.com.');
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMsgs([GREETING]);
    setInput('');
    setNotice(null);
  }

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close Ask KritRNA' : 'Open Ask KritRNA'}
        aria-expanded={open}
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 90, width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'var(--ink)', color: 'var(--cream)', boxShadow: '0 8px 30px rgba(13,13,13,.28)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {open ? '×' : '✦'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label="Ask KritRNA assistant"
            style={{ position: 'fixed', bottom: 92, right: 24, zIndex: 90, width: 'min(410px, calc(100vw - 32px))', height: 'min(610px, 76vh)', background: 'var(--ink)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(13,13,13,.4)', border: '1px solid rgba(244,234,213,.14)' }}
          >
            <header style={{ padding: '15px 17px', borderBottom: '1px solid rgba(244,234,213,.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/logo.png" alt="" style={{ height: 27, background: '#fff', borderRadius: 5, padding: 2 }} />
                <div>
                  <div style={{ fontFamily: 'var(--serif)', color: 'var(--cream)', fontSize: '1rem' }}>Ask KritRNA</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'rgba(244,234,213,.48)', textTransform: 'uppercase', letterSpacing: '.05em' }}>Grounded public-information assistant</div>
                </div>
              </div>
              <button onClick={reset} aria-label="Reset conversation" style={{ border: '1px solid rgba(244,234,213,.16)', background: 'transparent', color: 'rgba(244,234,213,.62)', borderRadius: 5, padding: '5px 8px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '.62rem' }}>Reset</button>
            </header>

            <div style={{ padding: '9px 16px', background: 'rgba(0,164,207,.08)', borderBottom: '1px solid rgba(244,234,213,.1)', color: 'rgba(244,234,213,.65)', fontSize: '.71rem', lineHeight: 1.45 }}>
              No medical advice. Do not submit medical records, genetic reports, confidential information or proprietary sequences.
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {msgs.map((message, index) => (
                <div key={`${message.role}-${index}`} style={{ alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
                  <div style={{ padding: '10px 13px', borderRadius: 10, fontSize: '.89rem', lineHeight: 1.55, whiteSpace: 'pre-wrap', background: message.role === 'user' ? 'var(--cyan)' : 'rgba(244,234,213,.07)', color: message.role === 'user' ? '#04222b' : 'rgba(244,234,213,.92)' }}>
                    {message.content}
                  </div>
                  {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                    <div style={{ marginTop: 7, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {message.sources.map((source) => (
                        <a key={source.id} href={source.href} target={source.href.startsWith('http') ? '_blank' : undefined} rel={source.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'var(--cyan)', border: '1px solid rgba(0,164,207,.28)', borderRadius: 20, padding: '4px 7px' }}>
                          {source.title} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {msgs.length === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {SUGGESTIONS.map((suggestion) => (
                    <button key={suggestion} onClick={() => send(suggestion)} disabled={busy} style={{ textAlign: 'left', border: '1px solid rgba(244,234,213,.14)', background: 'rgba(244,234,213,.035)', color: 'rgba(244,234,213,.72)', borderRadius: 7, padding: '9px 11px', cursor: 'pointer', fontSize: '.78rem' }}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {busy && <div style={{ alignSelf: 'flex-start', color: 'rgba(244,234,213,.5)', fontSize: '.82rem', fontFamily: 'var(--mono)' }}>Checking approved sources…</div>}
              {notice && <div role="alert" style={{ alignSelf: 'stretch', color: '#ffc4d7', background: 'rgba(233,30,99,.1)', border: '1px solid rgba(233,30,99,.22)', borderRadius: 7, padding: '9px 11px', fontSize: '.76rem' }}>{notice}</div>}
              <div ref={endRef} />
            </div>

            <div style={{ padding: 12, borderTop: '1px solid rgba(244,234,213,.14)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 900))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      void send();
                    }
                  }}
                  placeholder="Ask a question about KritRNA…"
                  rows={2}
                  disabled={busy}
                  aria-label="Question for Ask KritRNA"
                  style={{ flex: 1, resize: 'none', background: 'rgba(244,234,213,.06)', border: '1px solid rgba(244,234,213,.2)', borderRadius: 6, padding: '9px 11px', color: 'var(--cream)', fontSize: '.86rem', fontFamily: 'var(--sans)' }}
                />
                <button onClick={() => void send()} disabled={busy || !input.trim()} aria-label="Send question" style={{ background: 'var(--cream)', color: 'var(--ink)', border: 'none', borderRadius: 6, padding: '0 15px', cursor: busy || !input.trim() ? 'not-allowed' : 'pointer', opacity: busy || !input.trim() ? 0.5 : 1, fontFamily: 'var(--mono)', fontSize: '.8rem' }}>→</button>
              </div>
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', gap: 8, fontFamily: 'var(--mono)', fontSize: '.57rem', color: 'rgba(244,234,213,.35)' }}>
                <span>Enter to send · Shift+Enter for a new line</span><span>{input.length}/900</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
