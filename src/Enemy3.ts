import { Enemy } from "./Enemy.js";

/**
 * Enemy3 is Robot 003, the perfected robot.
 *
 * It is faster, has more health, and drops a lot of money ($200). Its
 * special ability: it steals coins from the player when it spawns.
 *
 * The stealing itself is applied by the GameController at spawn time,
 * by calling stealMoney(Enemy3.STEAL_AMOUNT) on the GameModel.
 */
class Enemy3 extends Enemy {
    /** The money dropped when Robot 003 is defeated */
    public static readonly MONEY_VALUE: number = 200;

    /** The coins stolen from the player when Robot 003 spawns */
    public static readonly STEAL_AMOUNT: number = 50;

    /**
     * Creates a Robot 003 at the given position.
     *
     * Precondition: x and y should be a valid spawn position.
     * Postcondition: A Robot 003 is created with its default stats.
     *
     * @param x The robot's starting x-coordinate
     * @param y The robot's starting y-coordinate
     */
    constructor(x: number, y: number) {
        super(x, y, 32, 32, 120, 2.0, Enemy3.MONEY_VALUE, "crimson");
    }
}

export { Enemy3 };