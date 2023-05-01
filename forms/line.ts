// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";
import {stroke} from "./draw.ts";


export function createLine(ctx: CanvasRenderingContext2D, options: LineOptions) : LineReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.endX && options.endX != 0) options.endX = options.x + 50;
    if(!options.endY && options.endY != 0) options.endY = options.y + 50;
    if(!options.lineWidth && options.lineWidth != 0) options.lineWidth = 1;
    if(!options.color) options.color = "black";

    return ({x:options.x, y:options.y, endX:options.endX, endY:options.endY, lineWidth:options.lineWidth, color:options.color,
        draw(_options: LineDrawOptions) : LineReturn
        {
            if(!_options) _options ={};
            const x = _options.x == 0 ? 0 : _options.x || options.x as number,
            y = _options.y == 0 ? 0 : _options.y || options.y as number,
            endX = _options.endX || options.endX as number,
            endY = _options.endY || options.endY as number,
            lineWidth = _options.lineWidth || options.lineWidth as number,
            color = _options.color || options.color as string;
            ctx.beginPath();
            ctx.lineWidth= lineWidth;
            ctx.moveTo(x,y);
            ctx.lineTo(endX,endY);
            stroke(ctx, color);
            ctx.closePath();

            const draw =  this;
            return {x,y,endX,endY,lineWidth,color, draw(options: LineDrawOptions) : LineReturn{ return draw.draw(options)}}
        }
    })
}

export interface LineOptions {
    x?:number,
    y?:number,
    endX?:number,
    endY?:number,
    lineWidth?: number,
    color?:string
}

export interface LineDrawOptions extends LineOptions{
    drawType?: "fill" | "stroke"
}

export interface LineReturn extends LineOptions{
    draw(options?: LineDrawOptions): this
}