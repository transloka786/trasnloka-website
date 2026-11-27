import { Intro } from "@/components/Editorial";
import { sources } from "@/lib/editorial";
export const metadata = {
  title: "Founder publications",
  description: "Academic publications from before Transloka Bio.",
  alternates: { canonical: "/evidence" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Founder publications"}>
        Academic publications from before Transloka Bio.
      </Intro>
      <div className="body">
        <p>
          These papers are part of Dr. Nikhil Bharti’s publication record. They
          do not establish results for KritRNA. His former university does not
          endorse KritRNA or transfer ownership of university intellectual
          property.
        </p>
        {sources
          .filter((s) => ["publication", "paper"].includes(s[0]))
          .map(([id, title, venue, href]) => (
            <article className="directory-row" key={id}>
              <h2>
                <a href={href}>{title}</a>
              </h2>
              <p className="row-meta">{venue}</p>
            </article>
          ))}
      </div>
    </>
  );
}
