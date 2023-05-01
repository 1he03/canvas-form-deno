// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D, Image } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";
export function createImage(ctx: CanvasRenderingContext2D, options: ImageOptions) : ImageReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.width && options.width != 0) options.width = 100;
    if(!options.height && options.height != 0) options.height = 100;
    if(!options.path) options.path = "";
    if(!options.isCircle) options.isCircle = false;
    if(!options.radius && options.radius != 0) options.radius = 50;

    return({x: options.x, y:options.y, width:options.width, height:options.height, radius:options.radius, path:options.path, isCircle:options.isCircle,
        async draw(_options: ImageOptions) : Promise<ImageReturn>
        {
            if(!_options) _options ={};
            const radius = _options.radius || options.radius as number, 
            isCircle = _options.isCircle || options.isCircle as boolean,
            x= (isCircle ? (_options.x == 0 ? 0 : _options.x || options.x) : _options.x || options.x)  as number,
            y= (isCircle ? (_options.y == 0 ? 0 : _options.y || options.y) : _options.y || options.y)  as number,
            width= isCircle ? radius * 2 : _options.width || options.width  as number,
            height= isCircle ? radius * 2 : _options.height || options.height  as number,
            path = _options.path || options.path as string;
            if(isCircle)
            {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x+radius,y+radius,radius,0,Math.PI * 2,false);
                ctx.clip();
                ctx.strokeStyle = "rgba(0,0,0,0)";
                ctx.stroke();
                ctx.closePath();
            }
            const img = new Image(path);
            await new Promise((resolve)=>{  img.onload = ()=> resolve("Done") });
            ctx.drawImage(img,x,y,width,height);
            if(isCircle) ctx.restore();
            const draw =  this;
            return {path,x,y,radius, height, width, draw(options: ImageOptions) : Promise<ImageReturn> { return draw.draw(options)}}
        }
    })
}

export interface ImageOptions{
    path?:string,
    x?:number,
    y?:number,
    width?:number,
    height?:number, 
    radius?:number, 
    isCircle?:boolean
}


export interface ImageReturn extends ImageOptions{
    draw(options?: ImageOptions): Promise<this>
}