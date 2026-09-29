'use client';
import {Plus} from 'lucide-react';
import {Product,money} from '@/lib/catalog';
import {Go,useShop} from './provider';
import {SourceImage} from './image';
export function ProductCard({product:p,index=0}:{product:Product;index?:number}){const shop=useShop();return <article className="product-card reveal" data-delay={index%4*70}><Go href={`/product/${p.id}`} transition className="product-picture"><span className="product-index">{String(index+1).padStart(2,'0')}</span><SourceImage crop={p.image} alt={`${p.name} in ${p.color}`}/></Go><div className="product-caption"><div><Go href={`/product/${p.id}`} transition>{p.name}</Go><p>{money(p.price)}<span className="color-dot" style={{background:p.hex}} aria-label={p.color}/></p></div><button className="circle" aria-label={`Quick add ${p.name}`} onClick={()=>shop.quick(p.id)}><Plus size={17}/></button></div></article>}
