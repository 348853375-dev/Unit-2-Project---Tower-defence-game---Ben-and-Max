import { TowerModel } from "./TowerModel.js";

/**
 * TankTowerModel is the fourth tower.
 * It has slow attack speed, medium range, high damage, and AOE attacks.
 */
class TankTowerModel extends TowerModel {
    /**
     * Creates a Tank tower.
     * Pre: width and height should be greater than 0.
     * Post: A Tank tower is created with its default stats.
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Tank", 35, 160, 1000, 1800, TowerModel.TYPE_AOE);
    }
}

export { TankTowerModel };