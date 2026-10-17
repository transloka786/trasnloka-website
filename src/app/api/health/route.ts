import { NextResponse } from 'next/server';
import { emailConfigured, missingEmailVariables } from '@/lib/email';
import { supabaseConfigured } from '@/lib/supabase';
import { reportingConfigured } from '@/lib/reporting';
import { reportingAdmins } from '@/lib/reporting-auth';
import { KNOWLEDGE } from '@/lib/chatKnowledge';

export const dynamic = 'force-dynamic';

export function GET() {
  const chatbotKeyConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  return NextResponse.json({
    ok: true,
    productionReady: emailConfigured,
    services: {
      generalContact: emailConfigured ? 'configured' : 'not_configured',
      careersContact: emailConfigured ? 'configured' : 'not_configured',
      recruitmentStorage: supabaseConfigured ? 'configured' : 'attachment_fallback',
      newsletter: emailConfigured && reportingConfigured() ? 'configuration_present_not_connectivity_tested' : 'not_configured',
      analytics: reportingConfigured() ? 'consent_gated_configuration_present' : 'not_configured',
      websiteReporting: reportingConfigured() && reportingAdmins().length ? 'configuration_present_not_connectivity_tested' : 'not_configured',
      privacyChoices: 'enabled',
      monitoring: emailConfigured ? 'runtime_alerts_enabled' : 'not_configured',
      chatbot: 'configured_with_local_fallback',
      chatbotOpenAI: chatbotKeyConfigured ? 'configured' : 'fallback_only',
      chatbotKnowledge: KNOWLEDGE.length >= 8 ? 'curated_and_loaded' : 'incomplete',
    },
    missingConfiguration: {
      email: missingEmailVariables,
    },
    expectedRecipients: {
      general: 'hello@hellokritrna.com',
      careers: 'careers@hellokritrna.com',
      adminFallback: 'hellokritrna@gmail.com',
    },
    checkedAt: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'no-store' } });
}
