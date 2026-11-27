import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Disclaimer",
  description:
    "KritRNA shares general information about early preclinical research.",
  alternates: { canonical: "/disclaimer" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Disclaimer"}>
        KritRNA shares general information about early preclinical research.
      </Intro>
      <div className="body">
        <h2>Research status</h2>
        <p>
          Programme descriptions are research goals. Website content is
          educational. For personal health questions, contact a qualified
          healthcare professional.
        </p>
        <h2>Publications and affiliations</h2>
        <p>
          Academic papers are cited as publication records. Prior institutional
          affiliations imply neither endorsement nor company ownership of
          university intellectual property.
        </p>
        <h2>Company information</h2>
        <p>
          Company information is provided for general interest. It is not
          investment advice or an offer of securities.
        </p>
      </div>
    </>
  );
}
