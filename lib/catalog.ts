import {photo} from './imagery';
export type Crop = {src:string; w:number; h:number; x:number; y:number; cw:number; ch:number};
export type Product = {id:string; name:string; price:number; category:string; type:string; color:string; hex:string; image:Crop; gallery?:Crop[]; description:string; material:string; sizes:string[]; stock:number; model3d?:string};
const crop=(x:number,y:number):Crop=>photo(['hooded-down-jacket','puffer-down-vest','puffer-down-coat','puffer-down-jacket','zip-fleece-sweater','merino-wool-cardigan','check-cotton-shirt','oversized-hoodie'][([584,818,1049,1276].indexOf(x))+(y>400?4:0)]);
const shell=photo('hoodie-in-the-night');
const details:Crop[]=[shell,{...shell,x:80,y:80,cw:864,ch:1000},photo('shell-back'),{...shell,x:180,y:370,cw:664,ch:700}];
const rows=[
 ['hooded-down-jacket','Hooded down jacket',320,'Layered','Jacket','Ecru','#ded6c9',crop(584,222),'A generous silhouette with a sculptural hood. An everyday layer, redefined.','Insulated outerwear. Final composition and care label available at launch.'],
 ['puffer-down-vest','Puffer down vest',280,'Streetwear','Bomber','Charcoal','#343535',crop(818,222),'Volume without restriction. A padded layer for a changing city.','Insulated outerwear. Final composition and care label available at launch.'],
 ['puffer-down-coat','Puffer down coat',420,'Outerwear','Jacket','Earth','#65574b',crop(1049,222),'An enveloping shape with considered proportions and a quiet presence.','Insulated outerwear. Final composition and care label available at launch.'],
 ['puffer-down-jacket','Puffer down jacket',290,'Outerwear','Jacket','Slate blue','#536d7e',crop(1276,222),'A cold-weather silhouette in a muted slate blue. Made for layering.','Insulated outerwear. Final composition and care label available at launch.'],
 ['zip-fleece-sweater','Zip fleece sweater',160,'Casual','Hoodie','Black','#151515',crop(584,526),'Clean lines, a standing collar and a relaxed silhouette. An understated daily layer.','Fleece construction. Final composition and care label available at launch.'],
 ['merino-wool-cardigan','Merino wool cardigan',180,'Formal','Knitwear','Ivory','#ece8df',crop(818,526),'Soft structure and an open neckline. A familiar essential with a new proportion.','Merino wool knit, as described in the collection reference. Care details pending.'],
 ['check-cotton-shirt','Check cotton shirt',140,'Casual','Knitwear','Tobacco check','#9c7859',crop(1049,526),'A warm check pattern, relaxed shoulders and an easy shape. Wear open or buttoned.','Cotton shirting, as described in the collection reference. Care details pending.'],
 ['oversized-hoodie','Oversized hoodie',120,'Streetwear','Hoodie','Grey marl','#92918e',crop(1276,526),'A generous hood and a clean, oversized shape. Comfort with intention.','Sweatshirt fabric. Final composition and care label available at launch.'],
 ['essential-tee','Essential tee',79,'Casual','Tops','Black','#161616',photo('essential-tee'),'A relaxed black tee that anchors your everyday wardrobe. Room to move.','Final composition and care label available at launch.'],
 ['hoodie-in-the-night','Hoodie in the night',240,'Streetwear','Jacket','Black','#121212',details[0],'A modern essential, designed for movement and expression. Functional pockets, an adjustable hood and a relaxed silhouette.','Reference specification: shell 62% cotton, 38% nylon. Water-repellent finish. Final production details to be confirmed.'],
 ['wide-leg-trousers','Wide leg trousers',170,'Formal','Trousers','Black','#171717',photo('hoodie-in-the-night'),'A wide, considered silhouette with volume through the leg. A foundation for every look.','Final composition and care label available at launch.']
] as const;
export const products:Product[]=rows.map((r)=>({id:r[0],name:r[1],price:r[2],category:r[3],type:r[4],color:r[5],hex:r[6],image:r[7],description:r[8],material:r[9],sizes:['S','M','L','XL'],stock:10,...(r[0]==='hoodie-in-the-night'?{gallery:details}:{})}));
export const categories=['Streetwear','Formal','Casual','Outerwear','Layered'];
export const categoryCopy=['Built for the everyday.','A considered silhouette.','Ease in every movement.','Made for the elements.','Depth in the details.'];
export const money=(value:number)=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
export const getProduct=(id:string)=>products.find(p=>p.id===id);
export type Line={id:string;size:string;color:string;quantity:number};
export const lineKey=(l:Line)=>`${l.id}:${l.size}:${l.color}`;
export const subtotal=(lines:Line[])=>lines.reduce((a,l)=>a+(getProduct(l.id)?.price||0)*l.quantity,0);
// Catalog values come from the supplied creative reference. Live selling remains gated until merchant review.
export const shipping={standard:8,express:15,freeAt:250};
export const offers:{code:string;percent:number;expires:string;terms:string}[]=[];
