import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('X-DNS-Prefetch-Control', 'on');
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/newsletter') || req.nextUrl.pathname.startsWith('/api/reporting')) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('Cache-Control', 'private, no-store');
    res.headers.set('Referrer-Policy', 'no-referrer');
  }
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  return res;
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.png).*)'] };
