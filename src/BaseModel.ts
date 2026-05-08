import { GameObject } from "./GameObject.js";

/**
 * The BaseModel stores the base's information.
 * This class uses inheritance extends from GameObject.
 */
class BaseModel extends GameObject {
    private _health: number;

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
    constructor(x: number, y: number, width: number, height: number, health: number) {
        super(x, y, width, height);

        this._health = health;
    }

    /** The base's current health */
    public get health(): number {
        return this._health;
    }

    /** Sets the base's health */
    public set health(value: number) {
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
    public takeDamage(amount: number): void {
        this.health = this._health - amount;
    }

    /**
     * Checks if the base has been destroyed.
     * @returns true if the base health is 0, false otherwise
     */
    public isDestroyed(): boolean {
        return this._health === 0;
    }
}

export { BaseModel };