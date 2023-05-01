// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

export function createTriangle(ctx: CanvasRenderingContext2D, options: TriangleOptions) : TriangleReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.sideAB) options.sideAB = 0;
    if(!options.sideAC) options.sideAC = 0;
    if(!options.sideBC) options.sideBC = 0;
    if(!options.rotate) options.rotate = 0;
    if(!options.color) options.color = "black";
    if(!options.size && options.size != 0) options.size = 50;

    return({x: options.x, y:options.y, color:options.color, sideAB: options.sideAB, sideAC: options.sideAC, sideBC: options.sideBC, rotate: options.rotate ,size: options.size,
        draw(_options: TriangleDrawOptions) : TriangleReturn
        {
            if(!_options) _options ={};
            const size  = _options.size == 0 ? 0 : _options.size || options.size as number,
            x = _options.x == 0 ? 0 : _options.x || options.x as number,
            y = _options.y == 0 ? 0 : _options.y || options.y as number,
            rotate = (_options.rotate == 0 ? 0 : _options.rotate || options.rotate == 0) as number,
            color = _options.color || options.color as string;
            let sideAB = (_options.sideAB == 0 ? 0 : _options.sideAB || options.sideAB == 0) as number,
            sideAC = (_options.sideAC == 0 ? 0 : _options.sideAC || options.sideAC == 0) as number,
            sideBC = (_options.sideBC == 0 ? 0 : _options.sideBC || options.sideBC == 0) as number;
            sideAB = sideAB / 100;
            sideAC = sideAC / 100;
            sideBC = sideBC / 200;
            const v = 
            [
                [sideAB - sideAC, - sideAB - sideAC - 1], 
                [-sideAB - sideBC - 0.6, sideAB], 
                [0.6 + sideAC + sideBC, sideAC]
            ];
            ctx.beginPath();
            ctx.save();
            ctx.translate(x,y)
            ctx.rotate(rotate * Math.PI / 180);
            ctx.scale(size, size);
            ctx.beginPath();
            ctx.moveTo(v[0][0],v[0][1]);
            ctx.lineTo(v[1][0],v[1][1]);
            ctx.lineTo(v[2][0],v[2][1]);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();

            const draw =  this;
            return {x, y, size, sideAB, sideAC, sideBC, draw(options:  TriangleDrawOptions) : TriangleReturn { return draw.draw(options)}}
        }})
}

export interface TriangleOptions{
    x?:number,
    y?:number,
    color?:string,
    sideAB?: number,
    sideAC?: number,
    sideBC?: number,
    rotate?: number,
    size?: number
}

export interface TriangleDrawOptions extends TriangleOptions{
    drawType?: "fill" | "stroke"
}

export interface TriangleReturn extends TriangleOptions{
    draw(options?: TriangleDrawOptions): this
}