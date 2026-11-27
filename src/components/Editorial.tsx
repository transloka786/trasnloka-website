import Link from "next/link";
import type { ReactNode } from "react";
import { programmes, people } from "@/lib/editorial";

export function Intro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="intro">
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}
export function Programmes() {
  return (
    <div className="programme-list">
      {programmes.map((p, i) => (
        <article key={p.gene}>
          <span className="index">{String(i + 1).padStart(2, "0")}</span>
          <h3>{p.gene}</h3>
          <div>
            <h4>{p.condition}</h4>
            <p>{p.goal}</p>
            <dl>
              <dt>Milestone</dt>
              <dd>Programme definition</dd>
              <dt>Next step</dt>
              <dd>{p.next}</dd>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
export function People() {
  return (
    <div>
      {people.map((p) => (
        <article key={p.name} className="person">
          <h3>{p.name}</h3>
          <div>
            <strong>{p.role}</strong>
            <p>{p.bio}</p>
          </div>
        </article>
      ))}
      <p className="small">
        The University of Hamburg was a previous academic affiliation. It does
        not endorse KritRNA. Transloka Bio claims no ownership of university
        intellectual property.
      </p>
    </div>
  );
}
export function Reference({
  id,
  label = "Scientific reference",
}: {
  id: string;
  label?: string;
}) {
  return (
    <Link className="reference" href={"/references#" + id}>
      {label}
    </Link>
  );
}
