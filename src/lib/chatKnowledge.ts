export type ChatSource = {
  id: string;
  title: string;
  href: string;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  route: string;
  keywords: string[];
  content: string;
  sources?: ChatSource[];
};

export const CHAT_SOURCES: Record<string, ChatSource> = {
  science: { id: 'science', title: 'KritRNA science', href: '/science' },
  platform: { id: 'platform', title: 'KritRNA platform', href: '/platform' },
  smallWorld: { id: 'small