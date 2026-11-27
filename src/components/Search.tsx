"use client";
import { useState } from "react";
import Link from "next/link";
import { groups } from "@/lib/editorial";
const pages = [
  ...groups.flatMap((g) => g.links),
  ["Scientific references", "/references"],
  ["HBB, DMD and TP53", "/pipeline"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Disclaimer", "/disclaimer"],
];
export default function Search() {
  const [query, setQuery] = useState("");
  const results = pages.filter((p) =>
    p.join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <label htmlFor="site-search">Search pages</label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p aria-live="polite">{results.length} matching entries</p>
      <ul>
        {results.map(([title, url]) => (
          <li key={title}>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
