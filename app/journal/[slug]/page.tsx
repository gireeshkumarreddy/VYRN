import {notFound} from 'next/navigation';
import {stories} from '@/lib/editorial';
import {SourceImage} from '@/components/store/image';
import {Go} from '@/components/store/provider';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return {title:stories.find(s=>s.slug===slug)?.title||'Journal'}}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const s=stories.find(a=>a.slug===slug);if(!s)notFound();return <main id="main" className="page-shell"><p className="eyebrow">{s.tag}</p><h1 className="page-title">{s.title}</h1><div className="article-image"><SourceImage crop={s.crop} alt={s.title}/></div><article className="info-layout"><h2>{s.intro}</h2>{s.body.map(p=><p key={p}>{p}</p>)}<Go href="/journal" className="underlink">All studio notes</Go></article></main>}
