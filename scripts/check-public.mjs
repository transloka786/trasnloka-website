import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
const blocked =
  /founding equity|TB-INT-|Corpus 01|Engine 0[12]|Ledger 02|Signal 03|LNJP|Pareto.rank|equal co-founder|GCU AAG|\[\[TO CONFIRM|sk-proj-[a-zA-Z0-9_-]{20,}/i;
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}
for (const file of [
  ...walk(".next/server/app"),
  ...walk(".next/static"),
  ...walk("public"),
]) {
  if (!file.startsWith(".next/server/") && /\.(pdf|map)$/i.test(file))
    throw new Error("Review public asset: " + file);
  if (
    /\.(html|rsc|txt|json|js|xml|css|body)$/i.test(file) &&
    blocked.test(readFileSync(file, "utf8"))
  )
    throw new Error("Review content: " + file);
}
console.log("Public build scan passed.");
