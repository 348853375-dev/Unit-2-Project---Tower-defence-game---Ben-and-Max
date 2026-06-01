import { TowerModel } from "./TowerModel.js";
/**
 * TankTowerModel is the fourth tower.
 * It has slow attack speed, medium range, high damage, and AOE attacks.
 */
class TankTowerModel extends TowerModel {
    constructor(x, y, width, height) {
        super(x, y, width, height, "Tank", 35, 160, 1000, 1800, TowerModel.TYPE_AOE);
    }
    /**
     * Attacks every enemy unit inside range.
     * Precondition: units should contain damageable enemy objects.
     * Postcondition: All units in range take damage.
     * @param units The enemy units that may be attacked
     */
    attack(units) {
        const unitsInRange = this.getUnitsInRange(units);
        for (const unit of unitsInRange) {
            unit.takeDamage(this._damage);
        }
    }
}
export { TankTowerModel };
//# sourceMappingURL=TankTowerModel.js.map