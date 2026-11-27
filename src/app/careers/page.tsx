import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Careers",
  description: "Research and professional opportunities at Transloka Bio.",
  alternates: { canonical: "/careers" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Careers"}>
        Research and professional opportunities at Transloka Bio.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Research & Data Curation Intern</h2>
          <div>
            <p className="row-meta">Position filled</p>
            <a href="/careers/research-data-curation-intern">Role status</a>
          </div>
        </article>
        <p>
          For careers enquiries, email{" "}
          <a href="mailto:careers@hellokritrna.com">careers@hellokritrna.com</a>
          .
        </p>
      </div>
    </>
  );
}
