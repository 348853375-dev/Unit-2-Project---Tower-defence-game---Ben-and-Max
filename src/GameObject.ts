/**
 * A parent class for any game object that occupies a position
 * and space.
 */
class GameObject {
    protected _x : number;
    protected _y : number;
    protected _width : number;
    protected _height : number;

    public get x(): number { return this._x; }
    public get y(): number { return this._y; }
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }

    protected constructor(x : number, y : number, width : number, height : number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
}

export { GameObject };