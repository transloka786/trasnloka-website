'use client';
import { useCallback, useEffect, useState } from 'react';
import './website-dashboard.css';
type Count = { name: string; count: number };
type Summary = { days: number; pageViews: number; clicks: number; enquiries: number; subscriptions: number; activeSubscribers: number; pages: Count[]; sources: Count[]; buttons: Count[]; daily: { day: string; views: number; enquiries: number; subscriptions: number }[]; generatedAt: string };
function Breakdown({ title, rows }: { title: string; rows: Count[] }) {
  return <section className="report-panel"><h2>{title}</h2>{rows.length ? <table><thead><tr><th scope="col">Name</th><th scope="col">Count</th></tr></thead><tbody>{rows.map(row => <tr key={row.name}><th scope="row">{row.name}</th><td>{row.count.toLocaleString()}</td></tr>)}</tbody></table> : <p>No records in this period.</p>}</section>;
}
export default function WebsiteDashboard() {
  const [authenticated, setAuthenticated] = useState(false), [configured, setConfigured] = useState<boolean | null>(null);
  const [days, setDays] = useState(30), [data, setData] = useState<Summary | null>(null), [error, setError] = useState(''), [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setBusy(true); setError(''); setData(null);
    try {
      const response = await fetch(`/api/reporting/summary?days=${days}`, { cache: 'no-store' }); const body = await response.json();
      if (response.status === 401) setAuthenticated(false);
      if (!response.ok) throw new Error(body.error); setData(body);
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load reporting.'); }
    finally { setBusy(false); }
  }, [days]);
  useEffect(() => { fetch('/api/reporting/session', { cache: 'no-store' }).then(r => r.json()).then(s => { setConfigured(s.configured); setAuthenticated(s.authenticated); }).catch(() => setError('Could not check reporting access.')); }, []);
  useEffect(() => { if (authenticated) void load(); }, [authenticated, load]);
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError(''); const form = event.currentTarget; const fields = new FormData(form);
    try {
      const response = await fetch('/api/reporting/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fields.get('email'), password: fields.get('password') }) }); const body = await response.json();
      if (!response.ok) throw new Error(body.error); form.reset(); setAuthenticated(true);
    } catch (e) { setError(e instanceof Error ? e.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try { const response = await fetch('/api/reporting/session', { method: 'DELETE' }); if (!response.ok) throw new Error(); setData(null); setAuthenticated(false); }
    catch { setError('Sign-out failed. Please try again.'); } finally { setBusy(false); }
  }
  return <section className="page-hero"><div className="wrap report-wrap"><div className="eyebrow">KRITRNA · COMPANY ACCESS</div><h1 className="h1">Website reporting</h1><p className="lead">Understand reach, interest and the conversations that follow.</p>
    {error && <p role="alert" className="report-error">{error}</p>}
    {!authenticated && (configured === false ? <div className="report-panel"><h2>Reporting is not active yet</h2><p>The database and authorised team accounts need to be connected. No sample numbers are displayed.</p></div> : configured === null ? <p>Checking access…</p> : <form className="report-panel report-login" onSubmit={login}><h2>Team sign-in</h2><label htmlFor="report-email">Authorised email</label><input id="report-email" name="email" type="email" autoComplete="username" required/><label htmlFor="report-password">Password</label><input id="report-password" name="password" type="password" autoComplete="current-password" required/><button disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><p>Use the reporting account assigned by your administrator. Access expires after one hour.</p></form>)}
    {authenticated && <><div className="report-toolbar"><label>Period <select value={days} disabled={busy} onChange={e => setDays(Number(e.target.value))}><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select></label><button disabled={busy} onClick={load}>Refresh</button><button disabled={busy} onClick={logout}>Sign out</button></div>
    {busy && <p role="status">Loading reporting…</p>}
    {data && <><div className="report-cards">{[['Page views', data.pageViews], ['Selected clicks', data.clicks], ['Delivered enquiries', data.enquiries], ['New confirmed subscriptions', data.subscriptions]].map(([label, value]) => <div className="report-panel" key={label}><span>{label}</span><strong>{Number(value).toLocaleString()}</strong></div>)}</div>
    <p className="report-note">Page views and clicks include only opted-in visits. They are not unique people. Enquiries count accepted email deliveries, not qualified leads. Subscription counts require email confirmation. Operational totals include submissions regardless of analytics preference, and are not linked to browsing.</p>
    <section className="report-panel"><h2>Page views over time</h2><p>Reporting days use India time (Asia/Kolkata). Active newsletter subscribers: {data.activeSubscribers.toLocaleString()}.</p>
    <div className="report-chart" role="img" aria-label={`Daily page views over ${days} days. Exact values are available in the table below.`}>{data.daily.map(row => <div key={row.day} title={`${row.day}: ${row.views} views`} style={{ height: `${Math.max(1, row.views / Math.max(1, ...data.daily.map(r => r.views)) * 100)}%`, opacity: row.views ? 1 : .15 }} />)}</div>
    <details><summary>Daily values: views, enquiries and subscriptions</summary><div className="report-table-scroll"><table><thead><tr><th>Date</th><th>Views</th><th>Enquiries</th><th>Subscriptions</th></tr></thead><tbody>{data.daily.map(row => <tr key={row.day}><th scope="row">{row.day}</th><td>{row.views}</td><td>{row.enquiries}</td><td>{row.subscriptions}</td></tr>)}</tbody></table></div></details></section>
    <div className="report-grid"><Breakdown title="Public pages" rows={data.pages}/><Breakdown title="Referral sources" rows={data.sources}/><Breakdown title="Selected buttons" rows={data.buttons}/></div>
    <p className="report-note">Events are retained for 90 days. Daily operational counts are retained for 12 months. Updated {new Date(data.generatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST. Subscriber identities, messages and CVs are not exposed in this dashboard.</p></>}
    </>}
  </div></section>;
}
