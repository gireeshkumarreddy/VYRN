import type {Metadata} from 'next';
import './globals.css';
import {StoreProvider} from '@/components/store/provider';
export const metadata:Metadata={title:{default:'VYRN — Independent expression',template:'%s | VYRN'},description:'Modern essentials. Independent expression. Explore the VYRN collection, studio and new-season stories.',icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body id="top"><noscript><style>{`.brand-opening{display:none!important}.hero,.hero *{animation:none!important}.header{opacity:1!important}`}</style></noscript><StoreProvider>{children}</StoreProvider></body></html>}
