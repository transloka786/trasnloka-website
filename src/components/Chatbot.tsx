'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Source = { id: string; title: string; href: string };
type Msg = { role: 'user' | 'assistant'; content: string; sources?: Source[] };

const GREETING: Msg = {
  role: 'assistant',
  content: 'Ask about KritRNA’s science, platform, programmes, team, careers or partnerships. I use approved public information only.',
};

const SUGGESTIONS = [
  'How does a suppressor tRNA work?',
  'What is the dual-engine platform?',
  'Which diseases is KritRNA studying?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      const messages = messagesRef.current;
      if (messages) messages.scrollTop = messages.scrollHeight;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [msgs, open, busy, notice]);

  async function send(prefilled?: string) {
    const text = (prefilled ?? input).trim();
    if (!text || busy) return;

    const next = [...msgs, { role: 'user', content: text } as Msg];
    setMsgs(next);
    setInput('');
    setNotice('');
    setBusy(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          messages: next.slice(-6).map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      setMsgs((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.reply || 'No answer was available.',
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Network error';
      setNotice(`${message}. You can also email hello@hellokritrna.com.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="trna-chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close Ask KritRNA' : 'Open Ask KritRNA'}
        aria-expanded={open}
        aria-controls="ask-kritrna-window"
        style={{ zIndex: 2147483001, pointerEvents: 'auto', touchAction: 'manipulation' }}
      >
        <img src="/trna/blue.png" alt="" width="58" height="66" draggable="false" />
        <span>{open ? 'Close' : 'Ask me anything'}</span>
      </button>

      {open ? (
        <aside
          id="ask-kritrna-window"
          className="chat-window"
          role="dialog"
          aria-modal="false"
          aria-label="Ask KritRNA assistant"
          style={{ zIndex: 2147483000, pointerEvents: 'auto', isolation: 'isolate' }}
        >
          <header>
            <div>
              <strong>Ask KritRNA</strong>
              <small>Grounded public-information assistant</small>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <button
                type="button"
                onClick={() => {
                  setMsgs([GREETING]);
                  setInput('');
                  setNotice('');
                }}
              >
                Reset
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
                Close
              </button>
            </div>
          </header>

          <div className="chat-safety">
            No medical advice. Do not submit medical records, genetic reports or proprietary sequences.
          </div>

          <div ref={messagesRef} className="chat-messages" aria-live="polite">
            {msgs.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}>
                <p>{message.content}</p>
                {message.sources?.length ? (
                  <div className="chat-sources">
                    {message.sources.map((source) => (
                      <a key={source.id} href={source.href}>
                        {source.title} ↗
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {msgs.length === 1 ? (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button type="button" key={suggestion} onClick={() => void send(suggestion)}>
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}

            {busy ? <p className="chat-loading">Checking approved sources…</p> : null}
            {notice ? <p role="alert" className="form-error">{notice}</p> : null}
          </div>

          <div className="chat-compose">
            <textarea
              aria-label="Question for Ask KritRNA"
              value={input}
              maxLength={900}
              rows={2}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void send();
                }
              }}
            />
            <button type="button" onClick={() => void send()} disabled={busy || !input.trim()}>
              →
            </button>
            <Link href="/ask">Open full assistant</Link>
          </div>
        </aside>
      ) : null}
    </>
  );
}
