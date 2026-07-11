import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Public Resources',
  description: 'Plain-language and bilingual educational resources about genes, premature stop codons, suppressor tRNAs and KritRNA’s research stage.',
};

const RESOURCES = [
  ['Start here', 'Genes, proteins and premature stops', 'A plain-language path for families and non-specialists.', '/problem'],
  ['Science', 'How suppressor tRNA works', 'A deeper explanation of readthrough, aminoacylation, release-factor competition and safety.', '/science'],
  ['Definitions', 'Scientific glossary', 'Clear definitions for PTC, NMD, aaRS, readthrough, translation and related terms.', '/glossary'],
  ['Explore', 'Disease and gene explorer', 'Educational examples of selected nonsense-mutation contexts in HBB, DMD and CFTR.', '/explorer'],
  ['Community', 'Patient-organisation collaboration', 'How advocacy groups and communities can work with KritRNA without submitting medical records.', '/community'],
  ['Questions', 'Ask KritRNA', 'Use the grounded public-information assistant and inspect the source links beneath answers.', '/ask'],
];

export default function ResourcesPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Patients & families</div><h1 className="h1">Understand the research<br/><em>without the jargon wall.</em></h1><p className="lead">KritRNA is an early research company. It does not currently offer a treatment, clinical trial or patient-enrolment programme. These resources explain the science and the boundaries clearly.</p></div></section><section><div className="wrap"><div className="resource-list">{RESOURCES.map(([label,title,text,href])=><Link className="resource-card" href={href} key={href}><span>{label}</span><h2>{title}</h2><p>{text}</p></Link>)}</div></div></section><section className="ink-sec"><div className="wrap split-2"><div><div className="eyebrow">Key idea in Hindi</div><h2 className="h2 hindi" style={{marginTop:14}}>जीन में समय से पहले आया “स्टॉप” संकेत प्रोटीन बनना रोक सकता है।</h2><p className="lead hindi" style={{marginTop:18}}>KritRNA ऐसे suppressor tRNA डिज़ाइन पर शोध कर रहा है जो चुने हुए premature stop codon पर ribosome को आगे पढ़ने में मदद कर सकें। यह अभी शोध का चरण है—उपचार उपलब्ध नहीं है।</p></div><div><div className="eyebrow">In English</div><h2 className="h2" style={{marginTop:14}}>An early “stop” signal can interrupt protein production.</h2><p className="lead" style={{marginTop:18}}>KritRNA is researching suppressor-tRNA designs intended to help the ribosome continue past selected premature stops. This remains research—not an available treatment.</p></div></div></section><section><div className="wrap"><div className="callout">Do not send medical records, genetic reports, prescriptions or patient-identifying information through this website. Personal medical questions belong with a qualified clinician or genetic counsellor.</div></div></section></>;
}
