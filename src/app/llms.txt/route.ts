import { groups } from "@/lib/editorial";
import { SITE } from "@/lib/content";
export const dynamic = "force-static";
export function GET() {
  return new Response(
    "# KritRNA\n\nEarly preclinical suppressor-tRNA research in Noida, India.\n\n" +
      groups
        .flatMap((g) =>
          g.links.map(([n, p]) => "- [" + n + "](" + SITE.url + p + ")"),
        )
        .join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
