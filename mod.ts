import { createCanvas } from "https://deno.land/x/canvas@v1.4.1/mod.ts";

import { createCircle, CircleOptions, CircleReturn } from "./forms/circle.ts";
import { createText, TextOptions, TextReturn } from "./forms/text.ts";
import { createRect, RectOptions, RectReturn } from "./forms/rect.ts";
import { createLine, LineOptions, LineReturn } from "./forms/line.ts";
import { createRhombus, RhombusOptions, RhombusReturn } from "./forms/rhombus.ts";
import { createStar, StarOptions, StarReturn } from "./forms/star.ts";
import { createTriangle, TriangleOptions, TriangleReturn } from "./forms/triangle.ts";
import { createImage, ImageOptions, ImageReturn } from "./forms/image.ts";

export class Forms
{
    public canvas= createCanvas(1920,1080);
    public ctx = this.canvas.getContext('2d');

    setCanvasSize(height: number, width: number)
    {
        if(height) this.canvas.height = height;
        if(width) this.canvas.width = width;
    }
    createCircle(options?: CircleOptions) : CircleReturn{
        return createCircle(this.ctx, options as CircleOptions);
    }
    createText(options?: TextOptions) : TextReturn{
        return createText(this.ctx, options as TextOptions);
    }
    createRect(options?: RectOptions) : RectReturn{
        return createRect(this.ctx, options as RectOptions);
    }
    createLine(options?: LineOptions) : LineReturn{
        return createLine(this.ctx, options as LineOptions);
    }
    createRhombus(options?: RhombusOptions) : RhombusReturn{
        return createRhombus(this.ctx, options as RhombusOptions);
    }
    createStar(options?: StarOptions) : StarReturn{
        return createStar(this.ctx, options as StarOptions);
    }
    createImage(options?: ImageOptions) : ImageReturn{
        return createImage(this.ctx, options as ImageOptions);
    }
    createTriangle(options?: TriangleOptions) : TriangleReturn{
        return createTriangle(this.ctx, options as TriangleOptions);
    }
    toSave(path: string, mimeType?: "image/jpeg" | "image/png")
    {
        Deno.writeFile(`${path}.${mimeType? mimeType.split("/")[1] : "png"}`, this.toBuffer(mimeType || "image/png"));
    }
    toBuffer(mimeType?: "image/jpeg" | "image/png") : Uint8Array
    {
        return this.canvas.toBuffer(mimeType);
    }
    addFontFamily(path: string, setName: string, options?: {style?: string, weight?: string})
    {
        if(!options) options = {};
        this.canvas.registerFont(path, {family:setName, style: options.style, weight: options.weight});
    }
}

export * from "./forms/circle.ts";
export * from "./forms/text.ts";
export * from "./forms/rect.ts";
export * from "./forms/line.ts";
export * from "./forms/rhombus.ts";
export * from "./forms/star.ts";
export * from "./forms/triangle.ts";
export * from "./forms/image.ts";