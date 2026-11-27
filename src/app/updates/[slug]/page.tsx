import { notFound } from "next/navigation";
import { readUpdates } from "@/lib/updates";
import { Intro } from "@/components/Editorial";
type Props = { params: Promise<{ slug: string }> };
async function entry(p: Props) {
  const { slug } = await p.params;
  return readUpdates().find((e) => e.slug === slug) ?? notFound();
}
export async function generateMetadata(p: Props) {
  const e = await entry(p);
  return {
    title: e.title,
    description: e.summary,
    alternates: { canonical: "/updates/" + e.slug },
    openGraph: {
      type: "article",
      title: e.title,
      description: e.summary,
      images: [e.image || "/api/og"],
    },
  };
}
export default async function UpdatePage(p: Props) {
  const e = await entry(p);
  return (
    <>
      <Intro title={e.title}>{e.summary}</Intro>
      <article className="wrap prose update-content">
        <time>{e.date}</time>
        <p>{e.tag}</p>
        {e.image && <img src={e.image} alt="" style={{ maxWidth: "100%" }} />}
        {e.body
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        {e.link && <a href={e.link}>Further reading</a>}
      </article>
    </>
  );
}
