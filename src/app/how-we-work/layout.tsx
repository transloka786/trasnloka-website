import type {ReactNode} from 'react';
import {pageMetadata} from '@/lib/seo';
import PageIdentity from '@/components/PageIdentity';
export const metadata=pageMetadata('/how-we-work');
export default function Layout({children}:{children:ReactNode}){return <><PageIdentity path="/how-we-work"/>{children}</>;}
