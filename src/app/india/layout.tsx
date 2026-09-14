import type {ReactNode} from 'react';
import {pageMetadata} from '@/lib/seo';
import PageIdentity from '@/components/PageIdentity';
export const metadata=pageMetadata('/india');
export default function Layout({children}:{children:ReactNode}){return <><PageIdentity path="/india"/>{children}</>;}
