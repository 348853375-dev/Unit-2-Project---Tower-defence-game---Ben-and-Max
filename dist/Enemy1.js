import { Enemy } from "./Enemy.js";
/**
 * Enemy1 is Robot 001, the first and weakest robot.
 *
 * It has a small amount of health, walks at a slow pace toward the
 * weapons, and drops a little money ($50).
 */
class Enemy1 extends Enemy {
    /** The money dropped when Robot 001 is defeated */
    static MONEY_VALUE = 50;
    /**
     * Creates a Robot 001 at the given position.
     *
     * Precondition: x and y should be a valid spawn position.
     * Postcondition: A Robot 001 is created with its default stats.
     *
     * @param x The robot's starting x-coordinate
     * @param y The robot's starting y-coordinate
     */
    constructor(x, y) {
        super(x, y, 32, 32, 30, 1.0, Enemy1.MONEY_VALUE, "silver");
    }
}
export { Enemy1 };
//# sourceMappingURL=Enemy1.js.map