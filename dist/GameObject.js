/**
 * Parent class for all objects that have a position and size.
 *
 * This class is inherited by models such as towers, enemies, the base,
 * and projectiles. It demonstrates inheritance: child classes reuse
 * the position/size logic instead of rewriting it.
 */
class GameObject {
    _x;
    _y;
    _width;
    _height;
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
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = Math.max(1, width);
        this._height = Math.max(1, height);
    }
    /** The object's x-coordinate */
    get x() {
        return this._x;
    }
    /** Sets the object's x-coordinate */
    set x(value) {
        this._x = value;
    }
    /** The object's y-coordinate */
    get y() {
        return this._y;
    }
    /** Sets the object's y-coordinate */
    set y(value) {
        this._y = value;
    }
    /** The object's width */
    get width() {
        return this._width;
    }
    /** Sets the object's width (never below 1) */
    set width(value) {
        this._width = Math.max(1, value);
    }
    /** The object's height */
    get height() {
        return this._height;
    }
    /** Sets the object's height (never below 1) */
    set height(value) {
        this._height = Math.max(1, value);
    }
    /** The x-coordinate of the object's center */
    get centerX() {
        return this._x + this._width / 2;
    }
    /** The y-coordinate of the object's center */
    get centerY() {
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
    containsPoint(x, y) {
        return (x >= this._x &&
            x <= this._x + this._width &&
            y >= this._y &&
            y <= this._y + this._height);
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
    distanceTo(other) {
        const dx = other.centerX - this.centerX;
        const dy = other.centerY - this.centerY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
export { GameObject };
//# sourceMappingURL=GameObject.js.map