import { GameObject } from "./GameObject.js";
/**
 * The BaseModel stores the base's information.
 * This class uses inheritance extends from GameObject.
 */
class BaseModel extends GameObject {
    _health;
    /**
     * Creates the base.
     * Precondition: health, width, and height should be greater than 0.
     * Postcondition: A base is created with position, size, and health.
     * @param x The base's x-coordinate
     * @param y The base's y-coordinate
     * @param width The base's width
     * @param height The base's height
     * @param health The base's starting health
     */
    constructor(x, y, width, height, health) {
        super(x, y, width, height);
        this._health = health;
    }
    /** The base's current health */
    get health() {
        return this._health;
    }
    /** Sets the base's health */
    set health(value) {
        this._health = value;
        if (this._health < 0) {
            this._health = 0;
        }
    }
    /**
     * Reduces the base's health.
     * Pre: amount should be greater than 0.
     * Post: The base's health is lowered but never below 0.
     * @param amount The amount of damage taken
     */
    takeDamage(amount) {
        this.health = this._health - amount;
    }
    /**
     * Checks if the base has been destroyed.
     * @returns true if the base health is 0, false otherwise
     */
    isDestroyed() {
        return this._health === 0;
    }
}
export { BaseModel };
//# sourceMappingURL=BaseModel.js.map