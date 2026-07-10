import { NextResponse } from 'next/server';
import { emailConfigured } from '@/lib/email';
import { supabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export function GET() {
  const chatbotConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  const contactReady = emailConfigured;

  return NextResponse.json(
    {
      ok: contactReady,
      services: {
        contactEmail: emailConfigured ? 'configured' : 'missing_configuration',
        recruitmentStorage: supabaseConfigured ? 'configured' : 'optional_not_configured',
        chatbot: chatbotConfigured ? 'configured' : 'optional_not_configured',
      },
      contactReady,
      checkedAt: new Date().toISOString(),
    },
    {
      status: contactReady ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
