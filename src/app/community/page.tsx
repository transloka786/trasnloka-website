import { Intro } from "@/components/Editorial";

export const metadata = {
  title: "Community enquiries",
  description:
    "Pragati Bhaisora welcomes ideas for educational projects and rare-disease conversations.",
  alternates: { canonical: "/community" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Community enquiries"}>
        Pragati Bhaisora welcomes ideas for educational projects and
        rare-disease conversations.
      </Intro>
      <div className="body">
        <p>
          Patient organisations retain their independence. Please share your
          idea for a topic or collaboration and leave out medical records and
          personal health information.
        </p>
        <p>
          <a href="mailto:pragati@hellokritrna.com">pragati@hellokritrna.com</a>
        </p>
        <a href="/awareness">Anuvad by KritRNA</a>
      </div>
    </>
  );
}
