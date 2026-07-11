import { NextResponse } from 'next/server';
import { rateLimit, clientIp } from '@/lib/rateLimit';
import { retrieveKnowledge, uniqueSources, type ChatSource, type KnowledgeEntry } from '@/lib/chatKnowledge';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_INPUT_CHARS = 900;
const MAX_HISTORY = 6;
const OPENAI_URL = 'https://api.openai.com/v1/responses';

const TOPIC_HINTS = [
  'kritrna', 'transloka', 'suppressor', 'trna', 'premature stop', 'nonsense mutation', 'readthrough',
  'rare disease', 'hbb', 'thalassemia', 'dmd', 'duchenne', 'tp53', 'p53', 'cancer', 'platform',
  'small-world', 'translation', 'ribosome', 'nmd', 'career', 'job', 'invest', 'partner', 'founder',
];

const PERSONAL_MEDICAL_PATTERNS = [
  /my (mutation|diagnosis|report|symptoms?|treatment|medicine|dose|child|patient)/i,
  /should i (take|stop|start|use|try|change)/i,
  /can kritrna treat (me|my|our)/i,
  /am i eligible/i,
  /interpret (my|this) (genetic|medical|lab|diagnostic) report/i,
];

type IncomingMessage = { role: 'user' | 'assistant'; content: string };
type ResponsesPayload = { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };

function extractOutputText(data: ResponsesPayload) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  return data.output?.flatMap((item) => item.content || []).filter((part) => part.type === 'output_text' && typeof part.text === 'string').map((part) => part.text).join('\n').trim() || '';
}

function directReply(reply: string, sources: ChatSource[] = [], status = 200) {
  return NextResponse.json({ reply, sources, grounded: sources.length > 0 }, { status, headers: { 'Cache-Control': 'no-store' } });
}

function isInDomain(question: string, hasKnowledge: boolean) {
  const lower = question.toLowerCase();
  return hasKnowledge || TOPIC_HINTS.some((hint) => lower.includes(hint));
}

function localGroundedReply(entries: KnowledgeEntry[]) {
  if (!entries.length) return 'I do not have enough approved public information to answer that accurately. Please contact hello@hellokritrna.com.';
  const primary = entries[0];
  const supporting = entries.slice(1, 3).map((entry) => entry.content);
  const combined = [primary.content, ...supporting].join(' ');
  return combined.length > 900 ? `${combined.slice(0, 897)}…` : combined;
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const minuteLimit = rateLimit(`chat:minute:${ip}`, 10, 60_000);
  const hourLimit = rateLimit(`chat:hour:${ip}`, 60, 3_600_000);
  if (!minuteLimit.ok || !hourLimit.ok) {
    return NextResponse.json({ error: 'The assistant limit has been reached. Please wait before sending another question.' }, { status: 429 });
  }

  let body: { messages?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages: IncomingMessage[] = incoming
    .filter((message): message is IncomingMessage => Boolean(message && typeof message === 'object' && 'role' in message && (message.role === 'user' || message.role === 'assistant') && 'content' in message && typeof message.content === 'string'))
    .slice(-MAX_HISTORY)
    .map((message) => ({ role: message.role, content: message.content.trim().slice(0, MAX_INPUT_CHARS) }))
    .filter((message) => message.content.length > 0);

  const latest = messages.at(-1);
  if (!latest || latest.role !== 'user') return NextResponse.json({ error: 'No question provided.' }, { status: 400 });

  if (PERSONAL_MEDICAL_PATTERNS.some((pattern) => pattern.test(latest.content))) {
    return directReply('I cannot interpret personal medical or genetic information, recommend treatment or assess eligibility. KritRNA has no therapy available to patients. Please discuss personal medical questions with a qualified clinician or genetic counsellor.', [
      { id: 'science', title: 'KritRNA science', href: '/science' },
      { id: 'contact', title: 'Contact KritRNA', href: '/contact' },
    ]);
  }

  const entries = retrieveKnowledge(latest.content);
  if (!isInDomain(latest.content, entries.length > 0)) {
    return directReply('I answer questions about KritRNA, suppressor-tRNA science, the translation platform, research programmes, the company, careers and partnerships.');
  }

  const sources = uniqueSources(entries);
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return directReply(localGroundedReply(entries), sources);

  const context = entries.length ? entries.map((entry, index) => `[K${index + 1}] ${entry.title}\n${entry.content}`).join('\n\n') : '[K1] No matching approved knowledge entry.';
  const history = messages.slice(0, -1).map((message) => `${message.role.toUpperCase()}: ${message.content}`).join('\n');
  const instructions = `You are Ask KritRNA, the public-information assistant for KritRNA, the operating brand of Transloka Bio Pvt. Ltd. Answer only from APPROVED KNOWLEDGE. Do not invent company facts, disclose private information, give medical advice or claim clinical efficacy. Keep the answer under 180 words. If knowledge is insufficient, say so and direct the user to hello@hellokritrna.com.\n\nAPPROVED KNOWLEDGE:\n${context}\n\nRECENT CONVERSATION:\n${history || 'None'}\n\nUSER QUESTION:\n${latest.content}`;

  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || 'gpt-4.1-mini',
        instructions,
        input: latest.content,
        max_output_tokens: 320,
        store: false,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      console.error('OpenAI Responses API error', response.status, await response.text());
      return directReply(localGroundedReply(entries), sources);
    }

    const reply = extractOutputText(await response.json() as ResponsesPayload);
    return directReply(reply || localGroundedReply(entries), sources);
  } catch (error) {
    console.error('Chat request failed', error);
    return directReply(localGroundedReply(entries), sources);
  }
}
