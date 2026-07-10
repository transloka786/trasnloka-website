import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import AmbientTRNA from '@/components/AmbientTRNA';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'KritRNA — Suppressor tRNA Therapeutics for Rare Genetic Diseases',
    template: '%s — KritRNA',
  },
  description:
    'KritRNA is developing AI-guided suppressor-tRNA designs for selected premature-stop contexts in HBB, DMD and CFTR. Research-stage and India-first, by Transloka Bio Pvt. Ltd.',
  keywords: [
    'suppressor tRNA', 'tRNA therapeutics', 'nonsense mutation therapy',
    'premature stop codon readthrough', 'rare disease India', 'Duchenne muscular dystrophy',
    'cystic fibrosis', 'HBB', 'DMD', 'CFTR', 'RNA therapeutics', 'Transloka Bio', 'KritRNA',
  ],
  authors: [{ name: 'Transloka Bio Pvt. Ltd.' }],
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE.url, siteName: 'KritRNA',
    title: 'KritRNA — Suppressor tRNA Therapeutics for Rare Genetic Diseases',
    description: 'Reading through silence, restoring the protein. Research-stage suppressor-tRNA design, India-first.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'KritRNA' }],
  },
  twitter: {
    card: 'summary_large_image', title: 'KritRNA — tRNA Therapeutics for Rare Disease',
    description: 'Research-stage suppressor-tRNA design for selected nonsense-mutation contexts in India.',
    images: ['/logo.png'],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KritRNA — Transloka Bio Pvt. Ltd.',
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  email: SITE.email,
  description:
    'AI-guided suppressor tRNA therapeutics platform for nonsense-mutation rare diseases.',
  address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Geist:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <AmbientTRNA />
        <Nav />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
