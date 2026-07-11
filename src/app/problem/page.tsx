import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata:Metadata={
  title:'The Problem',
  description:'Why premature stop codons interrupt protein production—and why suppressor tRNA offers a distinct programmable solution.'
};

const DIFFERENCES=[
  ['No permanent DNA edit','Suppressor tRNAs act during translation on the mRNA message rather than permanently changing the genome.'],
  ['Designed for the selected stop','Candidates can be engineered around the stop codon, intended amino acid and local sequence context.'],
  ['Uses the cell’s own transcript','The objective is to restore full-length protein from endogenous mRNA already produced by the cell.'],
  ['A platform across diseases','Because the same molecular failure occurs in different genes, learning can compound across multiple programmes.'],
];

const LANDSCAPE=[
  ['Gene replacement / gene therapy','Introduces a working genetic payload and can be powerful, but payload size, delivery, durability, immune response and manufacturing can vary substantially by disease.'],
  ['Genome editing','Changes DNA at a selected locus and may offer durable correction, but requires controlled delivery, edit specificity and long-term safety assessment.'],
  ['Small-molecule readthrough','Can promote readthrough in some contexts, but activity may vary with stop codon, sequence, dose and disease biology.'],
  ['Suppressor tRNA','A programmable translation-level modality designed to decode selected premature stops and restore full-length protein without permanent genome modification.'],
];

export default function ProblemPage(){
  return <>
    <section className="page-hero"><div className="wrap">
      <div className="eyebrow">The shared molecular failure</div>
      <h1 className="h1">The protein-making message<br/><em>stops too early.</em></h1>
      <p className="lead">A nonsense mutation creates a premature termination codon. The ribosome stops before the protein is complete, and the cell may also destroy the message through nonsense-mediated decay.</p>
    </div></section>

    <section className="ink-sec"><div className="wrap split-2" style={{alignItems:'center'}}>
      <div>
        <div className="eyebrow">The KritRNA solution</div>
        <h2 className="h2" style={{marginTop:14}}>Teach the ribosome to read through the premature stop</h2>
        <p className="lead" style={{marginTop:20}}>KritRNA is developing engineered suppressor tRNAs that recognise selected premature stop codons and deliver an amino acid so translation can continue toward a full-length protein.</p>
        <p style={{marginTop:16,color:'rgba(244,234,213,.72)'}}>This is not simply a workaround for one disease. It is a programmable therapeutic strategy built around a molecular failure shared across many diseases.</p>
      </div>
      <div style={{border:'1px solid rgba(244,234,213,.18)',borderRadius:10,padding:28}}>
        <div className="k" style={{color:'var(--cyan)'}}>From interruption to restoration</div>
        {['Premature stop identified','Suppressor tRNA designed','Ribosome decodes the selected stop','Translation continues','Full-length protein is evaluated'].map((step,i)=><div key={step} style={{display:'flex',gap:14,padding:'14px 0',borderTop:i?'1px solid rgba(244,234,213,.14)':'none'}}><span style={{fontFamily:'var(--mono)',color:i%2?'var(--cyan)':'var(--magenta)'}}>{String(i+1).padStart(2,'0')}</span><span>{step}</span></div>)}
      </div>
    </div></section>

    <section><div className="wrap">
      <div className="sec-head"><div className="eyebrow">Why suppressor tRNA is different</div><h2 className="h2">A distinct therapeutic logic</h2><p>Suppressor tRNA combines translation-level intervention with programmable molecular design and cross-disease platform potential.</p></div>
      <div className="grid cols-2">{DIFFERENCES.map(([title,text],i)=><article className="cell" key={title} style={{borderTop:`4px solid ${i%2?'var(--cyan)':'var(--magenta)'}`}}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section><div className="wrap">
      <div className="sec-head"><div className="eyebrow">Therapeutic landscape</div><h2 className="h2">Different modalities, different biological trade-offs</h2><p>KritRNA’s approach is not a copy of gene replacement, editing or small-molecule readthrough. It is a separate modality with its own strengths, risks and development requirements.</p></div>
      <div className="grid cols-2">{LANDSCAPE.map(([title,text],i)=><article className="cell" key={title} style={title==='Suppressor tRNA'?{border:'2px solid var(--magenta)',background:'rgba(233,30,99,.05)'}:{}}><div className="k" style={{color:title==='Suppressor tRNA'?'var(--magenta)':'var(--ink-mute)'}}>{title==='Suppressor tRNA'?'KritRNA modality':'Established modality class'}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="callout">The modality has demonstrated promise in peer-reviewed preclinical research. KritRNA’s next task is to convert that promise into rigorously designed, disease-relevant candidates and reproducible experimental evidence.</div>
      <Link className="btn btn-solid" href="/science">Explore the suppressor-tRNA science →</Link>
    </div></section>
  </>;
}
