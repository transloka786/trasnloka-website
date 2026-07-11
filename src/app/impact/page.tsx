import type { Metadata } from 'next';

export const metadata:Metadata={title:'Impact',description:'The long-term impact of an India-first suppressor tRNA platform across disease areas.'};

const IMPACT=[
  ['One platform across disease boundaries','A platform organised around premature termination can generate reusable scientific knowledge across otherwise fragmented disease programmes.'],
  ['India-owned scientific capability','Build company-owned computational, experimental and translational capability from the Indian biotechnology ecosystem.'],
  ['Compounding experimental intelligence','Every well-designed experiment can improve future candidate selection, assay strategy and programme prioritisation.'],
  ['Access-aware development from the beginning','Consider diagnosis, delivery, infrastructure and affordability while the technology is being built—not after it is finished.'],
];

export default function ImpactPage(){return <>
  <section className="page-hero"><div className="wrap"><div className="eyebrow">Impact</div><h1 className="h1">A new translation platform.<br/><em>Built to reach across diseases.</em></h1><p className="lead">KritRNA’s long-term ambition is to transform a shared molecular failure into a family of programmable therapeutic opportunities—while creating durable scientific ownership and biotechnology capability from India.</p></div></section>
  <section><div className="wrap"><div className="grid cols-2">{IMPACT.map(([title,text],i)=><article className="cell" key={title} style={{borderTop:`4px solid ${i%2?'var(--cyan)':'var(--magenta)'}`}}><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
</>}
