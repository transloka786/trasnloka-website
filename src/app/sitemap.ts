import type {MetadataRoute} from 'next';
import {SEO_PAGES,canonicalUrl,IS_PREVIEW} from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap{
 if(IS_PREVIEW)return [];
 // Omit unverified lastmod rather than claim every old page changed on every build.
 return Object.entries(SEO_PAGES).filter(([,page])=>page.index!==false).map(([path,page])=>({url:canonicalUrl(path),...(page.modified?{lastModified:page.modified}:{})}));
}
