import "server-only";
import fs from "node:fs";
import path from "node:path";
export const tags = ["Research", "Awareness", "Company", "Hiring", "Events"];
export type Update = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  body: string;
  link?: string;
  image?: string;
};
export function readUpdates(): Update[] {
  const dir = path.join(process.cwd(), "content/updates");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name))
    .flatMap((name) => {
      const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(
        fs.readFileSync(path.join(dir, name), "utf8"),
      );
      if (!match) return [];
      const meta: Record<string, string> = {};
      for (const line of match[1].split(/\r?\n/)) {
        const k = line.indexOf(":");
        if (k > 0)
          meta[line.slice(0, k).trim()] = line
            .slice(k + 1)
            .trim()
            .replace(/^"(.*)"$/, "$1");
      }
      if (meta.approved !== "true") return [];
      const { title, date, tag, summary } = meta;
      if (
        !title ||
        !summary ||
        !tags.includes(tag) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(date))
      )
        throw new Error("Invalid approved update: " + name);
      return [
        {
          slug: name.slice(0, -3),
          title,
          date,
          tag,
          summary,
          body: match[2].trim(),
          link: /^https:\/\//.test(meta.link || "") ? meta.link : undefined,
          image: /^\/(?!\/)/.test(meta.image || "") ? meta.image : undefined,
        },
      ];
    })
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
