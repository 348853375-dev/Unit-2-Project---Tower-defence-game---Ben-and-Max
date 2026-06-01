import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";

/**
 * FraggerTowerModel is the second tower.
 * It has slow attack speed, low range, low damage, and AOE attacks.
 */
class FraggerTowerModel extends TowerModel {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Fragger", 8, 100, 250, 1500, TowerModel.TYPE_AOE);
    }

    public attack(units: DamageableUnit[]): void {
        const unitsInRange: DamageableUnit[] = this.getUnitsInRange(units);

        for (const unit of unitsInRange) {
            unit.takeDamage(this._damage);
        }
    }
}

export { FraggerTowerModel };