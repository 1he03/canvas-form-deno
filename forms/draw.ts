import { CanvasRenderingContext2D } from "https://deno.land/x/skia_canvas@0.5.2/mod.ts";

export function fill(ctx: CanvasRenderingContext2D, color: string)
{
    ctx.fillStyle = color;
    ctx.fill();
}

export function stroke(ctx: CanvasRenderingContext2D, color: string)
{
    ctx.strokeStyle = color;
    ctx.stroke();
}