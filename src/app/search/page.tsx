import { Intro } from "@/components/Editorial";
import Search from "@/components/Search";
export const metadata = {
  title: "Search KritRNA",
  description: "Find a page by subject, programme or company function.",
  alternates: { canonical: "/search" },
};
export default function Page() {
  return (
    <>
      <Intro title={"Search KritRNA"}>
        Find a page by subject, programme or company function.
      </Intro>
      <div className="body">
        <Search />
      </div>
    </>
  );
}
