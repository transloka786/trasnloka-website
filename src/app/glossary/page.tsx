import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Scientific glossary",
  description: "Short definitions for the language used in our research.",
  alternates: { canonical: "/glossary" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Scientific glossary"}>
        Short definitions for the language used in our research.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Messenger RNA</h2>
          <div>
            <p>
              The working copy of genetic instructions that a ribosome reads.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Ribosome</h2>
          <div>
            <p>The cellular machinery that joins amino acids into a protein.</p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Transfer RNA</h2>
          <div>
            <p>An RNA molecule that carries an amino acid to the ribosome.</p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Premature stop</h2>
          <div>
            <p>
              A stop signal that occurs before the usual end of the protein.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Readthrough</h2>
          <div>
            <p>Continuation of translation past a stop signal.</p>
          </div>
        </article>
        <a href="/references">Sources for these definitions</a>
      </div>
    </>
  );
}
