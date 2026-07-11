import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disease and Gene Explorer',
  description: 'Educational overview of selected HBB, DMD and TP53 premature-stop research contexts.',
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
    disease: 'TP53-mutant cancer', gene: 'TP53', area: 'Oncology · tumour suppressor restoration',
    context: 'Selected TP53 nonsense mutations can prevent production of full-length p53. KritRNA is defining how suppressor-tRNA candidates could restore protein expression and tumour-suppressor function in appropriate cancer models.',
    questions: ['Which TP53 nonsense variant and tumour context?', 'Which amino acid restoration best preserves p53 function?', 'How will transcriptional activity and cancer-cell response be measured?'],
    source: 'https://www.ncbi.nlm.nih.gov/gene/7157',
  },
];

export default function ExplorerPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Educational explorer</div><h1 className="h1">Different diseases.<br/><em>A shared stop signal.</em></h1><p className="lead">Explore KritRNA’s three initial research programmes by disease, gene and validation question.</p></div></section><section><div className="wrap"><div className="grid cols-3">{PROGRAMS.map((program)=><article className="cell" key={program.gene}><div className="k">{program.area}</div><h2>{program.disease}</h2><p><strong>{program.gene}</strong></p><p style={{marginTop:10}}>{program.context}</p><div style={{marginTop:18,paddingTop:14,borderTop:'1px solid var(--rule)'}}><div className="k">Research questions</div><ul style={{paddingLeft:18,color:'var(--ink-soft)'}}>{program.questions.map((q)=><li key={q} style={{marginTop:7}}>{q}</li>)}</ul></div><a href={program.source} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginTop:18,fontFamily:'var(--mono)',fontSize:'.7rem',color:'var(--cyan)'}}>Open official gene record ↗</a></article>)}</div><Link className="btn btn-solid" href="/pipeline">See programme status →</Link></div></section></>;
}
