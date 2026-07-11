'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle'|'busy'|'done'|'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setState('busy'); setMessage('');
    try {
      const response = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Subscription failed.');
      setState('done'); setMessage('Check your inbox to confirm your subscription.'); setEmail('');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Subscription failed.'); }
  }
  return <form className="newsletter-form" onSubmit={submit} aria-label="Subscribe to KritRNA updates"><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" /><button className="btn btn-solid" disabled={state==='busy'}>{state==='busy'?'Joining…':'Subscribe'}</button></div>{message && <p role="status" className={state==='error'?'form-error':'form-success'}>{message}</p>}<small>Research and company updates only. Unsubscribe at any time.</small></form>;
}
