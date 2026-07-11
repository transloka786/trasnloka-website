import type { Metadata } from 'next';
import PartnerForm from '@/components/PartnerForm';

export const metadata: Metadata = {
  title: 'Community Collaboration',
  description: 'Ethical collaboration pathway for rare-disease organisations, advocates and community educators.',
};

const BOUNDARIES = [
  ['What collaboration can include', 'Accessible explainers, awareness campaigns, listening sessions, public-science feedback, terminology review and introductions to verified ecosystem stakeholders.'],
  ['What this route is not', 'It is not patient recruitment, diagnosis, treatment access, trial enrolment, genetic-report review or a promise of therapeutic benefit.'],
  ['Data boundary', 'Do not send names, medical records, genetic reports, prescriptions, images or other health information through the public website.'],
  ['Representation', 'Patient organisations remain independent. A conversation or event does not become a formal endorsement or partnership unless both sides approve that status.'],
];

export default function CommunityPage() {
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Rare-disease communities</div><h1 className="h1">Listen first.<br/><em>Communicate without exploitation.</em></h1><p className="lead">Pragati Bhaisora leads KritRNA’s outreach and awareness strategy. Community work is intended to improve understanding and trust while preserving the boundary between education, research and clinical care.</p></div></section><section><div className="wrap"><div className="grid cols-2">{BOUNDARIES.map(([title,text])=><article className="cell" key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></div></section><section className="ink-sec"><div className="wrap split-2 partner-layout"><div><div className="eyebrow">Collaboration enquiry</div><h2 className="h2">Tell us about your organisation and the public need you are addressing.</h2><p className="lead">The form requests organisational context only. Do not include individual patient stories with identifying or medical information.</p></div><PartnerForm preset="Patient organisation" /></div></section></>;
}
