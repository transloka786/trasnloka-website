import { NextResponse } from 'next/server';
export async function GET(req:Request){const token=new URL(req.url).searchParams.get('token');if(!token)return NextResponse.redirect(new URL('/updates?subscription=invalid',req.url));return NextResponse.redirect(new URL('/updates?subscription=confirmed',req.url))}
