import type {MetadataRoute} from 'next';
import {SEO_ORIGIN,IS_PREVIEW} from '@/lib/seo';
export default function robots():MetadataRoute.Robots{
 // More-specific groups repeat the API exclusion. Search access does not require changing training-bot policy.
 const policy={allow:['/','/api/og'],disallow:['/api/']};
 return {rules:[{userAgent:'*',...policy},{userAgent:'OAI-SearchBot',...policy},{userAgent:'PerplexityBot',...policy}],...(!IS_PREVIEW?{sitemap:`${SEO_ORIGIN}/sitemap.xml`}:{})};
}
