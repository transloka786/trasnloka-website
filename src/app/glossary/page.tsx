import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Plain-language definitions for premature stop codons, suppressor tRNAs, translation, NMD, aminoacylation and related KritRNA science.',
};

const TERMS = [
  ['Aminoacylation', 'The process by which an aminoacyl-tRNA synthetase attaches an amino acid to a tRNA. A suppressor tRNA must preserve the identity features needed for the intended charging reaction.'],
  ['Aminoacyl-tRNA synthetase (aaRS)', 'An enzyme that matches a tRNA with an amino acid. Incorrect recognition can change which amino acid is inserted during readthrough.'],
  ['Anticodon', 'A three-nucleotide sequence in a tRNA that pairs with a codon on mRNA. Changing the anticodon alone does not guarantee that a suppressor tRNA will fold, charge or function safely.'],
  ['Codon', 'A group of three RNA letters read by the ribosome. Most codons specify amino acids; UAA, UAG and UGA normally signal termination.'],
  ['Integrated stress response (ISR)', 'A cellular signalling programme that changes protein synthesis during stress. Translation perturbations and ribosome problems can influence ISR pathways.'],
  ['Nonsense-mediated mRNA decay (NMD)', 'A surveillance pathway that can reduce an mRNA containing a premature stop codon, leaving less message available for protein production.'],
  ['Nonsense mutation', 'A DNA change that creates a stop codon inside a protein-coding sequence before the intended end.'],
  ['Premature termination codon (PTC)', 'An early UAA, UAG or UGA stop signal created within a coding region. It can interrupt translation and may also trigger NMD.'],
  ['Readthrough', 'Continuation of translation past a stop codon. In suppressor-tRNA research, the goal is selected readthrough at a disease-causing premature stop while controlling effects at normal stops.'],
  ['Release factors', 'Proteins including eRF1 and eRF3 that recognise stop codons and terminate translation. A suppressor tRNA must compete with them at a premature stop.'],
  ['Ribosome', 'The molecular machine that reads mRNA and assembles a protein from amino acids.'],
  ['Suppressor tRNA', 'An engineered or naturally occurring tRNA capable of decoding a stop codon and delivering an amino acid so translation may continue.'],
  ['Translation', 'The process by which the ribosome reads mRNA and builds a protein.'],
];

export default function GlossaryPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Glossary</div><h1 className="h1">Hard science,<br/><em>defined precisely.</em></h1><p className="lead">Plain-language definitions for terms used across the KritRNA website. These explanations are educational and are not medical advice.</p></div></section><section><div className="wrap"><div className="glossary-list">{TERMS.map(([term, definition])=><article key={term}><h2>{term}</h2><p>{definition}</p></article>)}</div></div></section></>;
}
