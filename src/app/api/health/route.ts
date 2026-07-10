import { NextResponse } from 'next/server';
import { emailConfigured } from '@/lib/email';
import { supabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export function GET() {
  const chatbotConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());

  return NextResponse.json(
    {
      ok: true,
      productionReady: emailConfigured,
      services: {
        generalContact: emailConfigured ? 'configured' : 'not_configured_yet',
        careersContact: emailConfigured ? 'configured' : 'not_configured_yet',
        recruitmentStorage: supabaseConfigured ? 'configured' : 'optional_not_configured',
        chatbot: chatbotConfigured ? 'configured' : 'optional_not_configured',
      },
      expectedRecipients: {
        general: 'hello@hellokritrna.com',
        careers: 'careers@hellokritrna.com',
        adminFallback: 'hellokritrna@gmail.com',
      },
      checkedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
