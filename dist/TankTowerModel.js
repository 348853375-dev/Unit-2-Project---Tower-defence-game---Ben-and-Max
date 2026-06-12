import { TowerModel } from "./TowerModel.js";
import { Projectile } from "./projectileClass.js";
/**
 * TankTowerModel is the fourth tower.
 * It has slow attack speed, medium range, high damage, and AOE attacks.
 * It costs 1000, making it the most expensive and powerful tower.
 */
class TankTowerModel extends TowerModel {
    /**
     * Creates a Tank tower.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A Tank tower is created with its default stats.
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x, y, width, height) {
        super(x, y, width, height, "Tank", 35, 160, 1000, 1800, TowerModel.TYPE_AOE);
    }
    /**
     * Attacks the first enemy in range with a slow but powerful AOE
     * projectile that damages every enemy near the impact point.
     *
     * Precondition: units should contain the enemies currently in the game.
     * Postcondition: Returns a new AOE projectile aimed at the target, or
     * null if no enemy was in range.
     *
     * @param units All enemies currently in the game
     * @returns The projectile fired, or null if no enemy was in range
     */
    attack(units) {
        const unitsInRange = this.getUnitsInRange(units);
        const target = unitsInRange[0];
        if (target === undefined) {
            return null;
        }
        const projectileSize = 14;
        return new Projectile(this.centerX - projectileSize / 2, this.centerY - projectileSize / 2, projectileSize, projectileSize, this._damage, 4, target, Projectile.TYPE_AOE, 100);
    }
}
export { TankTowerModel };
//# sourceMappingURL=TankTowerModel.js.map