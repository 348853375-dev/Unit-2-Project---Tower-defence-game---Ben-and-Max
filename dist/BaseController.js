import { BaseModel } from "./BaseModel.js";
import { GameImage } from "./GameImage.js";
/**
 * The BaseController controls the base/crate in the game.
 * It connects the BaseModel to the canvas image.
 */
class BaseController {
    /** Stores the base's data */
    _baseModel;
    /** Stores the base's image */
    _gameImage;
    /**
     * Creates a BaseController.
     * Pre: width, height, and health should be greater than 0.
     * Post: A base model and image are created.
     * @param x The base's x-coordinate
     * @param y The base's y-coordinate
     * @param width The base's width
     * @param height The base's height
     * @param health The base's starting health
     * @param filename The image file used for the base
     */
    constructor(x, y, width, height, health, filename) {
        this._baseModel = new BaseModel(x, y, width, height, health);
        this._gameImage = new GameImage(filename, this._baseModel);
    }
    /**
     * Draws the base on the canvas.
     * Pre: canvas and ctx must exist.
     * Post: The base image is drawn if it has loaded.
     * @param canvas The canvas where the base is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas, ctx) {
        if (this._gameImage.complete) {
            ctx.drawImage(this._gameImage.img, this._gameImage.x, this._gameImage.y, this._gameImage.width, this._gameImage.height);
        }
    }
    /**
     * Damages the base.
     * Pre: amount should be greater than 0.
     * Post: The base's health is reduced.
     * @param amount The amount of damage
     */
    takeDamage(amount) {
        this._baseModel.takeDamage(amount);
    }
    /**
     * Checks if the base is destroyed.
     * @returns true if the base has no health left, false otherwise
     */
    isDestroyed() {
        return this._baseModel.isDestroyed();
    }
    /** The base's x-coordinate */
    get x() {
        return this._baseModel.x;
    }
    /** The base's y-coordinate */
    get y() {
        return this._baseModel.y;
    }
    /** The base's width */
    get width() {
        return this._baseModel.width;
    }
    /** The base's height */
    get height() {
        return this._baseModel.height;
    }
    /** The base's current health */
    get health() {
        return this._baseModel.health;
    }
}
export { BaseController };
//# sourceMappingURL=BaseController.js.map