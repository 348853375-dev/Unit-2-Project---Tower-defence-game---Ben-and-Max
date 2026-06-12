interface Drawable {

/**

* Use to draw a GameObject on an HTMLCanvas

*/

draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) : void;

}

export { Drawable };