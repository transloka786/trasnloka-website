"use client";
import { useEffect, useRef } from "react";
import { educationNote } from "@/lib/editorial";

export default function Fold() {
  const figure = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const paint = () => {
      const p = reduced.matches
        ? 0
        : Math.min(
            1,
            Math.max(
              0,
              -el.getBoundingClientRect().top / (el.offsetHeight * 0.65),
            ),
          );
      el.style.setProperty("--fold", String(p));
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    reduced.addEventListener("change", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      reduced.removeEventListener("change", paint);
    };
  }, []);
  return (
    <figure ref={figure} className="fold">
      <svg
        viewBox="0 0 400 395"
        role="img"
        aria-label="Educational cloverleaf schematic of transfer RNA"
      >
        <g className="register" fill="none" stroke="currentColor">
          <path d="M22 45V23H45 M355 23h23v22 M22 349v23h23 M355 372h23v-23" />
          <path strokeDasharray="2 7" d="M200 30v332 M29 198h342" />
          <circle cx="200" cy="198" r="132" strokeDasharray="2 9" />
        </g>
        <g
          className="fold-strand"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="rotate(17 200 198)"
        >
          <path
            stroke="currentColor"
            strokeWidth="8"
            d="M187 60v81q0 20-20 28l-28 11-14-13c-21-24-59-12-60 17-2 30 32 46 58 28l17-12 28 6q18 5 18 21v41l-11 13c-17 22-3 51 24 51s42-30 24-52l-9-11v-46q0-14 18-20l23-8 18 9c25 11 53-7 49-34-5-29-38-37-58-18l-16 15-23-7q-17-6-17-23V46"
          />
          <path
            stroke="#e91e63"
            strokeWidth="4"
            d="M189 78h18m-18 12h18m-18 12h18m-18 12h18m-18 12h18m-17 111h20m-20 11h20m-20 11h20"
          />
        </g>
      </svg>
      <img
        className="fold-mark"
        src="/kritrna-mark.png"
        alt=""
        width="140"
        height="166"
      />
      <figcaption>
        Transfer RNA <span>{educationNote}</span>
      </figcaption>
    </figure>
  );
}
