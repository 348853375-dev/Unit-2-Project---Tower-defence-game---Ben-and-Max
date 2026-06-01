import { TowerModel } from "./TowerModel.js";
/**
 * ScoutTowerModel is the first tower.
 * It has medium attack speed, low range, low damage, and single target attacks.
 */
class ScoutTowerModel extends TowerModel {
    constructor(x, y, width, height) {
        super(x, y, width, height, "Scout", 10, 100, 100, 800, TowerModel.TYPE_SINGLE_TARGET);
    }
    /**
     * Attacks the first enemy unit inside range.
     * Precondition: units should contain damageable enemy objects.
     * Postcondition: The first unit in range takes damage.
     * @param units The enemy units that may be attacked
     */
    attack(units) {
        const unitsInRange = this.getUnitsInRange(units);
        if (unitsInRange.length > 0) {
            unitsInRange[0].takeDamage(this._damage);
        }
    }
}
export { ScoutTowerModel };
//# sourceMappingURL=ScoutTowerModel.js.map