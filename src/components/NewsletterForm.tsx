'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle'|'busy'|'done'|'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setState('busy'); setMessage('');
    try {
      const response = await fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, consent }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Subscription failed.');
      setState('done'); setMessage('If confirmation is needed, check your inbox. An existing confirmed subscription remains active.'); setEmail('');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Subscription failed.'); }
  }
  return <form className="newsletter-form" onSubmit={submit} aria-label="Subscribe to KritRNA updates"><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" /><button data-analytics="newsletter" className="btn btn-solid" disabled={state==='busy'}>{state==='busy'?'Joining…':'Subscribe'}</button></div><label style={{display:"block",marginTop:12,fontSize:".8rem"}}><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} style={{width:18,height:18,marginRight:8}}/>I want research and company updates from KritRNA / Transloka Bio.</label>{message && <p role="status" className={state==='error'?'form-error':'form-success'}>{message}</p>}<small>Confirm by email before joining. Unsubscribe using your email link or contact hello@hellokritrna.com. <a href="/privacy">Privacy &amp; data use</a>.</small></form>;
}
