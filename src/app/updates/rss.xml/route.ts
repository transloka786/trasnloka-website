import { readUpdates } from "@/lib/updates";
import { SITE } from "@/lib/content";
export const dynamic = "force-static";
const xml = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
export function GET() {
  const items = readUpdates().map((e) => {
    const url = SITE.url + "/updates/" + e.slug;
    return (
      "<item><title>" +
      xml(e.title) +
      "</title><description>" +
      xml(e.summary) +
      "</description><link>" +
      url +
      "</link><guid>" +
      url +
      "</guid><pubDate>" +
      new Date(e.date).toUTCString() +
      "</pubDate></item>"
    );
  });
  return new Response(
    '<?xml version="1.0"?><rss version="2.0"><channel><title>KritRNA updates</title><link>' +
      SITE.url +
      "/updates</link><description>Company announcements</description>" +
      items.join("") +
      "</channel></rss>",
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
