import { TowerModel } from "./TowerModel.js";
/**
 * CommandoTowerModel is the third tower.
 * It has high attack speed, high range, medium damage, and single target attacks.
 */
class CommandoTowerModel extends TowerModel {
    constructor(x, y, width, height) {
        super(x, y, width, height, "Commando", 15, 220, 500, 400, TowerModel.TYPE_SINGLE_TARGET);
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
export { CommandoTowerModel };
//# sourceMappingURL=CommandoTowerModel.js.map