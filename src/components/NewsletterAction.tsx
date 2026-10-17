'use client';
import { useEffect, useRef, useState } from 'react';
export default function NewsletterAction({ action }: { action: 'confirm' | 'unsubscribe' }) {
  const token=useRef(''), loaded=useRef(false); const [ready,setReady]=useState(false),[busy,setBusy]=useState(false),[done,setDone]=useState(false),[error,setError]=useState('');
  useEffect(()=>{
    if(loaded.current)return;loaded.current=true;
    token.current=new URLSearchParams(location.hash.slice(1)).get('token')||'';
    // Token fragments are not sent to the web server; remove them from the
    // address bar and history before any subsequent navigation.
    history.replaceState(history.state,'',location.pathname);
    setReady(/^[a-f0-9]{64}$/.test(token.current));
  },[]);
  async function submit(){
    setBusy(true);setError('');
    try { const res=await fetch(`/api/newsletter/${action}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:token.current})});const body=await res.json();if(!res.ok)throw new Error(body.error);setDone(true);token.current=''; }
    catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}
  }
  return <section className="page-hero"><div className="wrap" style={{maxWidth:760}}><div className="eyebrow">KRITRNA UPDATES</div><h1 className="h1">{done?(action==='confirm'?'Subscription confirmed.':'You are unsubscribed.'):(action==='confirm'?'Confirm your subscription':'Unsubscribe from updates')}</h1>
    <p className="lead" style={{margin:'24px 0'}}>{done?(action==='confirm'?'You have joined our company and research update list.':'Your email has been removed from the active update list.'):(action==='confirm'?'Confirm that you want to receive company and research updates from Transloka Bio / KritRNA.':'Confirm that you want to stop receiving KritRNA company and research updates.')}</p>
    {!done && (ready?<button className="btn" disabled={busy} onClick={submit}>{busy?'Saving…':action==='confirm'?'Confirm subscription':'Unsubscribe'}</button>:<p>Open the link in your email. For help, contact <a href="mailto:hello@hellokritrna.com">hello@hellokritrna.com</a>.</p>)}
    {error&&<p role="alert" style={{marginTop:20}}>{error}</p>}<p style={{marginTop:24}}><a href="/privacy">Privacy &amp; data use</a></p>
  </div></section>;
}
