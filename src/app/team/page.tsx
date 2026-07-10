import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { TEAM, PUBS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Team',
  description: 'KritRNA’s co-founders combine translation and tRNA biology with rare-disease outreach, awareness and stakeholder engagement.',
};

export default function TeamPage() {
  return (
    <>
      <section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Team</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4rem)' }}>Scientific leadership,<br />patient-centred outreach.</h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA is led by two equal co-founders: scientific and technology development under Dr. Nikhil Bharti, and outreach, awareness and stakeholder engagement under Pragati Bhaisora.</p></Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0, borderTop: 'none' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="team-lead">
            {[TEAM.lead, TEAM.outreach].map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08}>
                <article style={{ height: '100%', border: '1px solid var(--rule)', borderRadius: 10, overflow: 'hidden', background: 'var(--paper)' }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: 'var(--ink)' }}>
                    <img src={person.photo} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 26px' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>{person.name}</h2>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--magenta)', margin: '6px 0 12px' }}>{person.role}</div>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '.96rem' }}>{person.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal><div className="sec-head"><div className="eyebrow">Scientific foundation</div><h2 className="h2">Verified peer-reviewed work</h2><p>Only publications with a confirmed title and persistent bibliographic link are displayed.</p></div></Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PUBS.map((publication, i) => (
              <Reveal key={publication.doi} delay={i * 0.05}>
                <article style={{ border: '1px solid var(--rule)', borderLeft: `3px solid ${publication.c}`, borderRadius: '0 8px 8px 0', background: 'var(--paper)', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.5rem', color: publication.c, minWidth: 70 }}>{publication.year}</div>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--ink-mute)', marginBottom: 5 }}>{publication.venue}</div>
                    <a href={publication.doi} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.08rem', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '3px' }}>{publication.title}</a>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '.92rem', marginTop: 7 }}>{publication.topic}</p>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10, fontFamily: 'var(--mono)', fontSize: '.7rem' }}>
                      <a href={publication.doi} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--magenta)' }}>DOI ↗</a>
                      <a href={publication.pubmed} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)' }}>PubMed ↗</a>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', border: '1px solid var(--rule)', padding: '5px 12px', borderRadius: 20, color: 'var(--ink-soft)' }}>{publication.role}</div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--ink-mute)' }}>This is a founder publication record. No former university or laboratory is represented as a current company affiliation or endorsement.</p></Reveal>
        </div>
      </section>
    </>
  );
}
