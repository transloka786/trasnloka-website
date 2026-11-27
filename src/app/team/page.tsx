import { Intro } from "@/components/Editorial";
import { People } from "@/components/Editorial";
export const metadata = {
  title: "The founders",
  description:
    "Scientific leadership, business development and rare-disease awareness at Transloka Bio.",
  alternates: { canonical: "/team" },
};
export default function Page() {
  return (
    <>
      <Intro title={"The founders"}>
        Scientific leadership, business development and rare-disease awareness
        at Transloka Bio.
      </Intro>
      <div className="body">
        <People />
        <h2>Advisory boards</h2>
        <p>
          We are building scientific and clinical advisory boards. Advisors are
          announced after formal appointment.
        </p>
        <a href="/evidence">Founder publications</a>
      </div>
    </>
  );
}
