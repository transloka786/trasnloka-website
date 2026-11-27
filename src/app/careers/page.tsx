import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SITE } from '@/lib/content';
export default function Careers(){return <><section style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal><div className="eyebrow" style={{ marginBottom: 22 }}>Careers at Transloka Bio</div></Reveal>
          <Reveal delay={0.05}><h1 className="h1" style={{ fontSize: 'clamp(2.2rem,5.5vw,4.2rem)' }}>Do the hardest work of your<br />career on something that <em>matters.</em></h1></Reveal>
          <Reveal delay={0.1}><p className="lead" style={{ marginTop: 24 }}>KritRNA engineers suppressor tRNAs for selected nonsense-mutation contexts. We are an early preclinical research company in Noida. We care more about what you can learn, build and own than pedigree.</p></Reveal>
          <Reveal delay={0.13}><div style={{ marginTop: 24 }}><Link className="btn btn-ghost" href="/how-we-work">How we work</Link></div></Reveal>
          <Reveal delay={0.15}><div style={{ marginTop: 26, display: 'inline-flex', gap: 10, alignItems: 'center', fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--forest)', border: '1px solid rgba(42,138,106,.4)', padding: '8px 14px', borderRadius: 2, background: 'rgba(42,138,106,.06)', flexWrap: 'wrap' }}>Careers enquiries: <a href={`mailto:${SITE.careersEmail}`} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>{SITE.careersEmail}</a></div></Reveal>
        </div>
      </section><section><div className="wrap"><article className="role-card"><h2 className="h2">Research &amp; Data Curation Intern</h2><p>Position filled</p><Link href="/careers/research-data-curation-intern">Role status</Link></article></div></section></>;}
