import { TowerModel } from "./TowerModel.js";

/**
 * FraggerTowerModel is the second tower.
 * It has slow attack speed, low range, low damage, and AOE attacks.
 */
class FraggerTowerModel extends TowerModel {
    /**
     * Creates a Fragger tower.
     * Pre: width and height should be greater than 0.
     * Post: A Fragger tower is created with its default stats.
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Fragger", 8, 100, 250, 1500, TowerModel.TYPE_AOE)
    }
}

export { FraggerTowerModel };