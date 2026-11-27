import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Gene explorer",
  description: "Explore the genes discussed in KritRNA’s research programmes.",
  alternates: { canonical: "/explorer" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Gene explorer"}>
        Explore the genes discussed in KritRNA’s research programmes.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>HBB</h2>
          <div>
            <p>
              HBB encodes the beta subunit of haemoglobin.{" "}
              <a href="/references#hbb">NCBI gene record</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>DMD</h2>
          <div>
            <p>
              DMD encodes dystrophin, a protein important in muscle.{" "}
              <a href="/references#dmd">NCBI gene record</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>TP53</h2>
          <div>
            <p>
              TP53 encodes p53, a protein involved in regulating cell growth.{" "}
              <a href="/references#tp53">NCBI gene record</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
