import type { Metadata } from 'next';
import { Fraunces, Geist, JetBrains_Mono, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import AmbientTRNA from '@/components/AmbientTRNA';
import Breadcrumbs from '@/components/Breadcrumbs';
import Analytics from '@/components/Analytics';
import { SITE, TEAM } from '@/lib/content';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari'], variable: '--font-devanagari', weight: ['400', '600'], display: 'swap' });

const description = 'KritRNA is developing AI-guided suppressor-tRNA designs for selected premature-stop contexts in HBB, DMD and CFTR. Research-stage and India-first, by Transloka Bio Pvt. Ltd.';
const og = `/api/og?title=${encodeURIComponent('KritRNA — Engineering the Language of Life')}&subtitle=${encodeURIComponent(description)}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'KritRNA — Suppressor tRNA Therapeutics for Rare Genetic Diseases', template: '%s — KritRNA' },
  description,
  keywords: ['suppressor tRNA', 'tRNA therapeutics', 'nonsense mutation', 'premature stop codon', 'rare disease India', 'HBB', 'DMD', 'CFTR'],
  authors: [{ name: SITE.legal }],
  icons: { icon: '/favicon.png' },
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE.url, siteName: 'KritRNA',
    title: 'KritRNA — Engineering the Language of Life', description,
    images: [{ url: og, width: 1200, height: 630, alt: 'KritRNA social preview' }],
  },
  twitter: { card: 'summary_large_image', title: 'KritRNA — Engineering the Language of Life', description, images: [og] },
  robots: { index: true, follow: true },
};

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: `KritRNA — ${SITE.legal}`,
      legalName: SITE.legal, url: SITE.url, logo: `${SITE.url}/logo.png`, email: SITE.email,
      address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
    },
    {
      '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: 'KritRNA',
      publisher: { '@id': `${SITE.url}/#organization` },
      potentialAction: { '@type': 'SearchAction', target: `${SITE.url}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
    },
    { '@type': 'Person', name: TEAM.lead.name, jobTitle: TEAM.lead.role, worksFor: { '@id': `${SITE.url}/#organization` }, url: `${SITE.url}/team` },
    { '@type': 'Person', name: TEAM.outreach.name, jobTitle: TEAM.outreach.role, worksFor: { '@id': `${SITE.url}/#organization` }, url: `${SITE.url}/team` },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = `${fraunces.variable} ${geist.variable} ${jetbrains.variable} ${devanagari.variable}`;
  return (
    <html lang="en" className={fonts}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} /></head>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <AmbientTRNA />
        <Nav />
        <Breadcrumbs />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <Chatbot />
        <Analytics />
      </body>
    </html>
  );
}
