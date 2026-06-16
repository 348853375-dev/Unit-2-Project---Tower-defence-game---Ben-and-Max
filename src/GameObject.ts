// BEN WHIMAN
/**
 * Parent class for all objects that have a position and size.
 *
 * This class is inherited by models such as towers, enemies, the base,
 * and projectiles. It demonstrates inheritance: child classes reuse
 * the position/size logic instead of rewriting it.
 */
abstract class GameObject {
    protected _x: number;
    protected _y: number;
    protected _width: number;
    protected _height: number;

    /**
     * Creates a GameObject with position and size.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A GameObject is created with x, y, width, and height.
     *
     * @param x The object's x-coordinate
     * @param y The object's y-coordinate
     * @param width The object's width
     * @param height The object's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        this._x = x;
        this._y = y;
        this._width = Math.max(1, width);
        this._height = Math.max(1, height);
    }

    /** The object's x-coordinate */
    public get x(): number {
        return this._x;
    }

    /** Sets the object's x-coordinate */
    public set x(value: number) {
        this._x = value;
    }

    /** The object's y-coordinate */
    public get y(): number {
        return this._y;
    }

    /** Sets the object's y-coordinate */
    public set y(value: number) {
        this._y = value;
    }

    /** The object's width */
    public get width(): number {
        return this._width;
    }

    /** Sets the object's width (never below 1) */
    public set width(value: number) {
        this._width = Math.max(1, value);
    }

    /** The object's height */
    public get height(): number {
        return this._height;
    }

    /** Sets the object's height (never below 1) */
    public set height(value: number) {
        this._height = Math.max(1, value);
    }

    /** The x-coordinate of the object's center */
    public get centerX(): number {
        return this._x + this._width / 2;
    }

    /** The y-coordinate of the object's center */
    public get centerY(): number {
        return this._y + this._height / 2;
    }

    /**
     * Checks if a point is inside this object's rectangle.
     * Used for detecting mouse clicks on tiles and towers.
     *
     * Precondition: x and y should be valid canvas coordinates.
     * Postcondition: Returns true if the point is inside this object.
     *
     * @param x The x-coordinate being checked
     * @param y The y-coordinate being checked
     * @returns true if the point is inside the object, false otherwise
     */
    public containsPoint(x: number, y: number): boolean {
        return (
            x >= this._x &&
            x <= this._x + this._width &&
            y >= this._y &&
            y <= this._y + this._height
        );
    }

    /**
     * Gets the distance from this object's center to another object's center.
     * Used by towers for range checks and by projectiles for movement/AOE.
     *
     * Precondition: other must be a valid GameObject.
     * Postcondition: Returns the straight-line distance between centers.
     *
     * @param other The other GameObject
     * @returns The distance between the two centers
     */
    public distanceTo(other: GameObject): number {
        const dx: number = other.centerX - this.centerX;
        const dy: number = other.centerY - this.centerY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

export { GameObject };