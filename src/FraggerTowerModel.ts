// BEN WHITMAN
// all of the classes imported that are needed for the fragger tower to function properly
import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Projectile } from "./projectileClass.js";

/**
 * FraggerTowerModel is the second tower.
 * It has slow attack speed, low range, low damage, and AOE attacks.
 * It costs 250 and is good against groups of weak enemies.
 */
class FraggerTowerModel extends TowerModel {
    /**
     * Creates a Fragger tower.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A Fragger tower is created with its default stats.
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Fragger", 8, 100, 250, 1500, TowerModel.TYPE_AOE);
    }

    /**
     * Attacks the first enemy in range with an AOE projectile that
     * damages every enemy near the impact point.
     *
     * Precondition: units should contain the enemies currently in the game.
     * Postcondition: Returns a new AOE projectile aimed at the target, or
     * null if no enemy was in range.
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

        const projectileSize: number = 12;

        return new Projectile(this.centerX - projectileSize / 2, this.centerY - projectileSize / 2, projectileSize, projectileSize, this._damage,
            5, target, Projectile.TYPE_AOE, 70
        );
    }
}

export { FraggerTowerModel };