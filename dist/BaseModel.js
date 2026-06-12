import { GameObject } from "./GameObject.js";
/**
 * The BaseModel stores the weapon crate's information.
 *
 * The base is the final target that enemies try to reach. It stores its
 * health and position. This class uses inheritance by extending
 * GameObject.
 */
class BaseModel extends GameObject {
    _health;
    /**
     * Creates the base.
     *
     * Precondition: health, width, and height should be greater than 0.
     * Postcondition: A base is created with position, size, and health.
     *
     * @param x The base's x-coordinate
     * @param y The base's y-coordinate
     * @param width The base's width
     * @param height The base's height
     * @param health The base's starting health
     */
    constructor(x, y, width, height, health) {
        super(x, y, width, height);
        this._health = Math.max(0, health);
    }
    /** The base's current health */
    get health() {
        return this._health;
    }
    /** Sets the base's health (never below 0) */
    set health(value) {
        this._health = Math.max(0, value);
    }
    /**
     * Reduces the base's health.
     *
     * Precondition: amount should be greater than 0. Negative amounts are
     * ignored so damage can never accidentally heal the base.
     * Postcondition: The base's health is lowered but never below 0.
     *
     * @param amount The amount of damage taken
     */
    takeDamage(amount) {
        const damageAmount = Math.max(0, amount);
        this.health = this._health - damageAmount;
    }
    /**
     * Checks if the base has been destroyed.
     *
     * @returns true if the base health is 0, false otherwise
     */
    isDestroyed() {
        return this._health <= 0;
    }
}
export { BaseModel };
//# sourceMappingURL=BaseModel.js.map