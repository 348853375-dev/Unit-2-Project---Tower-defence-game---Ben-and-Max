// BEN WHITMAN
import { GameObject } from "./GameObject.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Projectile } from "./projectileClass.js";

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
abstract class TowerModel extends GameObject {
    /** Attack type that targets one enemy */
    public static readonly TYPE_SINGLE_TARGET: string = "single target";

    /** Attack type that damages an area of enemies */
    public static readonly TYPE_AOE: string = "aoe";

    /** The tower's name (Scout, Fragger, Commando, or Tank) */
    protected _name: string;

    /** The damage dealt by each of the tower's projectiles */
    protected _damage: number;

    /** The tower's attack range in pixels, measured from its center */
    protected _range: number;

    /** The money cost to place this tower */
    protected _cost: number;

    /** The time in milliseconds the tower must wait between attacks */
    protected _attackCooldown: number;

    /** The tower's attack type (single target or AOE) */
    protected _towerType: string;

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
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        name: string,
        damage: number,
        range: number,
        cost: number,
        attackCooldown: number,
        towerType: string
    ) {
        super(x, y, width, height);

        this._name = name;
        this._damage = Math.max(1, damage);
        this._range = Math.max(1, range);
        this._cost = Math.max(0, cost);
        this._attackCooldown = Math.max(1, attackCooldown);
        this._towerType = towerType;
    }

    /** The tower's name */
    public get name(): string {
        return this._name;
    }

    /** The tower's damage per attack */
    public get damage(): number {
        return this._damage;
    }

    /** The tower's attack range in pixels */
    public get range(): number {
        return this._range;
    }

    /** The tower's placement cost */
    public get cost(): number {
        return this._cost;
    }

    /** The tower's cooldown between attacks in milliseconds */
    public get attackCooldown(): number {
        return this._attackCooldown;
    }

    /** The tower's attack type */
    public get towerType(): string {
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
    protected getUnitsInRange(units: DamageableUnit[]): DamageableUnit[] {
        const unitsInRange: DamageableUnit[] = [];

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
    private getDistanceToUnit(unit: DamageableUnit): number {
        const unitCenterX: number = unit.x + unit.width / 2;
        const unitCenterY: number = unit.y + unit.height / 2;

        const distanceX: number = unitCenterX - this.centerX;
        const distanceY: number = unitCenterY - this.centerY;

        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }

    /**
     * Attacks enemies by creating a projectile aimed at a target in range.
     *
     * Each child tower implements this differently: single target towers
     * create a single target projectile, AOE towers create an AOE
     * projectile.
     *
     * Precondition: units should contain the enemies currently in the game.
     * Postcondition: Returns a new projectile if an enemy was in range,
     * or null if there was nothing to attack.
     *
     * @param units All enemies currently in the game
     * @returns The projectile fired, or null if no enemy was in range
     */
    public abstract attack(units: DamageableUnit[]): Projectile | null;
}

export { TowerModel };