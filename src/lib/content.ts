// ─────────────────────────────────────────────────────────────
// Single source of truth for site content. Edit here to update
// the site copy in one place.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: 'KritRNA',
  legal: 'Transloka Bio Pvt. Ltd.',
  cin: 'U72100UW2026PTC252612',
  tagline: 'Reading through silence, restoring the protein.',
  email: 'hellokritrna@gmail.com',
  phone: '+91 85958 98238',
  location: 'Noida, Uttar Pradesh, India',
  url: 'https://kritrna.com',
};

export const NAV = [
  { href: '/platform', label: 'Platform' },
  { href: '/pipeline', label: 'Pipeline' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

// ── Pipeline programs (all early/discovery phase) ──
export const PROGRAMS = [
  {
    name: 'Duchenne MD',
    area: 'Neuromuscular',
    goal: 'Restore full-length dystrophin silenced by a premature stop codon.',
    accent: 'var(--magenta)',
    progress: 30,
  },
  {
    name: 'β-Thalassemia',
    area: 'Hematology · India-priority',
    goal: 'Read through nonsense mutations in β-globin (HBB) to restore synthesis.',
    accent: 'var(--cyan)',
    progress: 26,
  },
  {
    name: 'Hemophilia',
    area: 'Hematology',
    goal: 'Read through nonsense mutations in clotting-factor genes (F8 / F9).',
    accent: 'var(--forest)',
    progress: 22,
  },
  {
    name: 'TP53 nonsense cancers',
    area: 'Precision oncology',
    goal: 'Restore tumour-suppressor function in the nonsense-mutant TP53 subset.',
    accent: 'var(--violet)',
    progress: 18,
  },
];

// ── Platform reach (indication classes) ──
export const REACH = [
  { area: 'Neuromuscular', ex: 'DMD · Becker MD · select dystrophies', c: 'var(--magenta)' },
  { area: 'Hematology', ex: 'Hemophilia A/B · β-thalassemia', c: 'var(--cyan)' },
  { area: 'Pulmonary / epithelial', ex: 'Cystic fibrosis · CFTR nonsense', c: 'var(--violet)' },
  { area: 'Precision oncology', ex: 'TP53 · APC · BRCA1/2 · ATM contexts', c: 'var(--magenta)' },
  { area: 'Metabolic / enzyme', ex: 'Lysosomal storage & loss-of-function enzymes', c: 'var(--forest)' },
  { area: 'Ophthalmology', ex: 'Select inherited retinal diseases', c: 'var(--ochre)' },
];

// ── Team (public framing, per investor brief) ──
export const TEAM = {
  lead: {
    name: 'Dr. Nikhil Bharti',
    role: 'Founder & Scientific Lead',
    bio: 'Translation & tRNA biologist. Scientific strategy, platform design, and validation planning. First-author work on translation velocity and suppressor-tRNA efficacy (Nature Communications, 2024).',
    photo: '/team/nikhil.png',
  },
  outreach: {
    name: 'Pragati Bhaisora',
    role: 'Director — Outreach & Awareness Strategy',
    bio: 'Builds the patient-community and stakeholder networks that support diagnosis, validation and access. Rare-disease patients are often undiagnosed and underserved — awareness is how they are found.',
    photo: '/team/pragati.png',
  },
  build: [
    { name: 'Daniel Köster', note: 'Germany · supporting AI/ML development in a helping capacity.' },
    { name: 'Additional AI/ML developer', note: 'Currently under discussion.' },
  ],
  advisory: [
    { name: 'Sandeep M. Eswarappa', note: 'Scientific Advisor — paperwork underway.' },
    { name: 'Additional advisors', note: 'Approached; onboarding & announcements pending.' },
    { name: 'LNJP Hospital — Genetics Dept.', note: 'Approached; two clinicians expected after formal confirmation.' },
  ],
};

// ── Publications ──
export const PUBS = [
  { year: '2024', venue: 'Nature Communications', topic: 'Translation velocity & suppressor-tRNA efficacy.', role: 'First author', c: 'var(--magenta)' },
  { year: '2023', venue: 'Nature', topic: 'Engineered tRNAs.', role: 'Co-author', c: 'var(--violet)' },
  { year: '2023', venue: 'Journal of Biological Chemistry', topic: 'tRNA biology & translation regulation.', role: 'Author', c: 'var(--cyan)' },
];

// ── Careers roles ──
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
    jd: '/jd/founding-ml-engineer.pdf',
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
    jd: '/jd/research-data-curation-intern.pdf',
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
    jd: '/jd/operations-accounts-intern.pdf',
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
    jd: '/jd/social-media-intern.pdf',
  },
];

// ── FAQ (also emitted as JSON-LD for SEO) ──
export const FAQ = [
  {
    q: 'What is KritRNA?',
    a: 'KritRNA is an AI-guided suppressor-tRNA therapeutics platform built by Transloka Bio Pvt. Ltd. It engineers transfer RNAs (tRNAs) that read through premature stop codons — the errors behind nonsense-mutation genetic diseases — so the cell can finish making a full-length, functional protein.',
  },
  {
    q: 'What is a premature termination codon (nonsense mutation)?',
    a: 'A nonsense mutation creates a premature stop codon (UAA, UAG or UGA) in the middle of a gene’s message. The ribosome stops translating too early and produces a short, non-functional protein. Around 10–12% of genetic disease cases are associated with these mutations.',
  },
  {
    q: 'How does a suppressor tRNA work?',
    a: 'An engineered suppressor tRNA recognises the premature stop codon and inserts an amino acid instead of terminating translation. The ribosome reads through the stop and continues, restoring the full-length protein the mutation would otherwise have prevented.',
  },
  {
    q: 'Which diseases is KritRNA working on?',
    a: 'Four early-stage programs on one platform: Duchenne muscular dystrophy (dystrophin restoration), β-thalassemia (β-globin restoration, an India-priority indication), hemophilia (clotting-factor readthrough), and TP53 nonsense cancers (tumour-suppressor restoration). All are at discovery / early-validation stage. The platform is programmable across many nonsense-mutation indications.',
  },
  {
    q: 'What stage is the company at?',
    a: 'KritRNA is honestly positioned at TRL 2 → TRL 3. The therapeutic concept is established, the suppressor-tRNA design AI is roughly two years in development and near completion, and candidate sequences are being generated and ranked. The next critical gate is CRO / wet-lab validation of lead candidates. No candidate is in human trials.',
  },
  {
    q: 'Is KritRNA’s technology clinically proven?',
    a: 'Not yet. KritRNA is a preclinical, research-stage company. Nothing on this site should be read as a medical claim, a treatment offer, or evidence of clinical efficacy. Wet-lab readthrough validation is the next milestone.',
  },
  {
    q: 'Where is KritRNA based?',
    a: 'Transloka Bio Pvt. Ltd. is incorporated in Noida, Uttar Pradesh, India, and is recognised under DPIIT Startup India. KritRNA is an India-first platform targeting high-burden rare diseases.',
  },
  {
    q: 'How does KritRNA handle Indian patient data?',
    a: 'Any clinical or patient data is held on in-house infrastructure located in India and is never replicated to servers in other countries for foreign access. This website itself does not collect patient or clinical data — only contact and recruitment information that you choose to submit. See our Privacy & Data Residency page for detail.',
  },
  {
    q: 'How can I partner with or invest in KritRNA?',
    a: 'Reach out at hellokritrna@gmail.com. KritRNA is following a de-risked funding sequence: non-dilutive grants first, then CRO / wet-lab validation, then a priced round after experimental proof.',
  },
  {
    q: 'Is KritRNA hiring?',
    a: 'Yes. Open roles include a Founding ML Engineer and internships in Research & Data Curation, Operations & Accounts, and Social Media. All roles are degree-agnostic and include a paid trial task. See the Careers page.',
  },
];
