import { TowerModel } from "./TowerModel.js";
/**
 * FraggerTowerModel is the second tower.
 * It has slow attack speed, low range, low damage, and AOE attacks.
 */
class FraggerTowerModel extends TowerModel {
    constructor(x, y, width, height) {
        super(x, y, width, height, "Fragger", 8, 100, 250, 1500, TowerModel.TYPE_AOE);
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
export { FraggerTowerModel };
//# sourceMappingURL=FraggerTowerModel.js.map