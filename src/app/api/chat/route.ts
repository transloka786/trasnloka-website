import { clientIp, rateLimit } from "@/lib/rateLimit";
import { knowledge } from "@/lib/chatKnowledge";
export const runtime = "nodejs";
const redirect = "For that question, please contact hello@hellokritrna.com.";
const privateTopic =
  /sequenc|anticodon|construct|candidate|mutation at|variant list|model|architecture|design detail|funding|capital|equity|valuat|partner name|who.*partner|unannounced|cap table|dataset|training|scor(e|ing)|rank|internal|predict|patent|stipend|salary|investor name|my report|my child|diagnos|treat me/i;
export async function POST(req: Request) {
  const ip = clientIp(req);
  if (
    !rateLimit("chat:minute:" + ip, 10, 60000).ok ||
    !rateLimit("chat:hour:" + ip, 60, 3600000).ok
  )
    return Response.json(
      { error: "Please wait before sending another question." },
      { status: 429 },
    );
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const last = Array.isArray(body?.messages) ? body.messages.at(-1) : null;
  if (
    last?.role !== "user" ||
    typeof last.content !== "string" ||
    !last.content.trim()
  )
    return Response.json({ error: "Enter a question." }, { status: 400 });
  const q = last.content.trim().slice(0, 900);
  const reply = (answer: string, href?: string, title?: string) =>
    Response.json(
      { reply: answer, sources: href ? [{ id: href, href, title }] : [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  if (privateTopic.test(q)) return reply(redirect);
  const matches = knowledge.filter((k) => k.match.test(q));
  if (!matches.length) return reply(redirect);
  let entry = matches[0];
  const key = process.env.OPENAI_API_KEY;
  if (key && matches.length > 1) {
    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          store: false,
          max_output_tokens: 32,
          instructions:
            "Select the most relevant approved question title exactly, or return NONE for private or unsupported questions.",
          input: JSON.stringify({
            question: q,
            titles: matches.map((m) => m.title),
          }),
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) {
        const data = await response.json();
        const title = data.output_text ?? data.output?.[0]?.content?.[0]?.text;
        const selected = matches.find((m) => m.title === title?.trim());
        if (!selected) return reply(redirect);
        entry = selected;
      }
    } catch {
      /* Approved local answers remain available. */
    }
  }
  return reply(entry.answer, entry.href, entry.title);
}
