import NewsletterAction from '@/components/NewsletterAction';
export const metadata={title:'Unsubscribe from KritRNA updates',robots:{index:false,follow:false},referrer:'no-referrer' as const};
export default function Page(){return <NewsletterAction action="unsubscribe"/>;}
