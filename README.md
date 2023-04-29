# Version 1.0.1:
```
1- Fix some mistakes
2- remove setCanvasSize
```

# Install

```typescript
import { Forms } from "https://deno.land/x/canvas_form@v1.0.1/mod.ts";
const form = new Forms(width: 1920, height: 1080);
```
# Values
Key | Type 
--- | ----
createCircle | method
createText | method
createImages | method
createLine | method
createRect | method
createRhombus | method
createStar | method
createTriangle | method
setCanvasSize | method
toBuffer | method
toSave | method
addFontFamily | method
canvas | prototype
ctx | prototype 
# Rect
```typecript
const rect = form.createRect(/* options: RectOptions */);
rect.draw({x:200, y:100, color:"blue", drawType:"stroke"})
rect.draw({x:500, y:100, height:110, width:110});
```
![Rect](https://cdn.discordapp.com/attachments/716228498825412690/987693454387707924/unknown.png)
# Circle
```typecript
const circle = form.createCircle(/* options: CircleOptions */);
circle.draw({x:200, y:100, color:"blue", drawType:"stroke"});
circle.draw({x:500, y:100, radius:60});
```
![Circle](https://cdn.discordapp.com/attachments/716228498825412690/987693492606230538/unknown.png)
# Text
```typecript
const text = form.createText(/* options: TextOptions */);
text.draw({x:200, y:100, color:"blue", drawType:"stroke", text:"Hello"});
text.draw({x:500, y:100, text:"Hi", fontFamily:"Impact", size:60, textAlign:"left", width:70});
```
![Text](https://cdn.discordapp.com/attachments/716228498825412690/987693637255176262/unknown.png)
# Line
```typecript
const line = form.createLine(/* options: LineOptions */);
line.draw({x:200, y:100, endX:450, endY:100, color:"blue", lineWidth:3});
line.draw({x:200, y:150, endX:450, endY:150, lineWidth:5});
```
![Line](https://cdn.discordapp.com/attachments/716228498825412690/987693692238327808/unknown.png)
# Rhombus
```typecript
const rhombus = form.createRhombus(/* options: RhombusOptions */);
rhombus.draw({x:200, y:200, color:"blue", drawType:"stroke"});
rhombus.draw({x:500, y:200, height:80 ,width:90});
```
![Rhombus](https://cdn.discordapp.com/attachments/716228498825412690/987693537468510218/unknown.png)
# Star
```typecript
const star = form.createStar(/* options: StarOptions */);
star.draw({x:200, y:100, color:"blue", drawType:"stroke"});
star.draw({x:500, y:100, spikes:9, innerRadius:20, outerRadius:30});
```
![Star](https://cdn.discordapp.com/attachments/716228498825412690/987693591600181309/unknown.png)
# Image
```typecript
const image = form.createImage(/* options: ImageOptions */);
image.draw({x:200, y:500, height:120, width:120, path:"https://cdn.discordapp.com/attachments/716228498825412690/987695097107873792/unknown.png"}).then(async img=>
    {
        await image.draw({x:400, y:500, isCircle:true, radius:60, path:"https://cdn.discordapp.com/attachments/716228498825412690/987695097107873792/unknown.png"});
        await img.draw({x:600, y:500, height:100, width:100, path:"https://cdn.discordapp.com/attachments/716228498825412690/987695097107873792/unknown.png"});
        await img.draw({x:800, y:500, isCircle:true, radius:50, path:"https://cdn.discordapp.com/attachments/716228498825412690/987695097107873792/unknown.png"});
    });
```
![Image](https://cdn.discordapp.com/attachments/716228498825412690/987697674469920778/unknown.png)
# Triangle
```typecript
const triangle = form.createTriangle(/* options: TriangleOptions */);
triangle.draw({x:200, y:100, color:"red"});
triangle.draw({x:300, y:100, color:"blue", drawType:"stroke"});
triangle.draw({x:400, y:100, color:"green", rotate:70});
triangle.draw({x:200, y:200, color:"yellow", sideAB: 20, sideAC: 10});
triangle.draw({x:300, y:200, color:"pink", sideBC: 50, rotate:20});
```
![Triangle](https://cdn.discordapp.com/attachments/716228498825412690/1034169227910840450/unknown.png)
# Font Family
`Warning` If you use windows os you must add font family in your windows before use `addFontFamily`
```typecript
// Add new Font Family 
form.addFontFamily(/* path: string, setName: string, options?: {style?: string, weight?: string} */) // You can add any name in setName
```
for examlpe:
```typecript
form.addFontFamily("./Halimun.ttf","Halimun");
const text = form.createText();
text.draw({x:200, y:100, text:"Hello", fontFamily:"Halimun"});
text.draw({x:500, y:100, text:"Hello", fontFamily:"Impact"});
```
![font family](https://cdn.discordapp.com/attachments/716228498825412690/1034159213125046394/unknown.png)
# Other method
```typecript
// save Image
form.toSave(path, mimeType?); // path = "save local device without .", mimeType?: "image/jpeg" | "image/png"

// convert to Buffer
form.toBuffer(mimeType?) // return Uint8Array, mimeType?: "image/jpeg" | "image/png"
```
# One example in detail
```typecript
form.createRect(/*options*/).draw({x:500, y:100, color:"red"}).draw({x:700, y:100, color:"red"}).draw({x:900, y:100, color:"red"});
```
OR
```typecript
form.createRect({y:100, color:"red"}).draw({x:500}).draw({x:700}).draw({x:900});
```
OR
```typecript
const rect = form.createRect(/*options*/);
rect.draw({x:500, y:100, color:"red"});
rect.draw({x:700, y:100, color:"red"});
rect.draw({x:900, y:100, color:"red"});
```
OR
```typecript
const rect = form.createRect({color:"red", y:100});
rect.draw({x:500});
rect.draw({x:700});
rect.draw({x:900});
```
![draws](https://cdn.discordapp.com/attachments/716228498825412690/987690247745863750/unknown.png)
# Options

## RectOptions

Key | Type | Default
--- | ---- | ----- 
x | Number | 0 
y | Number | 0 
color | String | black
drawType `draw` | String | fill
width | Number | 100
height | Number | 100

## CircleOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
drawType `draw` | String | fill
radius | Number | 50

## TextOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
drawType `draw` | String | fill
width | Number | 100
text | String | null
size | Number | 50
fontFamily | String | Arial

## LineOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
lineWidth | Number | 1
endX | Number | 50
endY | Number | 50

## RhombusOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
drawType `draw` | String | fill
width | Number | 100
height | Number | 100
lineWidth | Number | 1

## StarOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
drawType `draw` | String | fill
lineWidth | Number | 1 
spikes | Number | 5
outerRadius | Number | 30
innerRadius | Number | 15

## ImageOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
width | Number | 100
height | Number | 100
path | String | null

## TriangleOptions
Key | Type | Default
--- | ---- | ----- 
x | Number | 0
y | Number | 0
color | String | black
drawType `draw` | String | fill
sideAB?| number | 0
sideAC?| number | 0
sideBC?| number | 0
rotate?| number | 0
