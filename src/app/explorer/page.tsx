import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disease and Gene Explorer',
  description: 'Educational overview of selected HBB, DMD and CFTR nonsense-mutation research contexts. Not diagnostic.',
};

const PROGRAMS = [
  {
    disease: 'β-Thalassemia', gene: 'HBB', area: 'Hematology · India-priority',
    context: 'Selected HBB nonsense variants can interrupt β-globin production. KritRNA is defining candidate and assay requirements for selected contexts.',
    questions: ['Which premature stop and local sequence context?', 'Which amino acid should be restored?', 'How will β-globin protein and function be measured?'],
    source: 'https://www.ncbi.nlm.nih.gov/gene/3043',
  },
  {
    disease: 'Duchenne muscular dystrophy', gene: 'DMD', area: 'Neuromuscular',
    context: 'Selected DMD nonsense variants can interrupt dystrophin production. The large gene and disease-relevant assay context create distinct design and validation constraints.',
    questions: ['Which transcript and exon context?', 'How will full-length dystrophin be distinguished?', 'What disease-relevant cellular model is appropriate?'],
    source: 'https://www.ncbi.nlm.nih.gov/gene/1756',
  },
  {
    disease: 'Cystic fibrosis', gene: 'CFTR', area: 'Pulmonary / epithelial',
    context: 'Selected CFTR nonsense variants can reduce full-length CFTR production. Functional restoration requires more than a readthrough reporter signal.',
    questions: ['Which nonsense variant and epithelial context?', 'Does restored protein mature and localise?', 'Can channel function be measured reproducibly?'],
    source: 'https://www.ncbi.nlm.nih.gov/gene/1080',
  },
];

export default function ExplorerPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Educational explorer</div><h1 className="h1">Disease names differ.<br/><em>The stop signal can be shared.</em></h1><p className="lead">Explore KritRNA’s three initial research programmes by disease, gene and validation question. This page is educational and cannot determine whether a person, variant or report is suitable for any therapy or study.</p></div></section><section><div className="wrap"><div className="grid cols-3">{PROGRAMS.map((program)=><article className="cell" key={program.gene}><div className="k">{program.area}</div><h2>{program.disease}</h2><p><strong>{program.gene}</strong></p><p style={{marginTop:10}}>{program.context}</p><div style={{marginTop:18,paddingTop:14,borderTop:'1px solid var(--rule)'}}><div className="k">Research questions</div><ul style={{paddingLeft:18,color:'var(--ink-soft)'}}>{program.questions.map((q)=><li key={q} style={{marginTop:7}}>{q}</li>)}</ul></div><a href={program.source} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginTop:18,fontFamily:'var(--mono)',fontSize:'.7rem',color:'var(--cyan)'}}>Open official gene record ↗</a></article>)}</div><div className="callout">A gene or nonsense variant appearing here does not imply treatment availability, clinical eligibility or expected benefit. KritRNA has no patient-enrolment programme.</div><Link className="btn btn-solid" href="/pipeline">See evidence-gated programme status →</Link></div></section></>;
}
