import { TowerModel } from "./TowerModel.js";

/**
 * CommandoTowerModel is the third tower.
 * It has high attack speed, high range, medium damage, and single target attacks.
 */
class CommandoTowerModel extends TowerModel {
    /**
     * Creates a Commando tower.
     * Pre: width and height should be greater than 0.
     * Post: A Commando tower is created with its default stats.
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param width The tower's width
     * @param height The tower's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, "Commando", 15, 220, 500, 400, TowerModel.TYPE_SINGLE_TARGET);
    }
}

export { CommandoTowerModel };