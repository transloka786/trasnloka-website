import { Intro } from "@/components/Editorial";
import PartnerForm from "@/components/PartnerForm";
export const metadata = {
  title: "Scientific partnerships",
  description: "Pragati Bhaisora leads partnership enquiries for KritRNA.",
  alternates: { canonical: "/partners" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Scientific partnerships"}>
        Pragati Bhaisora leads partnership enquiries for KritRNA.
      </Intro>
      <div className="body">
        <p>
          For scientific collaborations, write to{" "}
          <a href="mailto:pragati@hellokritrna.com">pragati@hellokritrna.com</a>
          . For general enquiries, use{" "}
          <a href="mailto:hello@hellokritrna.com">hello@hellokritrna.com</a>.
        </p>
        <PartnerForm preset="Scientific partnership" />
      </div>
    </>
  );
}
