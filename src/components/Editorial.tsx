import type {ReactNode} from 'react';
export function Intro({title,children}:{title:string;children:ReactNode}){
 return <section className="page-hero"><div className="wrap"><h1 className="h1">{title}</h1><p className="lead">{children}</p></div></section>;
}
