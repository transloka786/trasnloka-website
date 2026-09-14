import HomeContent from '@/components/HomeContent';
import JourneyExperience from '@/components/JourneyExperience';
import PageIdentity from '@/components/PageIdentity';
import {pageMetadata} from '@/lib/seo';
export const metadata=pageMetadata('/');
export default function Home(){return <><PageIdentity path="/"/><JourneyExperience><HomeContent/></JourneyExperience></>;}
