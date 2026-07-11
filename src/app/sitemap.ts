import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/science', '/platform', '/small-world', '/pipeline', '/india', '/investors', '/team', '/careers', '/faq', '/contact', '/privacy', '/terms', '/disclaimer'];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : ['/science', '/platform', '/india', '/investors'].includes(route) ? 0.9 : 0.7,
  }));
}
