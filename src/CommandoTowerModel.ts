import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Projectile } from "./projectileClass.js";

/**
 * CommandoTowerModel is the third tower.
 * It has high attack speed, high range, medium damage, and single target
 * attacks. It costs 500 and is the main damage dealer for single enemies.
 */
class CommandoTowerModel extends TowerModel {
    /**
     * Creates a Commando tower.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A Commando tower is created with its default stats.
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Commando", 15, 220, 500, 400, TowerModel.TYPE_SINGLE_TARGET);
    }

    /**
     * Attacks the first enemy in range with a fast single target projectile.
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

        const projectileSize: number = 7;

        return new Projectile(
            this.centerX - projectileSize / 2,
            this.centerY - projectileSize / 2,
            projectileSize,
            projectileSize,
            this._damage,
            10,
            target,
            Projectile.TYPE_SINGLE_TARGET,
            0
        );
    }
}

export { CommandoTowerModel };