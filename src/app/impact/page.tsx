import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "What we aim to change",
  description:
    "Our goal is to investigate a shared biological question across nonsense-mutation diseases.",
  alternates: { canonical: "/impact" },
};
export default function Page() {
  return (
    <>
      <Intro title={"What we aim to change"}>
        Our goal is to investigate a shared biological question across
        nonsense-mutation diseases.
      </Intro>
      <div className="body">
        <article className="directory-row">
          <h2>Research</h2>
          <div>
            <p>
              Can cells make a functional protein when translation would
              otherwise stop early?{" "}
              <a href="/science">Learn about the science</a>.
            </p>
          </div>
        </article>
        <article className="directory-row">
          <h2>Understanding</h2>
          <div>
            <p>
              Anuvad makes rare-disease concepts easier for families and
              communities to discuss. <a href="/awareness">Visit Anuvad</a>.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
