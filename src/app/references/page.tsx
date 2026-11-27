import { Intro } from "@/components/Editorial";
import { sources } from "@/lib/editorial";
export const metadata = {
  title: "References",
  description:
    "Published sources for the biology, gene information and policy discussed on this site.",
  alternates: { canonical: "/references" },
};
export default function Page() {
  return (
    <>
      <Intro title={"References"}>
        Published sources for the biology, gene information and policy discussed
        on this site.
      </Intro>
      <div className="body">
        {sources.map(([id, title, venue, href]) => (
          <article className="directory-row" key={id} id={id}>
            <h2>
              <a href={href}>{title}</a>
            </h2>
            <p>{venue}</p>
          </article>
        ))}
      </div>
    </>
  );
}
