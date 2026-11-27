import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "How we work",
  description:
    "We welcome scientific enquiries about early preclinical research.",
  alternates: { canonical: "/how-we-work" },
};
export default function Page() {
  return (
    <>
      <Intro title={"How we work"}>
        We welcome scientific enquiries about early preclinical research.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Scientific questions</h2>
          <div>
            <p>
              Our public programme descriptions identify the biological question
              and the next experimental objective.{" "}
              <a href="/pipeline">Research programmes</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Working with us</h2>
          <div>
            <p>
              Write to Pragati with your area of research and the question you
              would like to discuss.{" "}
              <a href="/partners">Scientific partnerships</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
