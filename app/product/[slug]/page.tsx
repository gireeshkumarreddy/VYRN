import {notFound} from 'next/navigation';
import {getProduct} from '@/lib/catalog';
import {ProductDetail} from '@/components/store/product-detail';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);return {title:p?.name||'Piece not found',description:p?.description}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getProduct(slug);if(!p)notFound();return <ProductDetail key={p.id} product={p}/>}
