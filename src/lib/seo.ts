import type {Metadata} from 'next';
import {SITE} from './content';

export const SEO_ORIGIN=SITE.url.replace(/\/$/,'');
export const IS_PREVIEW=process.env.VERCEL_ENV==='preview';
export const SEO_PAGES:Record<string,{title:string;description:string;index?:boolean;modified?:string}>={
 '/':{title:'KritRNA | Suppressor-tRNA & RNA Therapeutics Research in India',description:'KritRNA by Transloka Bio is developing AI-guided suppressor-tRNA therapeutics in Noida, India, for selected nonsense mutations in HBB, DMD and TP53.'},
 '/rna-research-india':{title:'RNA Research in India: Translation Biology & Therapeutics',description:'Explore RNA research in India, selected academic resources, RNA therapeutic approaches and KritRNA’s focus on suppressor tRNA and translation biology.',modified:'2026-09-14'},
 '/problem':{title:'Nonsense Mutations & Premature Stop Codons',description:'Understand how nonsense mutations interrupt protein synthesis and why transcript survival, readthrough and protein function matter in RNA research.'},
 '/science':{title:'Suppressor-tRNA Science & Translation Biology',description:'How suppressor tRNAs recognise premature stop codons, support translation readthrough and raise questions of protein function, delivery and safety.'},
 '/platform':{title:'AI-Guided Suppressor-tRNA Research Platform',description:'Explore KritRNA’s developing candidate-design and translation-system engines: evidence-linked choices, biological context and experimental testing.'},
 '/small-world':{title:'Translation Systems Research & Modelling',description:'KritRNA’s developing systems perspective connects message availability, ribosome behaviour, termination and protein output to experimental questions.'},
 '/pipeline':{title:'RNA Research Programmes: HBB, DMD & TP53',description:'KritRNA’s initial suppressor-tRNA research focuses on selected HBB, DMD and TP53 nonsense mutations, with programme-specific evidence gates.'},
 '/india':{title:'India-First RNA Biotechnology',description:'How KritRNA is building suppressor-tRNA research and computational translation capability from India, with scientific collaboration and global ambition.'},
 '/evidence':{title:'Suppressor-tRNA Research Evidence',description:'Explore the published scientific background for KritRNA’s research, with clear distinctions between academic evidence and company validation.'},
 '/about':{title:'About Transloka Bio & KritRNA',description:'Meet Transloka Bio Pvt. Ltd., operating as KritRNA in Noida, India, and explore its founding story, RNA research focus and scientific purpose.'},
 '/team':{title:'KritRNA Founders & Scientific Team',description:'Meet Dr. Nikhil Bharti and Pragati Bhaisora, the founders building KritRNA’s molecular research, computational platform and rare-disease outreach.'},
 '/how-we-work':{title:'How KritRNA Conducts Research',description:'Explore KritRNA’s operating principles, evidence-led research approach and expectations for scientific collaboration and company building.'},
 '/impact':{title:'RNA Research, Rare Diseases & Impact',description:'Explore the purpose behind KritRNA’s RNA research and its focus on meaningful scientific progress for selected nonsense-mutation contexts.'},
 '/partners':{title:'RNA Research Collaboration in India',description:'Discuss scientific, CRO, disease-model, assay or delivery collaboration with KritRNA by Transloka Bio, based in Noida, India.'},
 '/community':{title:'Rare-Disease Communities & Scientific Dialogue',description:'Connect with KritRNA on rare-disease awareness, scientific communication and responsible engagement with patient communities.'},
 '/investors':{title:'RNA Biotechnology Investment & Partnerships',description:'Explore KritRNA’s suppressor-tRNA research thesis, India-originated biotechnology opportunity and evidence-led development approach.'},
 '/updates':{title:'KritRNA Research & Company Updates',description:'Read updates from KritRNA by Transloka Bio on company building, RNA science, research progress and opportunities to connect.'},
 '/careers':{title:'RNA Research, AI & Biotech Careers in India',description:'Explore open roles at KritRNA in molecular research, scientific data, AI, operations and communication. Based in Noida with role-specific work arrangements.'},
 '/resources':{title:'RNA & Rare-Disease Learning Resources',description:'Explore KritRNA’s public resources on RNA, translation, nonsense mutations and rare-disease science, with routes to further reading.'},
 '/explorer':{title:'Nonsense-Mutation Disease Explorer',description:'Explore disease areas relevant to premature stop codons and the research questions behind potential suppressor-tRNA approaches.'},
 '/glossary':{title:'RNA & Translation Biology Glossary',description:'Definitions of RNA, tRNA, codons, nonsense mutations and translation terms used throughout KritRNA’s research and educational resources.'},
 '/references':{title:'RNA Science References & Further Reading',description:'Find scientific references and further reading behind KritRNA’s educational material on RNA, translation and suppressor-tRNA research.'},
 '/faq':{title:'KritRNA & Suppressor-tRNA Research FAQ',description:'Answers about KritRNA, suppressor tRNA, nonsense mutations, research stage, initial programmes and how to contact the company.'},
 '/contact':{title:'Contact KritRNA | Transloka Bio, Noida',description:'Contact KritRNA for RNA research collaboration, investment, careers, press or scientific enquiries. Transloka Bio Pvt. Ltd., Noida, India.'},
 '/privacy':{title:'Privacy & Data Use',description:'Read how Transloka Bio Pvt. Ltd. handles information submitted through the KritRNA website.'},
 '/terms':{title:'Website Terms',description:'Terms governing use of the KritRNA website and its educational and company information.'},
 '/disclaimer':{title:'Scientific & Website Disclaimer',description:'Important information about the research-stage and educational nature of the KritRNA website.'},
 '/ask':{title:'Ask KritRNA',description:'Explore KritRNA’s educational assistant for questions about RNA, translation and the company.',index:false},
 '/search':{title:'Search the KritRNA Website',description:'Search KritRNA’s public science, company and learning resources.',index:false}
};
export function canonicalUrl(path:string):string{return path==='/'?`${SEO_ORIGIN}/`:`${SEO_ORIGIN}${path}`;}
export function pageMetadata(path:string):Metadata{
 const page=SEO_PAGES[path];if(!page)throw new Error(`Missing SEO entry: ${path}`);
 const title=path==='/'?page.title:`${page.title} | KritRNA`;
 const index=!IS_PREVIEW&&page.index!==false;
 const image=`${SEO_ORIGIN}/api/og?title=${encodeURIComponent(page.title)}&subtitle=${encodeURIComponent(page.description)}`;
 return {title:{absolute:title},description:page.description,alternates:{canonical:canonicalUrl(path)},
  openGraph:{type:'website',locale:'en_IN',url:canonicalUrl(path),siteName:'KritRNA',title,description:page.description,images:[{url:image,width:1200,height:630,alt:page.title}]},
  twitter:{card:'summary_large_image',title,description:page.description,images:[image]},
  robots:{index,follow:!IS_PREVIEW,googleBot:{index,follow:!IS_PREVIEW,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}}
 };
}
export function pageIdentity(path:string){const page=SEO_PAGES[path];return {'@context':'https://schema.org','@type':path==='/about'?'AboutPage':path==='/contact'?'ContactPage':'WebPage','@id':`${canonicalUrl(path)}#webpage`,url:canonicalUrl(path),name:page.title,description:page.description,inLanguage:'en-IN',isPartOf:{'@id':`${SEO_ORIGIN}/#website`},about:{'@id':`${SEO_ORIGIN}/#organization`}};}
export function jsonLd(value:unknown):string{return JSON.stringify(value).replace(/</g,'\\u003c');}
