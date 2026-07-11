import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'The operating principles, employment philosophy, scientific standards and inclusive culture Transloka Bio intends to build around KritRNA.',
};

const COMPANY = [
  ['Patients set the direction', 'Patient need creates urgency, but sustainable work is essential. A depleted team cannot produce trustworthy science.'],
  ['The data is the boss', 'Experiments outrank narratives. Data quality, provenance and experimental design are first-class work.'],
  ['First-principles thinking', 'We reason from molecular biology, translation mechanics and evidence rather than copying fashionable playbooks.'],
  ['Confidentiality protects the platform', 'Novel sequences, scoring logic and Engine 01 details remain controlled until the appropriate IP step is complete.'],
  ['Frugal by conviction', 'We prefer non-dilutive funding and evidence-gated spending so runway and scientific independence compound.'],
  ['Own the outcome', 'At founding stage, responsibility is measured by results rather than narrow task boundaries.'],
];

const PEOPLE = [
  ['Bounded working time', 'Roughly eight hours a day and forty hours a week is the norm. Deadline exceptions must not become the culture.'],
  ['A real right to switch off', 'Late-night and day-off replies are not expected except for a genuine operational emergency.'],
  ['Time off is part of the work', 'Leave, illness, family responsibilities and recovery are treated as normal parts of a sustainable career.'],
  ['Growth is scheduled', 'Learning, courses, conferences, books, writing and adjacent skills should receive protected time and a real budget as the company becomes able to fund them.'],
  ['Fair, explained compensation', 'Stage, role, cash constraints, ownership and risk should be discussed honestly rather than hidden behind negotiation theatre.'],
  ['No surveillance culture', 'Company systems should protect people and IP, not monitor employees for its own sake.'],
];

const HIRING = [
  ['Slope over pedigree', 'What you can learn, build and own matters more than where you studied or how polished your résumé appears.'],
  ['T-shaped curiosity', 'The hardest problems sit between machine learning and molecular biology. Curiosity across that boundary is essential.'],
  ['Intellectual honesty', '“I do not know” and “the data changed my mind” are strengths.'],
  ['Signal-dense process', 'A focused conversation, a paid work sample where appropriate and a direct discussion of mission, terms and expectations.'],
];

export default function HowWeWorkPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">How we work at Transloka Bio</div>
          <h1 className="h1">Serious science.<br /><em>A humane place to do it.</em></h1>
          <p className="lead" style={{ marginTop: 22 }}>This is the operating philosophy behind KritRNA: ambitious, evidence-led and deliberately inclusive. It explains how we intend to decide, hire, protect the science and treat the people doing the work.</p>
          <div className="callout" style={{ marginTop: 26 }}>This page states company intent and culture. Employment terms are governed by applicable law and the signed offer letter, employment agreement and approved HR policies.</div>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <div className="sec-head"><div className="eyebrow">The work</div><h2 className="h2">Frontier biology without frontier theatrics</h2><p>We are building engineered suppressor-tRNA systems for selected nonsense-mutation contexts, supported by two computational engines and an eventual wet-lab data flywheel.</p></div>
          <div className="grid cols-3">{COMPANY.map(([title, text]) => <article className="cell" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><div className="eyebrow">How we treat people</div><h2 className="h2">Ambition and sustainability are the same strategy</h2><p>High standards do not require routine exhaustion. The intended culture protects focus, dignity, health and growth.</p></div>
          <div className="grid cols-2">{PEOPLE.map(([title, text]) => <article className="cell" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap split-2">
          <div>
            <div className="eyebrow">Zero discrimination</div>
            <h2 className="h2" style={{ marginTop: 14 }}>Difference is an asset. Harassment is disqualifying.</h2>
            <p className="lead" style={{ marginTop: 18 }}>No discrimination based on race, ethnicity, national or regional origin, caste, religion or belief, gender, gender identity, sexual orientation, disability, age, language, marital status or family status. No segregation, harassment or demeaning conduct—regardless of seniority.</p>
          </div>
          <div className="form-card">
            <h3>What we ask from everyone</h3>
            <ul style={{ margin: '14px 0 0 18px' }}>
              <li>Argue ideas hard and people gently.</li>
              <li>Assume good faith until evidence says otherwise.</li>
              <li>Protect confidential science and personal privacy.</li>
              <li>Report concerns without fear of retaliation.</li>
              <li>Hold founders to the highest standard.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head"><div className="eyebrow">How we hire</div><h2 className="h2">Builders who can own a consequential result</h2></div>
          <div className="grid cols-2">{HIRING.map(([title, text]) => <article className="cell" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="callout" style={{ marginTop: 24 }}><strong>A bad fit is not someone who wants a life outside work.</strong> A bad fit is someone careless with scientific integrity, discriminatory toward colleagues, loose with confidential material or unwilling to own outcomes.</div>
        </div>
      </section>

      <section className="ink-sec center">
        <div className="wrap">
          <h2 className="h2">Read the culture before you apply.</h2>
          <p className="lead" style={{ margin: '16px auto 0' }}>The people joining now will define what Transloka Bio becomes.</p>
          <div style={{ marginTop: 26, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-solid" href="/careers" style={{ background: 'var(--cream)', color: 'var(--ink)', borderColor: 'var(--cream)' }}>View current roles</Link>
            <Link className="btn btn-ghost" href="/about" style={{ color: 'var(--cream)', borderColor: 'var(--cream)' }}>About the company</Link>
          </div>
        </div>
      </section>
    </>
  );
}
