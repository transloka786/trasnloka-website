import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Learning resources",
  description:
    "Start with the basics of translation, then explore the biology in more detail.",
  alternates: { canonical: "/resources" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Learning resources"}>
        Start with the basics of translation, then explore the biology in more
        detail.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>For families</h2>
          <div>
            <p>
              <a href="/awareness">Anuvad by KritRNA</a> explains rare diseases
              in everyday language.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>For curious readers</h2>
          <div>
            <p>
              Explore <a href="/science">translation biology</a> and look up
              terms in the <a href="/glossary">glossary</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>For further reading</h2>
          <div>
            <p>
              Browse the <a href="/references">scientific references</a> or{" "}
              <a href="/evidence">founder publications</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
