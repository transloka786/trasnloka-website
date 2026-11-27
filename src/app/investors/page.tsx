import { Intro } from "@/components/Editorial";
import PartnerForm from "@/components/PartnerForm";
export const metadata = {
  title: "Investor enquiries",
  description:
    "Company material is available on request following founder review.",
  alternates: { canonical: "/investors" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Investor enquiries"}>
        Company material is available on request following founder review.
      </Intro>
      <div className="body">
        <p>
          Tell us about your organisation and your interest in Transloka Bio.
        </p>
        <PartnerForm investor />
      </div>
    </>
  );
}
