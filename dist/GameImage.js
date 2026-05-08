/**
 * This class stores an image for a GameObject.
 * It lets the Model avoid using HTMLImageElement directly.
 */
class GameImage {
    _img;
    _filename;
    _model;
    /**
     * Creates a GameImage connected to a GameObject.
     * Pre: filename should be a valid image path.
     * Post: The image starts loading and follows the model's position.
     * @param filename The image file path
     * @param model The model that this image follows
     */
    constructor(filename, model) {
        this._filename = filename;
        this._model = model;
        this._img = new Image();
        this._img.src = filename;
    }
    /** The GameImage's x-coordinate */
    get x() { return this._model.x; }
    /** The GameImage's y-coordinate */
    get y() { return this._model.y; }
    /** The GameImage's width */
    get width() { return this._model.width; }
    /** The GameImage's height */
    get height() { return this._model.height; }
    /** The GameImage's original filename */
    get filename() { return this._filename; }
    /** The GameImage's image object */
    get img() { return this._img; }
    /** True if the image has finished loading */
    get complete() { return this._img.complete; }
}
export { GameImage };
//# sourceMappingURL=GameImage.js.map