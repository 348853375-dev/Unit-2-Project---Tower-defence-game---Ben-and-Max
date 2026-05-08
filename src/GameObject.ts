/**
 * Parent class for objects that have a position and size.
 */
class GameObject {
    protected _x: number;
    protected _y: number;
    protected _width: number;
    protected _height: number;

    /**
     * Creates a GameObject with position and size.
     * Pre: width and height should be greater than 0.
     * Post: A GameObject is created with x, y, width, and height.
     * @param x The object's x-coordinate
     * @param y The object's y-coordinate
     * @param width The object's width
     * @param height The object's height
     */
    protected constructor(x: number, y: number, width: number, height: number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    /** The object's x-coordinate */
    public get x(): number { return this._x; }

    /** The object's y-coordinate */
    public get y(): number { return this._y; }

    /** The object's width */
    public get width(): number { return this._width; }

    /** The object's height */
    public get height(): number { return this._height; }
}

export { GameObject };