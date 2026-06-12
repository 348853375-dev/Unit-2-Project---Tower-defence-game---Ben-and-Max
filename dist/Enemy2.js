import { Enemy } from "./Enemy.js";
/**
 * Enemy2 is Robot 002, the more advanced robot.
 *
 * It walks at a faster pace, drops medium money ($125), and has a
 * special ability: it slows down the fire rate of nearby towers.
 *
 * The slowing itself is applied by the GameController each frame using
 * SLOW_RANGE and SLOW_MULTIPLIER, by calling setFireRateMultiplier on
 * towers near this robot.
 */
class Enemy2 extends Enemy {
    /** The money dropped when Robot 002 is defeated */
    static MONEY_VALUE = 125;
    /** How close a tower must be (in pixels) to be slowed */
    static SLOW_RANGE = 120;
    /** How much slower affected towers fire (2 = half speed) */
    static SLOW_MULTIPLIER = 2;
    /**
     * Creates a Robot 002 at the given position.
     *
     * Precondition: x and y should be a valid spawn position.
     * Postcondition: A Robot 002 is created with its default stats.
     *
     * @param x The robot's starting x-coordinate
     * @param y The robot's starting y-coordinate
     */
    constructor(x, y) {
        super(x, y, 32, 32, 60, 1.6, Enemy2.MONEY_VALUE, "deepskyblue");
    }
}
export { Enemy2 };
//# sourceMappingURL=Enemy2.js.map