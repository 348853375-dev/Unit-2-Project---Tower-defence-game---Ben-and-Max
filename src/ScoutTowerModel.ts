import { TowerModel } from "./TowerModel.js";

/**
 * ScoutTowerModel is the first tower.
 * It has medium attack speed, low range, low damage, and single target attacks.
 */
class ScoutTowerModel extends TowerModel {
    /**
     * Creates a Scout tower.
     * Pre: width and height should be greater than 0.
     * Post: A Scout tower is created with its default stats.
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Scout", 10, 100, 100, 800, TowerModel.TYPE_SINGLE_TARGET);
    }
}

export { ScoutTowerModel };