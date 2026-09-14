import {jsonLd,pageIdentity} from '@/lib/seo';
export default function PageIdentity({path}:{path:string}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(pageIdentity(path))}}/>;}
