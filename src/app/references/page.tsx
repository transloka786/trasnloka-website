import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scientific References',
  description: 'Persistent scientific and policy sources used across the KritRNA public website.',
};

const REFERENCES = [
  {
    area: 'Suppressor-tRNA evidence',
    title: 'Engineered tRNAs suppress nonsense mutations in cells and in vivo',
    citation: 'Nature 618, 842–848 (2023). DOI: 10.1038/s41586-023-06133-1. PMID: 37258671.',
    href: 'https://doi.org/10.1038/s41586-023-06133-1',
  },
  { area: 'Gene record', title: 'HBB — haemoglobin subunit beta', citation: 'NCBI Gene 3043.', href: 'https://www.ncbi.nlm.nih.gov/gene/3043' },
  { area: 'Gene record', title: 'DMD — dystrophin', citation: 'NCBI Gene 1756.', href: 'https://www.ncbi.nlm.nih.gov/gene/1756' },
  { area: 'Gene record', title: 'TP53 — tumour protein p53', citation: 'NCBI Gene 7157.', href: 'https://www.ncbi.nlm.nih.gov/gene/7157' },
  { area: 'India policy context', title: 'National Policy for Rare Diseases, 2021', citation: 'Ministry of Health and Family Welfare, Government of India. Policy framework for rare-disease diagnosis, care, Centres of Excellence and financial support.', href: 'https://main.mohfw.gov.in/sites/default/files/Final%20NPRD%2C%202021.pdf' },
];

export default function ReferencesPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Reference library</div><h1 className="h1">Scientific claims connected<br/><em>to evidence.</em></h1><p className="lead">This library lists persistent external sources used across the public website.</p></div></section><section><div className="wrap"><div className="update-list">{REFERENCES.map((reference,index)=><article key={reference.href}><div><span>{reference.area}</span><span>{String(index+1).padStart(2,'0')}</span></div><h2><a href={reference.href} target="_blank" rel="noopener noreferrer">{reference.title} ↗</a></h2><p>{reference.citation}</p></article>)}</div></div></section></>;
}
