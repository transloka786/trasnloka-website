import type { Metadata } from 'next'; import { Suspense } from 'react'; import SearchClient from '@/components/SearchClient';
export const metadata:Metadata={title:'Search',description:'Search KritRNA website pages and approved public topics.'};
export default function SearchPage(){return <section className="page-hero"><div className="wrap"><div className="eyebrow">Search</div><h1 className="h1">Find the right<br/><em>level of detail.</em></h1><Suspense fallback={<p>Loading search…</p>}><SearchClient /></Suspense></div></section>}
