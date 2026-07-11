import { NextResponse } from 'next/server';
import { updateRows } from '@/lib/supabase';

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token');
  if (!token) return NextResponse.redirect(new URL('/updates?subscription=invalid', req.url));
  try {
    await updateRows('newsletter_subscribers', `confirmation_token=eq.${encodeURIComponent(token)}`, {
      status: 'subscribed', confirmed_at: new Date().toISOString(), confirmation_token: null,
    });
    return NextResponse.redirect(new URL('/updates?subscription=confirmed', req.url));
  } catch (error) {
    console.error('newsletter confirmation', error);
    return NextResponse.redirect(new URL('/updates?subscription=error', req.url));
  }
}
