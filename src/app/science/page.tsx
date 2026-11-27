import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "How cells read a message",
  description:
    "Translation turns a genetic message into a chain of amino acids.",
  alternates: { canonical: "/science" },
};
export default function Page() {
  return (
    <>
      <Intro title={"How cells read a message"}>
        Translation turns a genetic message into a chain of amino acids.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>The ribosome</h2>
          <div>
            <p>
              A ribosome moves along messenger RNA and joins amino acids into a
              growing protein.{" "}
              <a href="/references#translation">MedlinePlus Genetics</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Transfer RNA</h2>
          <div>
            <p>
              A tRNA carries an amino acid to the ribosome. One part recognises
              a matching instruction on the message.{" "}
              <a href="/references#structure">Explore the textbook structure</a>
              .
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>A premature stop</h2>
          <div>
            <p>
              A change in a gene can introduce a stop signal before the protein
              is complete. <a href="/problem">Read about premature stops</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Suppressor tRNA</h2>
          <div>
            <p>
              Researchers study whether a suppressor tRNA can allow translation
              to continue at a premature stop.{" "}
              <a href="/references#paper">Published research</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
