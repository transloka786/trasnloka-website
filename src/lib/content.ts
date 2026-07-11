// ─────────────────────────────────────────────────────────────
// Single source of truth for public website content.
// Keep public claims aligned with CLAIMS.md before publishing.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'KritRNA',
  legal: 'Transloka Bio Pvt. Ltd.',
  cin: 'U72100UW2026PTC252612',
  tagline: 'Reading through silence, restoring the protein.',
  email: 'hello@hellokritrna.com',
  careersEmail: 'careers@hellokritrna.com',
  adminEmail: 'hellokritrna@gmail.com',
  phone: '+91 85958 98238',
  location: 'Noida, Uttar Pradesh, India',
  url: 'https://www.hellokritrna.com',
};

export const NAV = [
  { href: '/platform', label: 'Platform' },
  { href: '/pipeline', label: 'Pipeline' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

// ── Initial research programs ──
// Stages are descriptive milestones, not percentages or clinical-development claims.
export const PROGRAMS = [
  {
    name: 'β-Thalassemia',
    gene: 'HBB',
    area: 'Hematology · India-priority',
    goal: 'Design suppressor-tRNA candidates for selected HBB nonsense-mutation contexts.',
    stage: 'Program definition',
    next: 'Candidate design and in-vitro assay specification',
    accent: 'var(--cyan)',
  },
  {
    name: 'Duchenne muscular dystrophy',
    gene: 'DMD',
    area: 'Neuromuscular',
    goal: 'Design suppressor-tRNA candidates for selected DMD premature-stop contexts.',
    stage: 'Program definition',
    next: 'Candidate design and reporter-assay specification',
    accent: 'var(--magenta)',
  },
  {
    name: 'Cystic fibrosis',
    gene: 'CFTR',
    area: 'Pulmonary / epithelial',
    goal: 'Design suppressor-tRNA candidates for selected CFTR nonsense variants.',
    stage: 'Program definition',
    next: 'Candidate design and functional-assay planning',
    accent: 'var(--violet)',
  },
];

// ── Broader research scope; these are not active pipeline programs ──
export const REACH = [
  { area: 'Neuromuscular', ex: 'DMD and selected inherited muscular dystrophies', c: 'var(--magenta)' },
  { area: 'Hematology', ex: 'HBB and selected clotting-factor nonsense variants', c: 'var(--cyan)' },
  { area: 'Pulmonary / epithelial', ex: 'CFTR nonsense variants', c: 'var(--violet)' },
  { area: 'Metabolic / enzyme', ex: 'Selected loss-of-function enzyme disorders', c: 'var(--forest)' },
  { area: 'Ophthalmology', ex: 'Selected inherited retinal disease contexts', c: 'var(--ochre)' },
  { area: 'Additional research contexts', ex: 'Evaluated only after sequence, delivery and safety review', c: 'var(--magenta)' },
];

// ── Team and advisory network ──
export const TEAM = {
  lead: {
    name: 'Dr. Nikhil Bharti',
    role: 'Co-Founder & Director · Chief Scientific & Technology Officer',
    bio: 'Molecular biologist focused on translation regulation and tRNA biology. Leads scientific strategy, platform architecture and experimental-validation planning.',
    photo: '/team/nikhil.png',
  },
  outreach: {
    name: 'Pragati Bhaisora',
    role: 'Co-Founder & Director · Outreach & Awareness Strategist',
    bio: 'Leads rare-disease outreach, awareness, stakeholder communication and patient-community engagement, with equal co-founder responsibility for building KritRNA.',
    photo: '/team/pragati.png',
  },
  build: [
    { name: 'Additional AI / ML developer', note: 'Computational-development role currently under discussion; appointment not yet announced.' },
  ],
  advisory: [
    { name: 'Sandeep M. Eswarappa', note: 'Scientific-advisor onboarding and paperwork underway.' },
    { name: 'Additional scientific advisors', note: 'Approached; names will be announced only after formal confirmation.' },
    { name: 'LNJP Hospital — Genetics Department', note: 'Clinical-advisory discussions initiated; individual clinicians will be named after formal confirmation.' },
  ],
};

// ── Founder publication record ──
export const PUBS = [
  {
    year: '2024',
    venue: 'Nature Communications',
    title: 'Translation velocity and suppressor-tRNA efficacy',
    topic: 'First-author research on translation dynamics and suppressor-tRNA performance. Full bibliographic details are being cross-checked before final publication.',
    role: 'First author',
    doi: null as string | null,
    pubmed: 'https://pubmed.ncbi.nlm.nih.gov/?term=Nikhil+Bharti%5BAuthor%5D',
    c: 'var(--magenta)',
  },
  {
    year: '2023',
    venue: 'Nature',
    title: 'Engineered tRNAs suppress nonsense mutations in cells and in vivo',
    topic: 'Peer-reviewed study of engineered suppressor tRNAs in cellular and in-vivo models.',
    role: 'Co-author',
    doi: 'https://doi.org/10.1038/s41586-023-06133-1',
    pubmed: 'https://pubmed.ncbi.nlm.nih.gov/37258671/',
    c: 'var(--violet)',
  },
  {
    year: '2023',
    venue: 'Journal of Biological Chemistry',
    title: 'tRNA biology and translation regulation',
    topic: 'Co-authored work in tRNA biology and translational regulation. Full bibliographic details are being cross-checked before final publication.',
    role: 'Co-author',
    doi: null as string | null,
    pubmed: 'https://pubmed.ncbi.nlm.nih.gov/?term=Nikhil+Bharti%5BAuthor%5D',
    c: 'var(--cyan)',
  },
];

// ── Careers roles ──
// JD links remain disabled until final, approved PDFs are supplied.
export const ROLES = [
  {
    code: 'Engine 01 — Founding ML Engineer',
    title: 'Founding ML Engineer',
    tag: 'Build the model that learns to read through silence.',
    accent: 'cyan',
    chips: ['Noida / Remote', 'Full-time', 'Paid trial task', 'Founding equity'],
    own: [
      'The ML backbone of Engine 01 — readthrough-efficiency prediction in sequence context',
      'The active-learning loop that turns each wet-lab round into a better model',
      'Scoring and Pareto-ranking that decide which candidate sequences reach the bench',
    ],
    warnLabel: 'You will not enjoy this role if',
    warn: 'you need a settled codebase, clean labelled data, and someone else to define the problem. Here you define it.',
    jd: null as string | null,
  },
  {
    code: 'Corpus 01 — TB-INT-2026-01',
    title: 'Research & Data Curation Intern',
    tag: 'Build the corpus that teaches Engine 01 to read biology.',
    accent: 'forest',
    chips: ['Noida / Hybrid', '6 months', 'Paid trial task', 'PPO pathway'],
    own: [
      'tRNA databases, nonsense-mutation records and readthrough literature — made machine-readable',
      'The curation standards the whole platform’s data quality rests on',
      'Turning messy primary literature into structured, defensible datasets',
    ],
    warnLabel: 'You will not enjoy this role if',
    warn: 'you need someone to tell you which paper matters, or you can’t defend a data point when it’s challenged. We do not care about degrees — we care about whether your data can be trusted.',
    stipend: '₹20,000/mo → ₹25,000/mo post-review · paid trial task ₹1,500',
    jd: null as string | null,
  },
  {
    code: 'Ledger 02 — TB-INT-2026-02',
    title: 'Operations & Accounts Intern',
    tag: 'Science needs a spine. Books, POs, GST, compliance — yours.',
    accent: 'ochre',
    chips: ['Noida / On-site', '6 months', 'Paid trial task', 'PPO pathway'],
    own: [
      'Bookkeeping, purchase orders, GST and ROC filings — the first financial year, end to end',
      'The operational systems a small founding team runs on',
      'Vendor coordination and compliance calendars that cannot slip',
    ],
    warnLabel: 'You will be good at this if',
    warn: 'your numbers reconcile, and you sleep better when they do. We do not care about degrees — we care about whether your books hold up.',
    stipend: '₹12,000/mo → ₹15,000/mo post-review · paid trial task ₹750',
    jd: null as string | null,
  },
  {
    code: 'Signal 03 — Social Media Intern',
    title: 'Social Media Intern',
    tag: 'Make hard science legible without making it wrong.',
    accent: 'magenta',
    chips: ['Noida / Hybrid', '6 months', 'Paid trial task', 'PPO pathway'],
    own: [
      'The tRNA Chronicles series and explainer assets that make our science land',
      'Channel growth and voice — accurate, confident, never clickbait',
      'Working directly with Pragati Bhaisora on outreach and awareness',
    ],
    warnLabel: 'You will not enjoy this role if',
    warn: 'you would cut a scientific corner for engagement. The trial is the three-part Readthrough Test — accuracy is graded first.',
    jd: null as string | null,
  },
];

// ── FAQ (also emitted as JSON-LD for SEO) ──
export const FAQ = [
  {
    q: 'What is KritRNA?',
    a: 'KritRNA is a research-stage, AI-guided suppressor-tRNA platform being developed by Transloka Bio Pvt. Ltd. The aim is to design transfer RNAs that can read through selected premature stop codons so a ribosome can continue protein synthesis. Every candidate requires experimental validation.',
  },
  {
    q: 'What is a premature termination codon or nonsense mutation?',
    a: 'A nonsense mutation changes a protein-coding sequence into an early stop codon — UAA, UAG or UGA in mRNA. Translation can therefore terminate before the full protein has been produced, and the transcript may also be reduced by nonsense-mediated mRNA decay.',
  },
  {
    q: 'How does a suppressor tRNA work?',
    a: 'A suppressor tRNA is designed to recognise a selected stop codon and deliver an amino acid during translation. In experimental systems this can permit readthrough and production of a longer or full-length protein, but activity, amino-acid identity, normal-stop effects, delivery and safety must be tested for every design.',
  },
  {
    q: 'Which diseases is KritRNA initially focusing on?',
    a: 'The initial research focus is β-thalassemia caused by selected HBB nonsense variants, Duchenne muscular dystrophy caused by selected DMD nonsense variants, and cystic fibrosis caused by selected CFTR nonsense variants. These are research programs, not available treatments.',
  },
  {
    q: 'What stage is the company at?',
    a: 'KritRNA is at an early, preclinical research stage. The computational platform is under active development and the next major gate is experimental validation of selected candidates through appropriate wet-lab and CRO collaborations. No KritRNA candidate is in clinical trials.',
  },
  {
    q: 'Is KritRNA’s technology clinically proven?',
    a: 'No. KritRNA is a research-stage company. Nothing on this website is evidence of clinical efficacy, regulatory approval or an available therapy.',
  },
  {
    q: 'Where is KritRNA based?',
    a: 'KritRNA is the operating brand of Transloka Bio Pvt. Ltd., based in Noida, Uttar Pradesh, India.',
  },
  {
    q: 'Does this website collect patient or clinical data?',
    a: 'No. The public website is not a patient registry and should not be used to submit medical records, genetic reports or health information. It processes only the contact, recruitment and chatbot information a visitor chooses to provide.',
  },
  {
    q: 'How can I partner with or invest in KritRNA?',
    a: 'Email hello@hellokritrna.com or use the contact form. Please identify whether your enquiry concerns scientific validation, CRO work, rare-disease outreach, investment or another partnership area.',
  },
  {
    q: 'Is KritRNA hiring?',
    a: 'Current opportunities are listed on the Careers page. Detailed role briefs are shared after the final versions are approved; the website does not link to placeholder or missing PDFs.',
  },
];
