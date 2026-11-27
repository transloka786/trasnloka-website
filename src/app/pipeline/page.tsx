import { Intro } from "@/components/Editorial";
import { Programmes, Reference } from "@/components/Editorial";
export const metadata = {
  title: "Research programmes",
  description:
    "HBB leads our early preclinical research, followed by DMD and TP53.",
  alternates: { canonical: "/pipeline" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Research programmes"}>
        HBB leads our early preclinical research, followed by DMD and TP53.
      </Intro>
      <div className="body">
        <Programmes />
        <h2>Future research</h2>
        <p>Clotting-factor disorders are a possible future area of study.</p>
        <Reference id="hbb" label="Gene references" />
      </div>
    </>
  );
}
