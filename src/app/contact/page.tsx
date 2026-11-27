import { Intro } from "@/components/Editorial";
import PartnerForm from "@/components/PartnerForm";
export const metadata = {
  title: "Contact KritRNA",
  description: "Get in touch with Transloka Bio in Noida, India.",
  alternates: { canonical: "/contact" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Contact KritRNA"}>
        Get in touch with Transloka Bio in Noida, India.
      </Intro>
      <div className="body">
        <p>
          For general enquiries, email{" "}
          <a href="mailto:hello@hellokritrna.com">hello@hellokritrna.com</a>.
          For partnerships, contact{" "}
          <a href="mailto:pragati@hellokritrna.com">Pragati Bhaisora</a>.
        </p>
        <p>
          Please leave out medical records and personal genetic information.
        </p>
        <PartnerForm />
      </div>
    </>
  );
}
