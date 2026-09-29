import {env} from 'cloudflare:workers';
import {Line,getProduct} from './catalog';
export const bindings=env as unknown as {DB:D1Database;STRIPE_SECRET_KEY?:string;COMMERCE_ENABLED?:string;RESEND_API_KEY?:string;ORDER_EMAIL_FROM?:string};
export function database(){if(!bindings.DB)throw Error('Store storage unavailable');return bindings.DB}
export function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{'Cache-Control':'no-store',...headers}})}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !!origin&&origin===new URL(req.url).origin}
export function sessionId(req:Request){const s=req.headers.get('cookie')?.match(/(?:^|;\s*)vyrn_cart=([a-f0-9-]{36})(?:;|$)/)?.[1];return s||null}
export function cookie(id:string,req:Request){return `vyrn_cart=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${new URL(req.url).protocol==='https:'?'; Secure':''}`}
export async function readCart(id:string):Promise<Line[]>{const row=await database().prepare('SELECT lines FROM carts WHERE id = ?').bind(id).first<{lines:string}>();if(!row)return [];const parsed=JSON.parse(row.lines);return parsed.filter((l:Line)=>getProduct(l.id))}
export function validLine(l:Line,allowZero=false){const p=getProduct(l?.id);return !!p&&p.sizes.includes(l.size)&&l.color===p.color&&Number.isInteger(l.quantity)&&l.quantity>=(allowZero?0:1)&&l.quantity<=p.stock}
export async function readBody(req:Request){const raw=await req.text();if(raw.length>12000)throw Error('Request too large');return JSON.parse(raw)}
export function paymentReady(){return bindings.COMMERCE_ENABLED==='true'&&!!bindings.STRIPE_SECRET_KEY}
