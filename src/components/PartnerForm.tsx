'use client';
import { useRef, useState } from 'react';

const TYPES = ['CRO / laboratory','Academic laboratory','Clinician / hospital','Patient organisation','Pharma / biotech','Incubator / grant programme','Investor','Media','General'];

export default function PartnerForm({ preset = 'General', investor = false }: { preset?: string; investor?: boolean }) {
  const [type, setType] = useState(investor ? 'Investor' : preset);
  const [state, setState] = useState<'idle'|'busy'|'done'|'error'>('idle');
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLFormElement>(null);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setState('busy'); setMessage('');
    const body = Object.fromEntries(new FormData(ref.current!).entries());
    try {
      const response = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...body, enquiryType:type }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delivery failed.');
      setState('done'); setMessage(investor ? 'Request received. Investor material is reviewed and shared manually.' : 'Message delivered successfully.');
    } catch (error) { setState('error'); setMessage(error instanceof Error ? error.message : 'Delivery failed.'); }
  }
  if (state === 'done') return <div className="success-card" role="status"><h3>Thank you</h3><p>{message}</p></div>;
  return <form ref={ref} onSubmit={submit} className="form-card">
    <div className="field"><label htmlFor="enquiryType">Enquiry type</label><select id="enquiryType" value={type} onChange={(e)=>setType(e.target.value)}>{TYPES.map((item)=><option key={item}>{item}</option>)}</select></div>
    <div className="two"><div className="field"><label htmlFor="partnerName">Name <span className="req">*</span></label><input id="partnerName" name="name" required /></div><div className="field"><label htmlFor="partnerEmail">Email <span className="req">*</span></label><input id="partnerEmail" name="email" type="email" required /></div></div>
    <div className="field"><label htmlFor="partnerOrg">Organisation</label><input id="partnerOrg" name="organization" /></div>
    {investor && <div className="two"><div className="field"><label htmlFor="stage">Typical investment stage</label><input id="stage" name="stage" placeholder="Pre-seed, seed…" /></div><div className="field"><label htmlFor="checkRange">Typical cheque range</label><input id="checkRange" name="checkRange" placeholder="Optional" /></div></div>}
    <div className="field"><label htmlFor="partnerMessage">Message <span className="req">*</span></label><textarea id="partnerMessage" name="message" required minLength={10} placeholder="Describe the collaboration, capability or request." /></div>
    <div className="field consent"><label><input type="checkbox" required name="consent" value="yes" /> I consent to Transloka Bio using these details to respond.</label></div>
    <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
    {state === 'error' && <p className="form-error" role="alert">{message}</p>}
    <button className="btn btn-solid" type="submit" disabled={state === 'busy'} data-analytics={investor ? 'Investor material request' : `Partner form: ${type}`} data-analytics-event="form_submit">{state === 'busy' ? 'Sending…' : investor ? 'Request investor material' : 'Send enquiry'}</button>
    {investor && <p className="form-note">The deck is not sent automatically. The founders review requests before sharing confidential material.</p>}
  </form>;
}
