'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    const body = JSON.stringify({ event: 'page_view', path: pathname, referrer: document.referrer ? new URL(document.referrer).hostname : '' });
    if (!navigator.sendBeacon?.('/api/analytics', new Blob([body], { type: 'application/json' }))) void fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
  }, [pathname]);
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-analytics]');
      if (!target) return;
      void fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: target.dataset.analyticsEvent || 'cta_click', label: target.dataset.analytics, path: window.location.pathname }), keepalive: true });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
  return null;
}
