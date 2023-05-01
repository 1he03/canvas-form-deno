// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

export function createText(ctx: CanvasRenderingContext2D, options: TextOptions) : TextReturn
{
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.fontFamily) options.fontFamily = "Arial";
    if(!options.text) options.text = "";
    if(!options.textAlign) options.textAlign = "left";
    if(!options.width) options.width = 0;
    if(!options.color) options.color = "black";
    if(!options.size && options.size != 0) options.size = 50;

    return({x:options.x, y:options.y, size:options.size, text:options.text, width:options.width, color:options.color, fontFamily:options.fontFamily, textAlign:options.textAlign, 
        draw(_options: TextDrawOptions) : TextReturn
        {
            if(!_options) _options ={};
            if(!_options.drawType) _options.drawType = "fill";
            const x = _options.x == 0 ? 0 : _options.x || options.x as number,
            y = _options.y == 0 ? 0 : _options.y || options.y as number,
            size = _options.size || options.size as number,
            fontFamily = _options.fontFamily || options.fontFamily as string,
            textAlign = _options.textAlign || options.textAlign as "left" | "center" | "right", 
            text = _options.text || options.text as string,
            color = _options.color || options.color as string,
            width = _options.width || options.width as number,
            isWidth = width > 0 ? true : false;
            if(_options.drawType == 'fill') {
                ctx.beginPath();
                ctx.save();
                ctx.font = `${size}px ${fontFamily}`;
                ctx.textAlign =textAlign;
                ctx.fillStyle = color;
                const maxWidth = width / ( size * text.length / 1.667);
                ctx.scale(maxWidth <= 0 ? 1 : maxWidth > 1 ? 1 : maxWidth, 1);
                if(isWidth) ctx.fillText(text,x,y,width);
                else ctx.fillText(text,x,y);
                ctx.restore();
                ctx.closePath();
            }
            else if(_options.drawType == 'stroke') {
                ctx.beginPath();
                ctx.save();
                ctx.font = `${size}px ${fontFamily}`;
                ctx.textAlign =textAlign;
                ctx.strokeStyle = color;
                const maxWidth = width / ( size * text.length / 1.667);
                ctx.scale(maxWidth <= 0 ? 1 : maxWidth > 1 ? 1 : maxWidth, 1);
                if(isWidth) ctx.strokeText(text, x, y ,width);
                else ctx.strokeText(text, x, y);
                ctx.restore();
                ctx.closePath();
            }
            const draw =  this;
            return {x,y,size,text,width,color,fontFamily,textAlign, draw(options: TextDrawOptions) : TextReturn { return draw.draw(options)}}
        }})
}


export interface TextOptions{
    x?:number,
    y?:number,
    color?:string,
    text?:string,
    size?:number, 
    fontFamily?:string,
    textAlign?:"left" | "center" | "right", 
    width?:number
}

export interface TextDrawOptions extends TextOptions{
    drawType?: "fill" | "stroke"
}

export interface TextReturn extends TextOptions{
    draw(options?: TextDrawOptions): this
}

