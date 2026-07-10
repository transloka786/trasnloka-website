import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SYSTEM = `You are the assistant on the website of KritRNA, a research-stage biotech by Transloka Bio Pvt. Ltd. (Noida, India).
KritRNA builds an AI-guided suppressor-tRNA platform that reads through premature stop codons (nonsense mutations) to restore full-length proteins.
Early-stage programs: Duchenne muscular dystrophy, β-thalassemia, hemophilia, and TP53 nonsense cancers — all at discovery/early-validation. The company is at TRL 2→3; no candidate is in human trials.
Answer questions about the science, the platform, the company, careers, and partnering.
RULES:
- Be concise, accurate, and never overstate. Never claim clinical efficacy, approvals, or that any therapy is available to patients.
- Never give medical advice or suggest KritRNA can currently treat anyone. If asked for medical advice, direct them to a qualified clinician.
- If you don't know, say so and point to hellokritrna@gmail.com.
- Stay on topics related to KritRNA. Politely decline unrelated requests.`;

export async function POST(req: Request) {
  const ip = clientIp(req);
  // Tight limits protect the OpenAI bill from abuse.
  const rl = rateLimit(`chat:${ip}`, 12, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'You are sending messages too quickly — please wait a moment.' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ reply: 'The assistant is not configured yet. Please email hellokritrna@gmail.com and we’ll get right back to you.' });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  // sanitise + cap: last 8 turns, each trimmed to 1000 chars
  const messages = incoming
    .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-8)
    .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));

  if (!messages.length || messages[messages.length - 1].role !== 'user')
    return NextResponse.json({ error: 'No question provided.' }, { status: 400 });

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [{ role: 'system', content: SYSTEM }, ...messages],
        max_tokens: 300,
        temperature: 0.4,
      }),
    });
    if (!r.ok) { console.error('openai', r.status, await r.text()); return NextResponse.json({ reply: 'Sorry — the assistant is briefly unavailable. Please email hellokritrna@gmail.com.' }); }
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.';
    return NextResponse.json({ reply });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: 'Network error reaching the assistant. Please try again shortly.' });
  }
}
