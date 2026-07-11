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
    keywords: ['kritrna', 'transloka', 'company', 'startup', 'stage', 'noida', 'india', 'what is'],
    content: 'KritRNA is the operating brand of Transloka Bio Pvt. Ltd., an India-first, pre-seed deep-tech biotechnology company based in Noida. It is developing suppressor-tRNA therapeutics and computational design systems for selected genetic diseases caused by premature termination codons. The company is at an early preclinical research stage. No KritRNA candidate is in clinical trials or available as a treatment.',
    sources: [CHAT_SOURCES.science, CHAT_SOURCES.india],
  },
  {
    id: 'science',
    title: 'Premature stop codons and suppressor tRNA',
    route: '/science',
    keywords: ['ptc', 'premature stop', 'nonsense mutation', 'suppressor trna', 'readthrough', 'translation', 'protein', 'genome editing'],
    content: 'A nonsense mutation can create an early UAA, UAG or UGA stop codon. Translation may end before the full protein is produced, and the transcript may also be reduced by nonsense-mediated mRNA decay. A suppressor tRNA is designed to recognise a selected premature stop and deliver an amino acid so translation can continue. This acts at the level of translation and does not edit DNA. Readthrough is not automatically therapeutic: amino-acid identity, useful protein restoration, normal-stop effects, delivery and safety must be tested.',
    sources: [CHAT_SOURCES.science, CHAT_SOURCES.nature2023],
  },
  {
    id: 'platform',
    title: 'Dual-engine platform',
    route: '/platform',
    keywords: ['platform', 'engine 1', 'engine 2', 'ai', 'machine learning', 'design', 'ranking', 'candidate'],
    content: 'KritRNA is developing two connected computational engines. Engine 01 generates, filters and ranks suppressor-tRNA candidates using biological, structural, kinetic and context constraints. Engine 02 models the candidate as a perturbation within the wider translation system, including termination competition, ribosome traffic, NMD, quality control, stress signalling and protein output. Selected candidates must be tested experimentally in a design-test-learn loop.',
    sources: [CHAT_SOURCES.platform, CHAT_SOURCES.smallWorld],
  },
  {
    id: 'small-world',
    title: 'Translation small-world engine',
    route: '/small-world',
    keywords: ['small world', 'network', 'ribosome', 'nmd', 'isr', 'gcn2', 'zak', 'release factor', 'erf1', 'erf3'],
    content: 'The translation small-world engine is a mechanistic systems-model architecture. It is intended to connect initiation, elongation, tRNA supply, ribosome pausing and collision, termination, recycling, nonsense-mediated decay, ribosome rescue, integrated stress response and protein folding. The public website describes the architecture only; it does not disclose proprietary model weights, scoring functions, candidate sequences or training data.',
    sources: [CHAT_SOURCES.smallWorld],
  },
  {
    id: 'programs',
    title: 'Initial research programs',
    route: '/pipeline',
    keywords: ['pipeline', 'hbb', 'thalassemia', 'dmd', 'duchenne', 'cftr', 'cystic fibrosis', 'disease', 'program'],
    content: 'KritRNA’s initial research focus is selected nonsense-mutation contexts in HBB for beta-thalassemia, DMD for Duchenne muscular dystrophy and CFTR for cystic fibrosis. These are discovery-stage research programs shown through evidence gates, not percentage completion. They are not clinical-stage assets or available therapies.',
    sources: [CHAT_SOURCES.pipeline],
  },
  {
    id: 'india',
    title: 'India-first strategy',
    route: '/india',
    keywords: ['india', 'india first', 'indigenous', 'rare disease india', 'noida', 'access'],
    content: 'India-first means building scientific ownership, mutation mapping, validation relationships and an access-aware development path from India. It is not a claim of government endorsement, clinical access or a confirmed institutional partnership. KritRNA aims to combine globally serious science with attention to India’s rare-disease and biotechnology context.',
    sources: [CHAT_SOURCES.india],
  },
  {
    id: 'team',
    title: 'Founders and team',
    route: '/team',
    keywords: ['founder', 'nikhil', 'pragati', 'team', 'advisor', 'publication'],
    content: 'KritRNA is led by equal co-founders and directors Dr. Nikhil Bharti and Pragati Bhaisora. Nikhil leads scientific strategy, platform architecture and validation planning. Pragati leads outreach, awareness, stakeholder communication and rare-disease community engagement. Pending advisors and collaborators are labelled by their actual status and are not presented as confirmed appointments or partnerships.',
    sources: [CHAT_SOURCES.team],
  },
  {
    id: 'investors',
    title: 'Investment and partnerships',
    route: '/investors',
    keywords: ['invest', 'investor', 'funding', 'partner', 'cro', 'collaboration', 'grant', 'business'],
    content: 'KritRNA is pre-seed and is pursuing evidence-gated development. Relevant discussions include scientific validation, CRO work, rare-disease outreach, strategic partnerships and investment. The company does not publish confidential fundraising terms through the chatbot. Serious enquiries should use the investor or contact pathway.',
    sources: [CHAT_SOURCES.investors, CHAT_SOURCES.contact],
  },
  {
    id: 'careers',
    title: 'Careers',
    route: '/careers',
    keywords: ['career', 'job', 'role', 'internship', 'apply', 'hiring', 'resume', 'cv'],
    content: 'Current opportunities and application instructions are listed on the Careers page. Career enquiries should be sent to careers@hellokritrna.com. The assistant must not promise selection, compensation, interview outcomes or role availability beyond the approved public page.',
    sources: [CHAT_SOURCES.careers],
  },
  {
    id: 'contact',
    title: 'Contact details',
    route: '/contact',
    keywords: ['contact', 'email', 'phone', 'reach', 'message'],
    content: 'General enquiries: hello@hellokritrna.com. Careers: careers@hellokritrna.com. The public website must not be used to submit medical records, genetic reports or other patient health information.',
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
