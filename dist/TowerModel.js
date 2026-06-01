import { GameObject } from "./GameObject.js";
/**
 * Parent class for all tower models.
 * Stores the shared data that every tower needs.
 */
class TowerModel extends GameObject {
    static TYPE_SINGLE_TARGET = "single target";
    static TYPE_AOE = "aoe";
    _name;
    _damage;
    _range;
    _cost;
    _attackCooldown;
    _towerType;
    /**
     * Creates a TowerModel.
     * Precondition: width, height, damage, range, cost, and attackCooldown should be greater than 0.
     * Postcondition: A tower is created with position, size, and tower stats.
     */
    constructor(x, y, width, height, name, damage, range, cost, attackCooldown, towerType) {
        super(x, y, width, height);
        this._name = name;
        this._damage = damage;
        this._range = range;
        this._cost = cost;
        this._attackCooldown = attackCooldown;
        this._towerType = towerType;
    }
    /**
     * Finds all units inside this tower's range.
     * Precondition: units should contain valid positions.
     * Postcondition: Returns only units within the tower's range.
     * @param units The units to check
     * @returns The units within range
     */
    getUnitsInRange(units) {
        return units.filter((unit) => {
            return this.getDistanceToUnit(unit) <= this._range;
        });
    }
    /**
     * Finds the distance between this tower and a unit.
     * Precondition: unit must have x, y, width, and height.
     * Postcondition: Returns the distance between the tower and the unit.
     * @param unit The unit to measure distance to
     * @returns The distance between the tower and the unit
     */
    getDistanceToUnit(unit) {
        const towerCenterX = this._x + this._width / 2;
        const towerCenterY = this._y + this._height / 2;
        const unitCenterX = unit.x + unit.width / 2;
        const unitCenterY = unit.y + unit.height / 2;
        const distanceX = towerCenterX - unitCenterX;
        const distanceY = towerCenterY - unitCenterY;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    get name() {
        return this._name;
    }
    get damage() {
        return this._damage;
    }
    get range() {
        return this._range;
    }
    get cost() {
        return this._cost;
    }
    get attackCooldown() {
        return this._attackCooldown;
    }
    get towerType() {
        return this._towerType;
    }
}
export { TowerModel };
//# sourceMappingURL=TowerModel.js.map