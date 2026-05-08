import {GameObject} from "./GameObject.js";

/**
 * This class stores an image for a GameObject.
 * It lets the Model avoid using HTMLImageElement directly.
 */
class GameImage {
    private _img: HTMLImageElement;
    private _filename: string;
    private _model: GameObject;

    /**
     * Creates a GameImage connected to a GameObject.
     * Pre: filename should be a valid image path.
     * Post: The image starts loading and follows the model's position.
     * @param filename The image file path
     * @param model The model that this image follows
     */
    constructor(filename: string, model: GameObject) {
        this._filename = filename;
        this._model = model;

        this._img = new Image();
        this._img.src = filename;
    }

    /** The GameImage's x-coordinate */
    public get x(): number { return this._model.x; }

    /** The GameImage's y-coordinate */
    public get y(): number { return this._model.y; }

    /** The GameImage's width */
    public get width(): number { return this._model.width; }

    /** The GameImage's height */
    public get height(): number { return this._model.height; }

    /** The GameImage's original filename */
    public get filename(): string { return this._filename; }

    /** The GameImage's image object */
    public get img(): HTMLImageElement { return this._img; }

    /** True if the image has finished loading */
    public get complete(): boolean { return this._img.complete; }
}

export { GameImage };