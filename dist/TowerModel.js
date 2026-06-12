import { GameObject } from "./GameObject.js";
/**
 * TowerModel is the abstract parent class for all towers.
 *
 * It stores the stats every tower shares (name, damage, range, cost,
 * attack cooldown, and attack type) and provides the range check used
 * for targeting. Each child tower (Scout, Fragger, Commando, Tank)
 * implements its own attack method that creates a projectile.
 *
 * This class demonstrates inheritance and abstraction: the four towers
 * reuse this shared logic and only define what makes them different.
 */
class TowerModel extends GameObject {
    /** Attack type that targets one enemy */
    static TYPE_SINGLE_TARGET = "single target";
    /** Attack type that damages an area of enemies */
    static TYPE_AOE = "aoe";
    /** The tower's name (Scout, Fragger, Commando, or Tank) */
    _name;
    /** The damage dealt by each of the tower's projectiles */
    _damage;
    /** The tower's attack range in pixels, measured from its center */
    _range;
    /** The money cost to place this tower */
    _cost;
    /** The time in milliseconds the tower must wait between attacks */
    _attackCooldown;
    /** The tower's attack type (single target or AOE) */
    _towerType;
    /**
     * Creates a tower model.
     *
     * Precondition: width, height, damage, range, cost, and attackCooldown
     * should be greater than 0.
     * Postcondition: A tower is created with its stats.
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     * @param name The tower's name
     * @param damage The damage dealt per attack
     * @param range The attack range in pixels
     * @param cost The money cost to place the tower
     * @param attackCooldown The milliseconds between attacks
     * @param towerType TowerModel.TYPE_SINGLE_TARGET or TowerModel.TYPE_AOE
     */
    constructor(x, y, width, height, name, damage, range, cost, attackCooldown, towerType) {
        super(x, y, width, height);
        this._name = name;
        this._damage = Math.max(1, damage);
        this._range = Math.max(1, range);
        this._cost = Math.max(0, cost);
        this._attackCooldown = Math.max(1, attackCooldown);
        this._towerType = towerType;
    }
    /** The tower's name */
    get name() {
        return this._name;
    }
    /** The tower's damage per attack */
    get damage() {
        return this._damage;
    }
    /** The tower's attack range in pixels */
    get range() {
        return this._range;
    }
    /** The tower's placement cost */
    get cost() {
        return this._cost;
    }
    /** The tower's cooldown between attacks in milliseconds */
    get attackCooldown() {
        return this._attackCooldown;
    }
    /** The tower's attack type */
    get towerType() {
        return this._towerType;
    }
    /**
     * Gets every enemy that is inside this tower's range.
     *
     * Distance is measured from the tower's center to the enemy's center.
     * Enemies stay in the same order as the units array, so the first
     * enemy in the result is the one that spawned earliest (the enemy
     * furthest along the path toward the base).
     *
     * Precondition: units should contain the enemies currently in the game.
     * Postcondition: Returns only the enemies within range. The original
     * array is not changed.
     *
     * @param units All enemies currently in the game
     * @returns The enemies inside the tower's range
     */
    getUnitsInRange(units) {
        const unitsInRange = [];
        for (const unit of units) {
            if (!unit.isDead() && this.getDistanceToUnit(unit) <= this._range) {
                unitsInRange.push(unit);
            }
        }
        return unitsInRange;
    }
    /**
     * Gets the distance from this tower's center to an enemy's center.
     *
     * Precondition: unit must be a valid DamageableUnit.
     * Postcondition: Returns the straight-line distance between centers.
     *
     * @param unit The enemy being checked
     * @returns The distance to the enemy
     */
    getDistanceToUnit(unit) {
        const unitCenterX = unit.x + unit.width / 2;
        const unitCenterY = unit.y + unit.height / 2;
        const distanceX = unitCenterX - this.centerX;
        const distanceY = unitCenterY - this.centerY;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
}
export { TowerModel };
//# sourceMappingURL=TowerModel.js.map