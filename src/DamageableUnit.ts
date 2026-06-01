/**
 * DamageableUnit represents any game unit that can be attacked by a tower.
 * 
 * This interface allows different enemy/unit classes to be treated the same way
 * as long as they have position, size, and a takeDamage method.
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

    /**
     * Reduces the unit's health.
     * Precondition: damage should be greater than 0.
     * Postcondition: The unit loses health based on the damage amount.
     * @param damage The amount of damage the unit takes
     */
    takeDamage(damage: number): void;
}

export { DamageableUnit };