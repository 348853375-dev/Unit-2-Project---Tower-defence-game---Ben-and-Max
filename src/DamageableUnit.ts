// BEN WHITMAN
/**
 * DamageableUnit represents any game unit that can be attacked by a
 * tower or projectile.
 *
 * This interface allows different enemy classes (Robot 001, Robot 002,
 * Robot 003, and the Boss) to all be treated the same way by towers and
 * projectiles, as long as they have position, size, health, a takeDamage
 * method, and an isDead method.
 */
interface DamageableUnit {
    /** The unit's x-coordinate */
    x: number;

    /** The unit's y-coordinate */
    y: number;

    /** The unit's width */
    width: number;

    /** The unit's height */
    height: number;

    /** The unit's current health */
    health: number;

    /** The money the player earns when this unit is defeated */
    moneyValue: number;

    /**
     * Reduces the unit's health.
     *
     * Precondition: damage should be greater than 0.
     * Postcondition: The unit loses health, but health never goes below 0.
     *
     * @param damage The amount of damage the unit takes
     */
    takeDamage(damage: number): void;

    /**
     * Checks if the unit is dead.
     *
     * @returns true if the unit has no health left, false otherwise
     */
    isDead(): boolean;
}

export { DamageableUnit };