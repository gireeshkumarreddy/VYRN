import {json,paymentReady} from '@/lib/store-server';
export function GET(){return json({paymentReady:paymentReady()})}
