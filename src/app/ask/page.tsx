import { Intro } from "@/components/Editorial";
import AskPageClient from "@/components/AskPageClient";
export const metadata = {
  title: "Ask KritRNA",
  description:
    "Ask about the company, its programmes or the science on this website.",
  alternates: { canonical: "/ask" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Ask KritRNA"}>
        Ask about the company, its programmes or the science on this website.
      </Intro>
      <div className="body">
        <AskPageClient />
      </div>
    </>
  );
}
