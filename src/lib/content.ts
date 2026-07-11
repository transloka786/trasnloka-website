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
  { href: '/science', label: 'Science' },
  { href: '/platform', label: 'Platform' },
  { href: '/pipeline', label: 'Pipeline' },
  { href: '/india', label: 'India' },
  { href: '/team', label: 'Team' },
  { href: '/partners', label: 'Partners' },
  { href: '/investors', label: 'Investors' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export const PROGRAMS = [
  { name: 'β-Thalassemia', gene: 'HBB', area: 'Hematology · India-priority', goal: 'Design suppressor-tRNA candidates for selected HBB nonsense-mutation contexts and restore β-globin production.', stage: 'Program definition', next: 'Candidate design and in-vitro assay specification', accent: 'var(--cyan)' },
  { name: 'Duchenne muscular dystrophy', gene: 'DMD', area: 'Neuromuscular', goal: 'Design suppressor-tRNA candidates for selected DMD premature-stop contexts and restore full-length dystrophin.', stage: 'Program definition', next: 'Candidate design and reporter-assay specification', accent: 'var(--magenta)' },
  { name: 'p53-deficient cancer', gene: 'TP53', area: 'Oncology', goal: 'Explore suppressor-tRNA strategies for selected TP53 nonsense mutations with the aim of restoring full-length p53 protein and tumour-suppressor function.', stage: 'Program definition', next: 'Mutation prioritisation and disease-relevant functional-assay planning', accent: 'var(--violet)' },
];

export const REACH = [
  { area: 'Neuromuscular', ex: 'DMD and selected inherited muscular dystrophies', c: 'var(--magenta)' },
  { area: 'Hematology', ex: 'HBB and selected clotting-factor nonsense variants', c: 'var(--cyan)' },
  { area: 'Oncology', ex: 'Selected tumour-suppressor nonsense mutations, including TP53', c: 'var(--violet)' },
  { area: 'Metabolic / enzyme', ex: 'Selected loss-of-function enzyme disorders', c: 'var(--forest)' },
  { area: 'Ophthalmology', ex: 'Selected inherited retinal disease contexts', c: 'var(--ochre)' },
  { area: 'Additional research contexts', ex: 'Evaluated after sequence, delivery and safety review', c: 'var(--magenta)' },
];

export const TEAM = {
  lead: {
    name: 'Dr. Nikhil Bharti',
    role: 'Scientific Co-Founder & Director · CSO / CTO',
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

export const PUBS = [
  { year: '2024', venue: 'Nature Communications', title: 'Translation velocity and suppressor-tRNA efficacy', topic: 'First-author research on translation dynamics and suppressor-tRNA performance. Full bibliographic details are being cross-checked before final publication.', role: 'First author', doi: null as string | null, pubmed: 'https://pubmed.ncbi.nlm.nih.gov/?term=Nikhil+Bharti%5BAuthor%5D', c: 'var(--magenta)' },
  { year: '2023', venue: 'Nature', title: 'Engineered tRNAs suppress nonsense mutations in cells and in vivo', topic: 'Peer-reviewed study of engineered suppressor tRNAs in cellular and in-vivo models.', role: 'Co-author', doi: 'https://doi.org/10.1038/s41586-023-06133-1', pubmed: 'https://pubmed.ncbi.nlm.nih.gov/37258671/', c: 'var(--violet)' },
  { year: '2023', venue: 'Journal of Biological Chemistry', title: 'tRNA biology and translation regulation', topic: 'Co-authored work in tRNA biology and translational regulation. Full bibliographic details are being cross-checked before final publication.', role: 'Co-author', doi: null as string | null, pubmed: 'https://pubmed.ncbi.nlm.nih.gov/?term=Nikhil+Bharti%5BAuthor%5D', c: 'var(--cyan)' },
];

export const ROLES = [
  { code: 'Engine 01 — Founding ML Engineer', title: 'Founding ML Engineer', tag: 'Build the model that learns to read through silence.', accent: 'cyan', chips: ['Noida / Remote', 'Full-time', 'Paid trial task', 'Founding equity'], own: ['The ML backbone of Engine 01 — readthrough-efficiency prediction in sequence context', 'The active-learning loop that turns each wet-lab round into a better model', 'Scoring and Pareto-ranking that decide which candidate sequences reach the bench'], warnLabel: 'You will not enjoy this role if', warn: 'you need a settled codebase, clean labelled data, and someone else to define the problem. Here you define it.', jd: null as string | null },
  { code: 'Corpus 01 — TB-INT-2026-01', title: 'Research & Data Curation Intern', tag: 'Build the corpus that teaches Engine 01 to read biology.', accent: 'forest', chips: ['Noida / Hybrid', '6 months', 'Paid trial task', 'PPO pathway'], own: ['tRNA databases, nonsense-mutation records and readthrough literature — made machine-readable', 'The curation standards the whole platform’s data quality rests on', 'Turning messy primary literature into structured, defensible datasets'], warnLabel: 'You will not enjoy this role if', warn: 'you need someone to tell you which paper matters, or you cannot defend a data point when challenged.', stipend: '₹20,000/mo → ₹25,000/mo post-review · paid trial task ₹1,500', jd: null as string | null },
  { code: 'Ledger 02 — TB-INT-2026-02', title: 'Operations & Accounts Intern', tag: 'Science needs a spine. Books, POs, GST, compliance — yours.', accent: 'ochre', chips: ['Noida / On-site', '6 months', 'Paid trial task', 'PPO pathway'], own: ['Bookkeeping, purchase orders, GST and ROC filings', 'The operational systems a small founding team runs on', 'Vendor coordination and compliance calendars'], warnLabel: 'You will be good at this if', warn: 'your numbers reconcile, and you sleep better when they do.', stipend: '₹12,000/mo → ₹15,000/mo post-review · paid trial task ₹750', jd: null as string | null },
  { code: 'Signal 03 — Social Media Intern', title: 'Social Media Intern', tag: 'Make hard science legible without making it wrong.', accent: 'magenta', chips: ['Noida / Hybrid', '6 months', 'Paid trial task', 'PPO pathway'], own: ['The tRNA Chronicles series and explainer assets', 'Channel growth and voice — accurate, confident, never clickbait', 'Working directly with Pragati Bhaisora on outreach and awareness'], warnLabel: 'You will not enjoy this role if', warn: 'you would cut a scientific corner for engagement.', jd: null as string | null },
];

export const FAQ = [
  { q: 'What is KritRNA?', a: 'KritRNA is the operating brand of Transloka Bio Pvt. Ltd. The name combines “Krit”—creation or something deliberately made—with RNA, the molecular language the company engineers. KritRNA is developing AI-guided suppressor-tRNA therapeutics and translation-system models.' },
  { q: 'What is a premature termination codon or nonsense mutation?', a: 'A nonsense mutation changes a protein-coding sequence into an early stop codon — UAA, UAG or UGA in mRNA. Translation can terminate before the full protein has been produced.' },
  { q: 'How does a suppressor tRNA work?', a: 'A suppressor tRNA is designed to recognise a selected stop codon and deliver an amino acid during translation, allowing the ribosome to continue toward a full-length protein.' },
  { q: 'Which diseases is KritRNA initially focusing on?', a: 'The initial research focus is selected nonsense-mutation contexts in HBB for β-thalassemia, DMD for Duchenne muscular dystrophy and TP53 for p53-deficient cancer.' },
  { q: 'What stage is the company at?', a: 'KritRNA is at an early preclinical research stage. The next major gate is experimental validation through appropriate wet-lab and CRO collaborations.' },
  { q: 'Is KritRNA’s technology clinically proven?', a: 'No KritRNA candidate is clinically validated or approved. The suppressor-tRNA modality has, however, shown promise in peer-reviewed cellular and in-vivo research.' },
  { q: 'Where is KritRNA based?', a: 'KritRNA is the operating brand of Transloka Bio Pvt. Ltd., based in Noida, Uttar Pradesh, India.' },
  { q: 'Does this website collect patient or clinical data?', a: 'No. Do not submit medical records, genetic reports or health information through this public website.' },
  { q: 'How can I partner with or invest in KritRNA?', a: 'Email hello@hellokritrna.com or use the relevant website form.' },
  { q: 'Is KritRNA hiring?', a: 'Current opportunities are listed on the Careers page.' },
];