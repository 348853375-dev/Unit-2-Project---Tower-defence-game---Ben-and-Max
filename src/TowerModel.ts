import { GameObject } from "./GameObject.js";

/**
 * Parent class for all tower models.
 * Stores the shared data that every tower needs.
 */
class TowerModel extends GameObject {
    public static readonly TYPE_SINGLE_TARGET: string = "single target";
    public static readonly TYPE_AOE: string = "aoe";

    protected _name: string;
    protected _damage: number;
    protected _range: number;
    protected _cost: number;
    protected _attackCooldown: number;
    protected _towerType: string;

    /**
     * Creates a TowerModel.
     * Precondition: width, height, damage, range, cost, and attackCooldown should be greater than 0
     * Postcondition: A tower is created with position, size, and tower stats
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     * @param name The tower's name
     * @param damage The tower's damage
     * @param range The tower's attack range
     * @param cost The tower's cost
     * @param attackCooldown The time between attacks
     * @param towerType The tower's attack type
     */
    constructor(x: number, y: number, width: number, height: number, name: string, damage: number,
                range: number, cost: number, attackCooldown: number, towerType: string) {

        super(x, y, width, height);

        this._name = name;
        this._damage = damage;
        this._range = range;
        this._cost = cost;
        this._attackCooldown = attackCooldown;
        this._towerType = towerType;
    }

    /** The tower's name */
    public get name(): string {
        return this._name;
    }

    /** The tower's damage */
    public get damage(): number {
        return this._damage;
    }

    /** The tower's attack range */
    public get range(): number {
        return this._range;
    }

    /** The tower's cost */
    public get cost(): number {
        return this._cost;
    }

    /** The tower's attack cooldown */
    public get attackCooldown(): number {
        return this._attackCooldown;
    }

    /** The tower's attack type */
    public get towerType(): string {
        return this._towerType;
    }
}

export { TowerModel };