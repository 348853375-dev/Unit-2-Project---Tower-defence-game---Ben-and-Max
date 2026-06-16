// importt's the three different eneimes, to use thier stats
import { Enemy } from "./Enemy.js";
import { Enemy2 } from "./Enemy2.js";
import { Enemy3 } from "./Enemy3.js";

/**
 * Boss is the final enemy: a large mech.
 *
 * It moves at a very slow pace, has a large amount of health, and
 * speeds up over time. It has the abilities of both Robot 002 (slows
 * nearby towers) and Robot 003 (steals coins on spawn).
 *
 * If the Boss reaches the crate, the player loses all 3 lives and the
 * game ends. If the player defeats the Boss, the player wins the game.
 *
 * Like the other abilities, the GameController applies the effects:
 * it checks instanceof Boss for the slow, the steal, the reach-base
 * loss, and the victory on death.
 */
class Boss extends Enemy {
    /** The score awarded when the Boss is defeated */
    public static readonly MONEY_VALUE: number = 500;

    /** The coins stolen from the player when the Boss spawns */
    public static readonly STEAL_AMOUNT: number = Enemy3.STEAL_AMOUNT;

    /** How close a tower must be (in pixels) to be slowed */
    public static readonly SLOW_RANGE: number = Enemy2.SLOW_RANGE;

    /** How much slower affected towers fire (2 = half speed) */
    public static readonly SLOW_MULTIPLIER: number = Enemy2.SLOW_MULTIPLIER;

    /** How much speed the Boss gains every frame it moves */
    public static readonly SPEED_INCREASE: number = 0.0008;

    /** The fastest the Boss can ever move */
    public static readonly MAX_SPEED: number = 1.5;

    /**
     * Creates the Boss at the given position.
     *
     * Precondition: x and y should be a valid spawn position.
     * Postcondition: The Boss is created with its default stats and
     * starts at its slowest speed.
     *
     * @param x The Boss's starting x-coordinate
     * @param y The Boss's starting y-coordinate
     */
    constructor(x: number, y: number) {
        super(x, y, 56, 56, 1200, 0.4, Boss.MONEY_VALUE, "darkorchid", "images/boss.png");
    }

    /**
     * Moves the Boss one frame along its path.
     *
     * The Boss gets slightly faster every frame it moves, up to its
     * maximum speed. This makes the fight more dangerous the longer
     * it lasts.
     *
     * Precondition: setPath should have been called.
     * Postcondition: The Boss moves and its speed increases a little.
     */
    public override move(): void {
        this.speed = Math.min(Boss.MAX_SPEED, this.speed + Boss.SPEED_INCREASE);
        super.move();
    }
}

export { Boss };