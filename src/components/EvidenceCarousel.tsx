'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';

export type EvidenceSlide = {
  kicker: string;
  title: string;
  body: string;
  note?: string;
  href?: string;
  linkLabel?: string;
  accent?: string;
};

export default function EvidenceCarousel({
  slides,
  label = 'Evidence highlights',
}: {
  slides: EvidenceSlide[];
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className="evidence-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="evidence-carousel-index" aria-label={`Slide ${active + 1} of ${slides.length}`}>
        {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      <article
        className="evidence-slide"
        style={{ '--slide-accent': slide.accent || 'var(--magenta)' } as CSSProperties}
        aria-live="polite"
      >
        <div className="evidence-slide-kicker">{slide.kicker}</div>
        <h3>{slide.title}</h3>
        <p>{slide.body}</p>
        {slide.note ? <div className="evidence-slide-note">{slide.note}</div> : null}
        {slide.href && slide.linkLabel ? (
          slide.href.startsWith('http') ? (
            <a className="evidence-slide-link" href={slide.href} target="_blank" rel="noopener noreferrer">
              {slide.linkLabel} ↗
            </a>
          ) : (
            <Link className="evidence-slide-link" href={slide.href}>
              {slide.linkLabel} →
            </Link>
          )
        ) : null}
      </article>

      <div className="evidence-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous evidence slide">←</button>
        <div className="evidence-carousel-dots" role="tablist" aria-label="Choose evidence slide">
          {slides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === active ? 'active' : ''}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-selected={index === active}
              role="tab"
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next evidence slide">→</button>
      </div>
    </div>
  );
}
