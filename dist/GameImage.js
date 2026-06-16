/**
 * This class stores an image for a GameObject.
 *
 * It lets the Model avoid using HTMLImageElement directly, which keeps
 * the Model separate from the browser (part of the MVC design). The
 * image always reports the position and size of the model it follows.
 */
class GameImage {
    _img;
    _filename;
    _model;
    /**
     * Creates a GameImage connected to a GameObject.
     *
     * Precondition: filename should be a valid image path.
     * Postcondition: The image starts loading and follows the model's
     * position.
     *
     * @param filename The image file path
     * @param model The model that this image follows
     */
    constructor(filename, model) {
        this._filename = filename;
        this._model = model;
        this._img = new Image();
        this._img.src = filename;
    }
    /** The GameImage's x-coordinate (follows the model) */
    get x() {
        return this._model.x;
    }
    /** The GameImage's y-coordinate (follows the model) */
    get y() {
        return this._model.y;
    }
    /** The GameImage's width (follows the model) */
    get width() {
        return this._model.width;
    }
    /** The GameImage's height (follows the model) */
    get height() {
        return this._model.height;
    }
    /** The GameImage's original filename */
    get filename() {
        return this._filename;
    }
    /** The GameImage's image object */
    get img() {
        return this._img;
    }
    /**
     * True if the image has finished loading successfully.
     *
     * A broken image (for example, a missing file) still reports
     * complete = true in the browser, but its naturalWidth is 0.
     * Checking both means broken images correctly fail this check,
     * so the game falls back to drawing a colored shape instead of
     * crashing on a broken image.
     */
    get complete() {
        return this._img.complete && this._img.naturalWidth > 0;
    }
}
export { GameImage };
//# sourceMappingURL=GameImage.js.map