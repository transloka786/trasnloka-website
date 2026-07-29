import type { Metadata } from 'next';
import Link from 'next/link';

// Supplementary route only: all original website pages remain unchanged.
export const metadata: Metadata = {
  title: 'Evidence',
  description: 'A supplementary evidence map for KritRNA scientific claims, programme decisions and public limitations.',
};

const evidenceAreas = [
  {
    href: '/problem',
    title: 'Disease landscape',
    text: 'The biological problem, premature-stop context, mechanism eligibility and the limits of available disease data.',
  },
  {
    href: '/science',
    title: 'Scientific mechanism',
    text: 'Suppressor-tRNA biology, charging, translation, transcript context and the experimental questions that remain open.',
  },
  {
    href: '/pipeline',
    title: 'Programme decisions',
    text: 'How HBB, DMD and TP53 are being considered, including the evidence needed before each programme advances.',
  },
  {
    href: '/explorer',
    title: 'Disease explorer',
    text: 'A structured view of disease-selection factors and unresolved evidence gaps. It supplements rather than replaces the programme narrative.',
  },
  {
    href: '/india',
    title: 'India context',
    text: 'Population evidence, ascertainment limitations, delivery considerations and why missing data must not be mistaken for missing biology.',
  },
  {
    href: '/references',
    title: 'Sources and references',
    text: 'Public sources used to support website statements, with attribution, licensing and interpretation boundaries stated where relevant.',
  },
];

export default function EvidencePage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Supplementary evidence</div>
          <h1 className="h1">The evidence behind the narrative.</h1>
          <p className="lead" style={{ marginTop: 22 }}>
            This section adds scientific context, decision logic, source boundaries and known uncertainties to the existing KritRNA website. It does not replace the original company, platform or programme content.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="eyebrow">Evidence map</div>
            <h2 className="h2">Read the claim together with its limits</h2>
            <p>
              Each linked page contains the original website narrative. The evidence layer is intended to make the reasoning more transparent without publishing candidate sequences, unfiled designs or proprietary engine internals.
            </p>
          </div>

          <div className="grid-3">
            {evidenceAreas.map((area) => (
              <Link className="card" href={area.href} key={area.href}>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
                <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
                  Open section →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ink-sec">
        <div className="wrap">
          <div className="eyebrow">Public boundary</div>
          <h2 className="h2">Transparent enough for diligence. Protected enough for invention.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Public evidence can explain why a scientific decision was made, what data support it and what experiment comes next. Candidate sequences, scaffold choices, anticodon designs, private datasets, model architecture and unpublished benchmark plans remain confidential.
          </p>
        </div>
      </section>
    </>
  );
}
