'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABELS: Record<string, string> = {
  problem: 'Problem', science: 'Science', platform: 'Platform', 'small-world': 'Small-world engine', pipeline: 'Programs', india: 'India-first',
  about: 'About', team: 'Team', impact: 'Impact', updates: 'Updates', partners: 'Partners', investors: 'Investors', careers: 'Careers',
  contact: 'Contact', ask: 'Ask KritRNA', search: 'Search', faq: 'FAQ', privacy: 'Privacy', terms: 'Terms', disclaimer: 'Disclaimer',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (pathname === '/' || pathname.startsWith('/api/')) return null;
  const parts = pathname.split('/').filter(Boolean);
  const items = parts.map((part, index) => ({ label: LABELS[part] || part.replace(/-/g, ' '), href: `/${parts.slice(0, index + 1).join('/')}` }));
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hellokritrna.com/' },
      ...items.map((item, index) => ({ '@type': 'ListItem', position: index + 2, name: item.label, item: `https://www.hellokritrna.com${item.href}` })),
    ],
  };
  return <div className="breadcrumb-wrap">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className="wrap breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li>{items.map((item, index) => <li key={item.href} aria-current={index === items.length - 1 ? 'page' : undefined}>{index === items.length - 1 ? <span>{item.label}</span> : <Link href={item.href}>{item.label}</Link>}</li>)}</ol></nav>
  </div>;
}
