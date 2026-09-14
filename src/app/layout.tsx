import type {Metadata} from 'next';
import {Cormorant_Garamond,Manrope,JetBrains_Mono,Noto_Serif_Devanagari} from 'next/font/google';
import './globals.css';
import './editorial.css';
import './noir.css';
import './journey.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Experience from '@/components/Experience';
import Breadcrumbs from '@/components/Breadcrumbs';
import Analytics from '@/components/Analytics';
import {SITE,TEAM} from '@/lib/content';
import {SEO_ORIGIN,IS_PREVIEW,jsonLd} from '@/lib/seo';
const display=Cormorant_Garamond({subsets:['latin'],variable:'--font-display',weight:['400','500','600'],style:['normal','italic'],display:'swap'});
const sans=Manrope({subsets:['latin'],variable:'--font-body',display:'swap'});
const mono=JetBrains_Mono({subsets:['latin'],variable:'--font-jetbrains',display:'swap'});
const devanagari=Noto_Serif_Devanagari({subsets:['devanagari'],variable:'--font-devanagari',weight:['400','600'],display:'swap'});
// Canonicals belong to individual pages. Never make every route canonical to Home.
export const metadata:Metadata={metadataBase:new URL(SEO_ORIGIN),title:{default:'KritRNA | RNA Therapeutics Research in India',template:'%s | KritRNA'},description:'KritRNA by Transloka Bio is developing suppressor-tRNA therapeutics and computational translation research in Noida, India.',applicationName:'KritRNA',authors:[{name:SITE.legal,url:`${SEO_ORIGIN}/about`}],publisher:SITE.legal,icons:{icon:'/favicon.png'},robots:{index:!IS_PREVIEW,follow:!IS_PREVIEW},verification:{google:process.env.GOOGLE_SITE_VERIFICATION||undefined,other:process.env.BING_SITE_VERIFICATION?{'msvalidate.01':process.env.BING_SITE_VERIFICATION}:undefined}};
const graph={'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':`${SEO_ORIGIN}/#organization`,name:'KritRNA',legalName:SITE.legal,alternateName:'KritRNA by Transloka Bio',url:`${SEO_ORIGIN}/`,logo:`${SEO_ORIGIN}/logo.png`,email:SITE.email,description:'India-based biotechnology company developing suppressor-tRNA therapeutics and computational translation research.',sameAs:['https://www.linkedin.com/company/kritrna-by-transloka-bio/'],address:{'@type':'PostalAddress',addressLocality:'Noida',addressRegion:'Uttar Pradesh',addressCountry:'IN'},founder:[{'@id':`${SEO_ORIGIN}/#nikhil-bharti`},{'@id':`${SEO_ORIGIN}/#pragati-bhaisora`}]},
 {'@type':'WebSite','@id':`${SEO_ORIGIN}/#website`,url:`${SEO_ORIGIN}/`,name:'KritRNA',alternateName:'KritRNA by Transloka Bio',inLanguage:'en-IN',publisher:{'@id':`${SEO_ORIGIN}/#organization`}},
 {'@type':'Person','@id':`${SEO_ORIGIN}/#nikhil-bharti`,name:TEAM.lead.name,jobTitle:TEAM.lead.role,worksFor:{'@id':`${SEO_ORIGIN}/#organization`},url:`${SEO_ORIGIN}/team`,sameAs:['https://orcid.org/0000-0002-4068-0325','https://in.linkedin.com/in/dr-rer-nat-nikhil-bharti-0761b2195']},
 {'@type':'Person','@id':`${SEO_ORIGIN}/#pragati-bhaisora`,name:TEAM.outreach.name,jobTitle:TEAM.outreach.role,worksFor:{'@id':`${SEO_ORIGIN}/#organization`},url:`${SEO_ORIGIN}/team`}
]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN" className={`${display.variable} ${sans.variable} ${mono.variable} ${devanagari.variable}`}><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(graph)}}/></head><body><Experience><a className="skip-link" href="#main-content">Skip to main content</a><Nav/><Breadcrumbs/><main id="main-content" tabIndex={-1}>{children}</main><Footer/><Chatbot/><Analytics/></Experience></body></html>;}
