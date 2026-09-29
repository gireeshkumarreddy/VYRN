'use client';
import {Suspense,useEffect,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Go} from '@/components/store/provider';
export default function Order(){return <Suspense><Status/></Suspense>}
function Status(){const params=useSearchParams();const [result,setResult]=useState<{paid?:boolean;error?:string;reference?:string}>({});useEffect(()=>{const id=params.get('session_id');if(!id){setResult({error:'There is no order to verify.'});return}fetch(`/api/order?session_id=${encodeURIComponent(id)}`).then(r=>r.json() as Promise<{paid?:boolean;error?:string;reference?:string}>).then(setResult).catch(()=>setResult({error:'We could not verify this order. Please contact the studio.'}))},[params]);return <main id="main" className="page-shell confirmation"><p className="eyebrow">VYRN / ORDER STATUS</p><h1>{result.paid?'Your order is confirmed.':result.error?'Order not confirmed.':'Checking your payment…'}</h1><p>{result.paid?`Thank you. Your reference is ${result.reference}.`:result.error||'Please keep this page open while we verify your payment.'}</p><Go href="/collection" className="button">Return to the collection</Go></main>}
