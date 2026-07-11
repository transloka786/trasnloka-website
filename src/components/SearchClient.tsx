'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SEARCH_INDEX } from '@/content/siteContent';

export default function SearchClient() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 1);
    if (!terms.length) return SEARCH_INDEX;
    return SEARCH_INDEX.map((item) => ({ ...item, score: terms.reduce((score, term) => score + (`${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(term) ? 1 : 0), 0) })).filter((item) => item.score > 0).sort((a,b)=>b.score-a.score);
  }, [query]);
  return <div><label className="search-label" htmlFor="site-search">Search KritRNA</label><input id="site-search" className="site-search" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Try: suppressor tRNA, careers, CRO, India…" autoFocus /><p className="search-count" aria-live="polite">{results.length} result{results.length===1?'':'s'}</p><div className="search-results">{results.map((item)=><Link href={item.href} key={item.href} className="search-result"><span>{item.section}</span><h2>{item.title}</h2><p>{item.description}</p></Link>)}</div></div>;
}
