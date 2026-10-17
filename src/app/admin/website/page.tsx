import type { Metadata } from 'next';
import WebsiteDashboard from '@/components/WebsiteDashboard';
export const metadata: Metadata = { title: 'Website reporting', robots: { index: false, follow: false } };
export default function ReportingPage() { return <WebsiteDashboard />; }
