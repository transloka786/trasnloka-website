import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Research in India",
  description: "Transloka Bio is based in Noida, Uttar Pradesh.",
  alternates: { canonical: "/india" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Research in India"}>
        Transloka Bio is based in Noida, Uttar Pradesh.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Research focus</h2>
          <div>
            <p>
              Our lead research programme focuses on HBB and β-thalassemia.{" "}
              <a href="/pipeline">Read the programme goals</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Public information</h2>
          <div>
            <p>
              The Ministry of Health and Family Welfare publishes India’s
              rare-disease policy and official resources.{" "}
              <a href="/references#policy">Find the policy</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
