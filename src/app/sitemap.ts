import { SITE } from "@/lib/content";
import { groups } from "@/lib/editorial";
import { readUpdates } from "@/lib/updates";
export default function sitemap() {
  return [
    ...new Set([
      "/",
      ...groups.flatMap((g) => g.links.map((l) => l[1])),
      "/careers/research-data-curation-intern",
      "/privacy",
      "/terms",
      "/disclaimer",
      "/references",
      ...readUpdates().map((e) => "/updates/" + e.slug),
    ]),
  ].map((p) => ({ url: SITE.url + p }));
}
