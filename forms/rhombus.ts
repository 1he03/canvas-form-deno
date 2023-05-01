// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";
import {RectOptions} from "./rect.ts";
import {fill, stroke} from "./draw.ts";

export function createRhombus(ctx: CanvasRenderingContext2D, options: RhombusOptions) : RhombusReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.width && options.width != 0) options.width = 100;
    if(!options.height && options.height != 0) options.height = 100;
    if(!options.lineWidth && options.lineWidth != 0) options.lineWidth = 1;
    if(!options.color) options.color = "black";

    return({x:options.x, y:options.y, width:options.width, height:options.height, color:options.color, lineWidth:options.lineWidth,
        draw(_options: RhombusDrawOptions) : RhombusReturn
        {
            if(!_options) _options ={};
            if(!_options.drawType) _options.drawType = "fill";
            const x = _options.x == 0 ? 0 : _options.x || options.x as number,
            y = _options.y == 0 ? 0 :_options.y || options.y as number,
            width = _options.width || options.width as number,
            height = _options.height || options.height as number,
            color = _options.color || options.color as string,
            lineWidth = _options.lineWidth || options.lineWidth as number;
            ctx.beginPath();
            ctx.moveTo(x,y-height);
            ctx.lineTo(x-width,y);
            ctx.lineTo(x,y+height);
            ctx.lineTo(x+width,y);
            ctx.closePath();
            ctx.lineWidth = lineWidth;
            if(_options.drawType == 'fill') fill(ctx, color);
            else if(_options.drawType == 'stroke') stroke(ctx, color);

            const draw =  this;
            return {x,y,width,height,lineWidth,color, draw(options: RhombusDrawOptions) : RhombusReturn { return draw.draw(options)}}
        }
    })
}

export interface RhombusOptions extends RectOptions{
    lineWidth?:number
}

export interface RhombusDrawOptions extends RhombusOptions{
    drawType?: "fill" | "stroke"
}

export interface RhombusReturn extends RhombusOptions{
    draw(options?: RhombusDrawOptions): this
}