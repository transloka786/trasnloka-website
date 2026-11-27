import { Intro } from "@/components/Editorial";
import { People } from "@/components/Editorial";
export const metadata = {
  title: "Our story",
  description:
    "KritRNA takes its name from the Sanskrit root कृ (kṛ), to make, and transfer RNA.",
  alternates: { canonical: "/about" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Our story"}>
        KritRNA takes its name from the Sanskrit root कृ (kṛ), to make, and
        transfer RNA.
      </Intro>
      <div className="body">
        <h2>Why translation?</h2>
        <p>
          We founded Transloka Bio in Noida to investigate a question in
          molecular biology. Could cells read through a premature stop and
          produce a functional protein?
        </p>
        <h2>Who we are</h2>
        <People />
        <a href="/awareness">Meet Anuvad</a>
      </div>
    </>
  );
}
