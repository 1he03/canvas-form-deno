// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

export function createRect(ctx: CanvasRenderingContext2D, options: RectOptions) : RectReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.width && options.width != 0) options.width = 100;
    if(!options.height && options.height != 0) options.height = 100;
    if(!options.color) options.color = "black";

    return({x:options.x,y:options.y,width:options.width,height:options.height,color:options.color,
        draw(_options: RectDrawOptions) : RectReturn
        {
            if(!_options) _options ={};
            if(!_options.drawType) _options.drawType = "fill";
            const x= _options.x == 0 ? 0 : _options.x || options.x as number,
            y= _options.y == 0 ? 0 :_options.y || options.y as number,
            width= _options.width || options.width as number,
            height= _options.height || options.height as number,
            color= _options.color || options.color as string;
            if(_options.drawType == 'fill') {
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.fillRect(x,y,width,height);
                ctx.closePath();
            }
            else if(_options.drawType == 'stroke') {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.strokeRect(x,y,width,height);
                ctx.closePath();
            }
            const draw =  this;
            return {x,y,width,height,color, draw(options: RectDrawOptions) : RectReturn { return draw.draw(options)}}
        }
    })
}

export interface RectOptions{
    x?:number,
    y?:number,
    color?:string,
    width?:number,
    height?:number
}

export interface RectDrawOptions extends RectOptions{
    drawType?: "fill" | "stroke"
}

export interface RectReturn extends RectOptions{
    draw(options?: RectDrawOptions): this
}