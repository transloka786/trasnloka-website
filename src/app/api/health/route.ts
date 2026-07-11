import { NextResponse } from 'next/server';
import { emailConfigured } from '@/lib/email';
import { supabaseConfigured } from '@/lib/supabase';
import { KNOWLEDGE } from '@/lib/chatKnowledge';

export const dynamic = 'force-dynamic';

export function GET() {
  const chatbotConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  const chatbotKnowledgeReady = KNOWLEDGE.length >= 8;

  return NextResponse.json(
    {
      ok: true,
      productionReady: emailConfigured,
      services: {
        generalContact: emailConfigured ? 'configured' : 'not_configured_yet',
        careersContact: emailConfigured ? 'configured' : 'not_configured_yet',
        recruitmentStorage: supabaseConfigured ? 'configured' : 'optional_not_configured',
        chatbot: chatbotConfigured ? 'configured' : 'not_configured_yet',
        chatbotKnowledge: chatbotKnowledgeReady ? 'curated_and_loaded' : 'incomplete',
        chatbotSafeguards: 'domain_restricted_moderated_rate_limited',
      },
      expectedRecipients: {
        general: 'hello@hellokritrna.com',
        careers: 'careers@hellokritrna.com',
        adminFallback: 'hellokritrna@gmail.com',
      },
      chatbot: {
        provider: 'OpenAI Responses API',
        model: process.env.OPENAI_MODEL?.trim() || 'gpt-4.1-mini',
        knowledgeEntries: KNOWLEDGE.length,
        medicalAdviceEnabled: false,
        acceptsPatientRecords: false,
      },
      checkedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
