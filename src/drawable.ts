/**
 * Interface for all GameObjects that can be drawn on the HTML Canvas.
 * Part of the Controller layer for the HTML web browser view/user interface.
 *
 * Any class that implements Drawable promises it has a draw method,
 * so the GameView can draw every object the same way without knowing
 * what type of object it is (polymorphism).
 */
interface Drawable {
    /**
     * Draws this object on the HTML canvas.
     *
     * Precondition: canvas and ctx must exist and be valid.
     * Postcondition: The object is drawn at its current position.
     *
     * @param canvas The canvas where the object is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}

export { Drawable };