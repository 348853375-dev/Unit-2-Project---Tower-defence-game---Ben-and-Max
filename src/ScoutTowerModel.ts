import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";

/**
 * ScoutTowerModel is the first tower.
 * It has medium attack speed, low range, low damage, and single target attacks.
 */
class ScoutTowerModel extends TowerModel {
    /**
     * Creates a Scout tower.
     * Precondition: width and height should be greater than 0.
     * Postcondition: A Scout tower is created with its default stats.
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Scout", 10, 100, 100, 800, TowerModel.TYPE_SINGLE_TARGET);
    }

    public attack(units: DamageableUnit[]): void {
        const unitsInRange: DamageableUnit[] = this.getUnitsInRange(units);
        const target: DamageableUnit | undefined = unitsInRange[0];

        if (target !== undefined) {
            target.takeDamage(this._damage);
        }
    }
}

export { ScoutTowerModel };