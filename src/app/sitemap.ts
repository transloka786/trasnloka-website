import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/platform', '/pipeline', '/team', '/careers', '/faq', '/contact', '/privacy', '/terms', '/disclaimer'];
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
