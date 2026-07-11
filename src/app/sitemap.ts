import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/problem', '/science', '/platform', '/small-world', '/pipeline', '/india', '/about', '/how-we-work', '/impact', '/partners', '/community', '/investors', '/updates', '/team', '/careers', '/resources', '/explorer', '/glossary', '/references', '/ask', '/search', '/faq', '/contact', '/privacy', '/terms', '/disclaimer'];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: route === '/updates' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : ['/problem', '/science', '/platform', '/india', '/partners', '/investors', '/resources'].includes(route) ? 0.9 : 0.7,
  }));
}
