import { Intro } from "@/components/Editorial";
import { questions } from "@/lib/questions";
export const metadata = {
  title: "Common questions",
  description: "Answers about the science, the company and its research stage.",
  alternates: { canonical: "/faq" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Common questions"}>
        Answers about the science, the company and its research stage.
      </Intro>
      <div className="body">
        <div className="faq">
          {questions.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <a href="/references">Scientific references</a>
      </div>
    </>
  );
}
