'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { blockAnalyticsImmediately, currentPreference, PRIVACY_CHANGE, PRIVACY_OPEN } from '@/lib/analytics-client';
export function PrivacySettingsButton() {
  return <button type="button" className="privacy-link" onClick={() => window.dispatchEvent(new Event(PRIVACY_OPEN))}>Privacy settings</button>;
}
export default function PrivacyControls() {
  const [visible, setVisible] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState(''), [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null), opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    setVisible(!currentPreference());
    const open = () => { opener.current = document.activeElement as HTMLElement; setAnalytics(currentPreference()?.analytics ?? false); setError(''); dialog.current?.showModal(); };
    const sync = () => setVisible(!currentPreference());
    window.addEventListener(PRIVACY_OPEN, open); document.addEventListener('visibilitychange', sync);
    return () => { window.removeEventListener(PRIVACY_OPEN, open); document.removeEventListener('visibilitychange', sync); };
  }, []);
  function close() { dialog.current?.close(); opener.current?.focus(); }
  async function choose(allow: boolean) {
    setBusy(true); setError('');
    // Refusal takes effect immediately even if the network is unavailable.
    blockAnalyticsImmediately();
    try {
      const response = await fetch('/api/privacy/preferences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ analytics: allow }) });
      if (!response.ok) throw new Error('Could not save permission. Analytics is off. Please try again.');
      if (allow && !currentPreference()?.analytics) throw new Error('Your browser did not save the preference. Analytics remains off.');
      window.dispatchEvent(new Event(PRIVACY_CHANGE)); setVisible(false); close();
    } catch (e) {
      if (!allow) { setVisible(false); close(); }
      else setError(e instanceof Error ? e.message : 'Analytics remains off.');
    } finally { setBusy(false); }
  }
  return <>
    {visible && <section className="privacy-banner" aria-label="Website privacy choices">
      <strong>Your visit. Your choice.</strong><p>With your permission, we count page views and selected clicks to improve KritRNA. We do not use advertising trackers. Essential site functions remain available either way. <Link href="/privacy">Privacy &amp; data use</Link></p>
      <div className="privacy-actions"><button type="button" disabled={busy} onClick={() => choose(false)}>Reject optional</button><button type="button" disabled={busy} onClick={() => choose(true)}>Accept analytics</button><button type="button" disabled={busy} onClick={() => window.dispatchEvent(new Event(PRIVACY_OPEN))}>Settings</button></div>
      {error && <p role="alert">{error}</p>}
    </section>}
    <dialog ref={dialog} className="privacy-dialog" aria-labelledby="privacy-title" onClose={() => opener.current?.focus()}>
      <div className="privacy-dialog-head"><h2 id="privacy-title">Privacy settings</h2><button type="button" aria-label="Close privacy settings" onClick={close}>×</button></div>
      <p>Choose whether to help us understand how the public website is used.</p>
      <div className="privacy-option"><strong>Essential functions</strong><span>Always available</span><p>Security, requested forms, motion settings and remembering this choice. These do not depend on analytics permission.</p></div>
      <div className="privacy-option"><label><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} /> <strong>Optional analytics</strong></label><p>Public page views, broad referral sources and selected button clicks. No advertising, visitor profiles, form contents or medical information. We remember your choice for 180 days.</p></div>
      <p><Link href="/privacy">Read the data policy</Link>. Change your choice here at any time. Withdrawal stops future optional analytics; it does not erase previously collected records.</p>
      {error && <p role="alert">{error}</p>}
      <div className="privacy-actions"><button type="button" disabled={busy} onClick={() => choose(false)}>Reject optional</button><button type="button" disabled={busy} onClick={() => choose(analytics)}>{busy ? 'Saving…' : 'Save settings'}</button></div>
    </dialog>
  </>;
}
