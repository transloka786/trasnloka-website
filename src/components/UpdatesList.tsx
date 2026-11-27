import Link from "next/link";
import type { Update } from "@/lib/updates";
export function UpdatesList({ entries }: { entries: Update[] }) {
  if (!entries.length) return <p>There are no announcements here yet.</p>;
  return (
    <div>
      {entries.map((e) => (
        <article className="directory-row" key={e.slug}>
          <span className="row-meta">
            <time dateTime={e.date}>{e.date}</time> / {e.tag}
          </span>
          <div>
            <h3>
              <Link href={"/updates/" + e.slug}>{e.title}</Link>
            </h3>
            <p>{e.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
