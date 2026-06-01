import { TowerModel } from "./TowerModel.js";
import { DamageableUnit } from "./DamageableUnit.js";

/**
 * TankTowerModel is the fourth tower.
 * It has slow attack speed, medium range, high damage, and AOE attacks.
 */
class TankTowerModel extends TowerModel {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Tank", 35, 160, 1000, 1800, TowerModel.TYPE_AOE);
    }


    public attack(units: DamageableUnit[]): void {
        const unitsInRange: DamageableUnit[] = this.getUnitsInRange(units);

        for (const unit of unitsInRange) {
            unit.takeDamage(this._damage);
        }
    }
}

export { TankTowerModel };