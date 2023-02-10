import { CanvasRenderingContext2D } from "https://deno.land/x/canvas@v1.4.1/mod.ts";

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