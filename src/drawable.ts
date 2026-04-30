/**

* Interface for all GameObjects that can be drawn on the HTML Canvas.

* Part of the Controller for the HTML web browser view/user interface.

*/

interface Drawable {

/**

* Use to draw a GameObject on an HTMLCanvas

*/

draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) : void;

}

export { Drawable };