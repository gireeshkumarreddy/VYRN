import type {Crop} from './catalog';
/** Native HD assets. The small derivative is only used when the displayed size permits it. */
export const photo=(name:string,landscape=false):Crop=>({src:`hd/${name}.webp`,w:landscape?1536:1024,h:landscape?1024:1536,x:0,y:0,cw:landscape?1536:1024,ch:landscape?1024:1536});
export const categoryImages=['category-streetwear','category-formal','category-casual','category-outerwear','category-layered'];
