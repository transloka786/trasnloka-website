'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CLICK_LABELS, PUBLIC_PATHS, sourceBucket } from '@/lib/privacy';
import { currentPreference, PRIVACY_CHANGE, sendAnalytics } from '@/lib/analytics-client';
export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!PUBLIC_PATHS.has(pathname)) return;
    let counted = false;
    const pageView = () => {
      if (counted || !currentPreference()?.analytics) return;
      counted = true;
      sendAnalytics({ event: 'page_view', path: pathname, source: sourceBucket(document.referrer) });
    };
    pageView();
    window.addEventListener(PRIVACY_CHANGE, pageView);
    document.addEventListener('visibilitychange', pageView);
    return () => { window.removeEventListener(PRIVACY_CHANGE, pageView); document.removeEventListener('visibilitychange', pageView); };
  }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !PUBLIC_PATHS.has(window.location.pathname)) return;
      const label = event.target.closest<HTMLElement>('[data-analytics]')?.dataset.analytics;
      if (label && CLICK_LABELS.has(label)) sendAnalytics({ event: 'cta_click', label, path: window.location.pathname });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  return null;
}
