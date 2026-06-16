// BEN WHITMAN
import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Projectile } from "./projectileClass.js";

/**
 * ScoutTowerModel is the first tower.
 * It has medium attack speed, low range, low damage, and single target
 * attacks. It costs 100, making it the cheap starter tower.
 */
class ScoutTowerModel extends TowerModel {
    /**
     * Creates a Scout tower.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A Scout tower is created with its default stats.
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Scout", 10, 100, 100, 800, TowerModel.TYPE_SINGLE_TARGET);
    }

    /**
     * Attacks the first enemy in range with a single target projectile.
     *
     * Precondition: units should contain the enemies currently in the game.
     * Postcondition: Returns a new projectile aimed at the target, or null
     * if no enemy was in range.
     *
     * @param units All enemies currently in the game
     * @returns The projectile fired, or null if no enemy was in range
     */
    public attack(units: DamageableUnit[]): Projectile | null {
        const unitsInRange: DamageableUnit[] = this.getUnitsInRange(units);
        const target: DamageableUnit | undefined = unitsInRange[0];

        if (target === undefined) {
            return null;
        }

        const projectileSize: number = 8;

        return new Projectile(
            this.centerX - projectileSize / 2,
            this.centerY - projectileSize / 2,
            projectileSize,
            projectileSize,
            this._damage,
            7,
            target,
            Projectile.TYPE_SINGLE_TARGET,
            0
        );
    }
}

export { ScoutTowerModel };