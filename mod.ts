
import { CanvasRenderingContext2D, createCanvas, Canvas, Fonts } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

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
    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number){
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
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
    toSave(path: string, mimeType?: "jpeg" | "png" | "webp")
    {
        Deno.writeFile(`${path}.${mimeType? mimeType : "png"}`, this.toBuffer(mimeType));
    }
    toBuffer(mimeType?: "jpeg" | "png" | "webp", quality?: number) : Uint8Array
    {
        return this.canvas.encode(mimeType? mimeType : "png", quality)
    }
    addFontFamily(path: string, setName: string)
    {
        const fonts = Fonts;
        fonts.register(Deno.readFileSync(path), setName);
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
