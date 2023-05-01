// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";
import {fill, stroke} from "./draw.ts";

export function createStar(ctx: CanvasRenderingContext2D, options: StarOptions) : StarReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.spikes  && options.spikes != 0) options.spikes = 5;
    if(!options.outerRadius  && options.outerRadius != 0) options.outerRadius = 30;
    if(!options.innerRadius  && options.innerRadius != 0) options.innerRadius = 15;
    if(!options.lineWidth  && options.lineWidth != 0) options.lineWidth = 1;
    if(!options.color) options.color = "black";

    return ({x:options.x, y:options.y, spikes:options.spikes, outerRadius:options.outerRadius, innerRadius:options.innerRadius, color:options.color, lineWidth:options.lineWidth,
        draw(_options: StarDrawOptions) : StarReturn
        {
            if(!_options) _options ={};
            if(!_options.drawType) _options.drawType = "fill";
            const x = _options.x == 0 ? 0 : _options.x || options.x as number,
            y = _options.y == 0 ? 0 :_options.y || options.y as number,
            spikes = _options.spikes || options.spikes as number,
            outerRadius = _options.outerRadius || options.outerRadius as number,
            innerRadius = _options.innerRadius || options.innerRadius as number,
            color = _options.color || options.color as string,
            lineWidth = _options.lineWidth || options.lineWidth as number,
            step = Math.PI / spikes;
            let rx = x,
            ry = y,
            rot= Math.PI / 2 * 3;
            ctx.beginPath();
            ctx.moveTo(x,y - outerRadius);
            for (let i = 0; i < spikes; i++)
            {
                rx = x + Math.cos(rot) * outerRadius;
                ry = y + Math.sin(rot) * outerRadius;
                ctx.lineTo(rx,ry);
                rot += step;
    
                rx = x + Math.cos(rot) * innerRadius;
                ry = y + Math.sin(rot) * innerRadius;
                ctx.lineTo(rx,ry);
                rot += step;
            }
            ctx.lineTo(x,y - outerRadius);
            ctx.closePath();
            ctx.lineWidth = lineWidth;
            if(_options.drawType == 'fill') fill(ctx, color);
            else if(_options.drawType == 'stroke') stroke(ctx, color);

            const draw =  this;
            return {x,y,spikes,outerRadius,innerRadius,lineWidth,color,step, draw(options: StarDrawOptions) : StarReturn { return draw.draw(options)}}
        }
    })
}

export interface StarOptions{
    x?:number,
    y?:number,
    color?:string,
    spikes?:number,
    outerRadius?:number,
    innerRadius?:number,
    lineWidth?:number
}

export interface StarDrawOptions extends StarOptions{
    drawType?: "fill" | "stroke",
}

export interface StarReturn extends StarOptions{
    draw(options?: StarDrawOptions): this,
    step?:number
}