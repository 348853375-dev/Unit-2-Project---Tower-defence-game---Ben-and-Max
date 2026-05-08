/**
 * Parent class for objects that have a position and size.
 */
class GameObject {
    _x;
    _y;
    _width;
    _height;
    /**
     * Creates a GameObject with position and size.
     * Pre: width and height should be greater than 0.
     * Post: A GameObject is created with x, y, width, and height.
     * @param x The object's x-coordinate
     * @param y The object's y-coordinate
     * @param width The object's width
     * @param height The object's height
     */
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    /** The object's x-coordinate */
    get x() { return this._x; }
    /** The object's y-coordinate */
    get y() { return this._y; }
    /** The object's width */
    get width() { return this._width; }
    /** The object's height */
    get height() { return this._height; }
}
export { GameObject };
//# sourceMappingURL=GameObject.js.map