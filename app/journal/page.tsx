import {stories} from '@/lib/editorial';
import {Go} from '@/components/store/provider';
import {SourceImage} from '@/components/store/image';
export const metadata={title:'Journal'};
export default function Journal(){return <main id="main" className="page-shell"><div className="page-intro"><div><p className="eyebrow">NOTES FROM THE STUDIO</p><h1 className="page-title">Journal.</h1></div><p>Ideas, perspectives and the thinking<br/>behind the clothes.</p></div><div className="journal-grid">{stories.map(s=><Go key={s.slug} href={`/journal/${s.slug}`} className="journal-card reveal"><SourceImage crop={s.crop} alt={s.title}/><span className="mono">{s.tag}</span><h2>{s.title}</h2><p className="muted">{s.intro}</p><span className="underlink">Read the story</span></Go>)}</div></main>}
