import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "When translation stops early",
  description:
    "A premature stop can interrupt a protein while the cell is still building it.",
  alternates: { canonical: "/problem" },
};
export default function Page() {
  return (
    <>
      <Intro title={"When translation stops early"}>
        A premature stop can interrupt a protein while the cell is still
        building it.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>An early stop sign</h2>
          <div>
            <p>
              Imagine a stop sign partway along a road. The journey can end
              before its destination. A nonsense mutation can have a similar
              effect on translation.{" "}
              <a href="/references#variants">Read the source</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Why it matters</h2>
          <div>
            <p>
              A shortened protein may lose part of its function. The
              consequences depend on the gene and the change.{" "}
              <a href="/references#variants">MedlinePlus Genetics</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Our question</h2>
          <div>
            <p>
              Our goal is to investigate whether suppressor tRNA can support
              full-length protein production.{" "}
              <a href="/pipeline">Research programmes</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
