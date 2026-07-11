export type ChatSource = {
  id: string;
  title: string;
  href: string;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  route: string;
  keywords: string[];
  content: string;
  sources: ChatSource[];
};

export const CHAT_SOURCES = {
  science: { id: 'science', title: 'KritRNA science', href: '/science' },
  platform: { id: 'platform', title: 'KritRNA platform', href: '/platform' },
  smallWorld: { id: 'small-world', title: 'Translation small-world engine', href: '/small-world' },
  pipeline: { id: 'pipeline', title: 'Research programs', href: '/pipeline' },
  india: { id: 'india', title: 'India-first strategy', href: '/india' },
  team: { id: 'team', title: 'Team and scientific foundation', href: '/team' },
  investors: { id: 'investors', title: 'Investor information', href: '/investors' },
  careers: { id: 'careers', title: 'Careers', href: '/careers' },
  contact: { id: 'contact', title: 'Contact KritRNA', href: '/contact' },
  nature2023: { id: 'nature-2023', title: 'Engineered tRNAs suppress nonsense mutations in cells and in vivo', href: 'https://doi.org/10.1038/s41586-023-06133-1' },
} satisfies Record<string, ChatSource>;

export const KNOWLEDGE: KnowledgeEntry[] = [
  {
    id: 'company',
    title: 'Company identity and stage',
    route: '/',
    keywords: ['kritrna', 'transloka', 'company', 'startup', 'stage', 'noida', 'india', 'what is', 'name meaning'],
    content: 'KritRNA is the operating brand of Transloka Bio Pvt. Ltd., an India-first deep-tech biotechnology company based in Noida. The name combines “Krit”—creation or something deliberately made—with RNA, the molecular language the company engineers. KritRNA is developing suppressor-tRNA therapeutics and computational translation systems for selected premature-stop disease contexts. The company is at an early preclinical research stage.',
    sources: [CHAT_SOURCES.science, CHAT_SOURCES.india],
  },
  {
    id: 'science',
    title: 'Premature stop codons and suppressor tRNA',
    route: '/science',
    keywords: ['ptc', 'premature stop', 'nonsense mutation', 'suppressor trna', 'readthrough', 'translation', 'protein', 'genome editing'],
    content: 'A nonsense mutation can create an early UAA, UAG or UGA stop codon. Translation may end before the full protein is produced, and the transcript may also be reduced by nonsense-mediated mRNA decay. A suppressor tRNA is designed to recognise a selected premature stop and deliver an amino acid so translation can continue toward a full-length protein. This acts at the level of translation, works with the cell’s own mRNA and does not permanently edit DNA. Engineered suppressor tRNAs have shown promise in peer-reviewed cellular and in-vivo research.',
    sources: [CHAT_SOURCES.science, CHAT_SOURCES.nature2023],
  },
  {
    id: 'platform',
    title: 'Dual-engine platform',
    route: '/platform',
    keywords: ['platform', 'engine 1', 'engine 2', 'ai', 'machine learning', 'design', 'ranking', 'candidate'],
    content: 'KritRNA is developing two connected computational engines. Engine 01 generates, filters and ranks suppressor-tRNA candidates using biological, structural, kinetic and context constraints. Engine 02 models each candidate within the wider translation system, including termination competition, ribosome traffic, NMD, quality control, stress signalling and protein output. The combined platform is intended to move from a target mutation to a scientifically defensible experimental shortlist.',
    sources: [CHAT_SOURCES.platform, CHAT_SOURCES.smallWorld],
  },
  {
    id: 'small-world',
    title: 'Translation small-world engine',
    route: '/small-world',
    keywords: ['small world', 'network', 'ribosome', 'nmd', 'isr', 'gcn2', 'zak', 'release factor', 'erf1', 'erf3'],
    content: 'The translation small-world engine is a mechanistic systems-model architecture intended to connect initiation, elongation, tRNA supply, ribosome pausing and collision, termination, recycling, nonsense-mediated decay, ribosome rescue, integrated stress response and protein folding. It is designed to evaluate a suppressor tRNA as a systems-level intervention rather than an isolated sequence.',
    sources: [CHAT_SOURCES.smallWorld],
  },
  {
    id: 'programs',
    title: 'Initial research programs',
    route: '/pipeline',
    keywords: ['pipeline', 'hbb', 'thalassemia', 'dmd', 'duchenne', 'tp53', 'p53', 'cancer', 'oncology', 'disease', 'program'],
    content: 'KritRNA’s initial research focus is selected nonsense-mutation contexts in HBB for beta-thalassemia, DMD for Duchenne muscular dystrophy and TP53 for p53-deficient cancer. Together, these programmes test the platform across hematology, neuromuscular disease and oncology.',
    sources: [CHAT_SOURCES.pipeline],
  },
  {
    id: 'india',
    title: 'India-first strategy',
    route: '/india',
    keywords: ['india', 'india first', 'indigenous', 'rare disease india', 'noida', 'access'],
    content: 'India-first means building scientific ownership, mutation mapping, validation relationships and an access-aware development path from India. KritRNA aims to combine globally serious science with India-based capability in computational translation biology, therapeutic design and experimental validation.',
    sources: [CHAT_SOURCES.india],
  },
  {
    id: 'team',
    title: 'Founders and team',
    route: '/team',
    keywords: ['founder', 'nikhil', 'pragati', 'team', 'advisor', 'publication'],
    content: 'KritRNA is led by equal co-founders and directors Dr. Nikhil Bharti and Pragati Bhaisora. Nikhil leads scientific strategy, platform architecture and validation planning. Pragati leads outreach, awareness, stakeholder communication and rare-disease community engagement.',
    sources: [CHAT_SOURCES.team],
  },
  {
    id: 'investors',
    title: 'Investment and partnerships',
    route: '/investors',
    keywords: ['invest', 'investor', 'funding', 'partner', 'cro', 'collaboration', 'grant', 'business'],
    content: 'KritRNA is a pre-seed biotechnology company building a differentiated suppressor-tRNA and translation-modelling platform. Relevant discussions include scientific validation, CRO work, disease-model partnerships, strategic collaborations and investment.',
    sources: [CHAT_SOURCES.investors, CHAT_SOURCES.contact],
  },
  {
    id: 'careers',
    title: 'Careers',
    route: '/careers',
    keywords: ['career', 'job', 'role', 'internship', 'apply', 'hiring', 'resume', 'cv'],
    content: 'Current opportunities and application instructions are listed on the Careers page. Career enquiries should be sent to careers@hellokritrna.com.',
    sources: [CHAT_SOURCES.careers],
  },
  {
    id: 'contact',
    title: 'Contact details',
    route: '/contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'message'],
    content: 'General enquiries: hello@hellokritrna.com. Careers: careers@hellokritrna.com. The public website should not be used to submit medical records, genetic reports or other patient health information.',
    sources: [CHAT_SOURCES.contact],
  },
];

const STOP_WORDS = new Set(['what', 'when', 'where', 'which', 'with', 'that', 'this', 'from', 'about', 'your', 'have', 'does', 'will', 'would', 'could', 'should', 'into', 'kritrna']);

function tokens(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9+/-]+/g, ' ').split(/\s+/).filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function retrieveKnowledge(query: string, limit = 4) {
  const queryTokens = new Set(tokens(query));
  return KNOWLEDGE
    .map((entry) => {
      const searchable = `${entry.title} ${entry.keywords.join(' ')} ${entry.content}`.toLowerCase();
      let score = 0;
      for (const token of queryTokens) {
        if (entry.keywords.some((keyword) => keyword.includes(token) || token.includes(keyword))) score += 5;
        if (entry.title.toLowerCase().includes(token)) score += 3;
        if (searchable.includes(token)) score += 1;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}

export function uniqueSources(entries: KnowledgeEntry[]) {
  const seen = new Set<string>();
  return entries.flatMap((entry) => entry.sources).filter((source) => {
    if (seen.has(source.id)) return false;
    seen.add(source.id);
    return true;
  }).slice(0, 4);
}