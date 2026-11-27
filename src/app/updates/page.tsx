import Link from "next/link";
import { Intro } from "@/components/Editorial";
import { UpdatesList } from "@/components/UpdatesList";
import NewsletterForm from "@/components/NewsletterForm";
import { readUpdates, tags } from "@/lib/updates";
export const metadata = {
  title: "Updates",
  description: "News from KritRNA and Anuvad.",
};
export default async function Updates({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; subscription?: string }>;
}) {
  const { tag, subscription } = await searchParams,
    entries = readUpdates();
  const selected = tags.includes(tag || "") ? tag : undefined;
  return (
    <>
      <Intro title="What we’re doing now">
        Research, awareness and company announcements from KritRNA.
      </Intro>
      <div className="body">
        {subscription && (
          <p role="status">
            {subscription === "confirmed"
              ? "Your subscription is confirmed."
              : "This confirmation link could not be used. Please subscribe again."}
          </p>
        )}
        {entries.length > 0 && (
          <>
            <p>
              Last updated <time>{entries[0].date}</time>
            </p>
            <nav aria-label="Filter announcements" className="filters">
              {["All", ...tags].map((t) => (
                <Link
                  key={t}
                  href={t === "All" ? "/updates" : "/updates?tag=" + t}
                  aria-current={(selected || "All") === t ? "page" : undefined}
                >
                  {t}
                </Link>
              ))}
            </nav>
          </>
        )}
        <UpdatesList
          entries={
            selected ? entries.filter((e) => e.tag === selected) : entries
          }
        />
        <a href="/updates/rss.xml">RSS feed</a>
        <h2>Receive updates by email</h2>
        <NewsletterForm />
      </div>
    </>
  );
}
