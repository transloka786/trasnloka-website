import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
export function middleware(req:NextRequest){
 const res=NextResponse.next();
 res.headers.set('X-Frame-Options','DENY');
 res.headers.set('X-Content-Type-Options','nosniff');
 res.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
 res.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.headers.set('X-DNS-Prefetch-Control','on');
 res.headers.set('Strict-Transport-Security','max-age=63072000; includeSubDomains; preload');
 const path=req.nextUrl.pathname;
 if(process.env.VERCEL_ENV==='preview')res.headers.set('X-Robots-Tag','noindex, nofollow');
 else if(path==='/search'||path==='/ask'||(path.startsWith('/api/')&&!path.startsWith('/api/og')))res.headers.set('X-Robots-Tag','noindex, follow');
 return res;
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.png).*)']};
