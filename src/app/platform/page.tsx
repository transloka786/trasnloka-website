import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "AI-guided design",
  description:
    "We are developing suppressor tRNA for nonsense-mutation diseases.",
  alternates: { canonical: "/platform" },
};
export default function Page() {
  return (
    <>
      <Intro title={"AI-guided design"}>
        We are developing suppressor tRNA for nonsense-mutation diseases.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Our research goal</h2>
          <div>
            <p>
              We aim to study whether translation can continue beyond a
              premature stop in selected disease contexts.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>What needs measuring</h2>
          <div>
            <p>
              Protein function, delivery and safety are experimental questions.
              Our programmes are at the discovery stage.{" "}
              <a href="/pipeline">Explore the programmes</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
