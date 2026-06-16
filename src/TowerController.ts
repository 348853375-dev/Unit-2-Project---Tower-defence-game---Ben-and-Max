// BEN WHITMAN
import { TowerModel } from "./TowerModel.js";
import { GameImage } from "./GameImage.js";
import { Drawable } from "./drawable.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Projectile } from "./projectileClass.js";

/**
 * The TowerController controls one tower in the game.
 *
 * It connects a TowerModel (the tower's stats and targeting logic) to a
 * GameImage (the tower's picture on the canvas), and it manages the
 * tower's attack cooldown using the game loop's time.
 */
class TowerController implements Drawable {
    /** Stores the tower's data and targeting logic */
    private _towerModel: TowerModel;

    /** Stores the tower's image */
    private _gameImage: GameImage;

    /** The time of the tower's last attack, in milliseconds */
    private _lastAttackTime: number;

    /**
     * Multiplies the tower's cooldown. 1 = normal speed.
     * Robot 002 can set this above 1 to slow the tower's fire rate.
     */
    private _fireRateMultiplier: number;

    /**
     * Creates a TowerController.
     *
     * Precondition: towerModel must be a valid tower and filename must be
     * a valid image path.
     * Postcondition: The controller is created and the tower can attack
     * immediately.
     *
     * @param towerModel The tower model being controlled
     * @param filename The image file used for the tower
     */
    constructor(towerModel: TowerModel, filename: string) {
        this._towerModel = towerModel;
        this._gameImage = new GameImage(filename, this._towerModel);
        this._lastAttackTime = 0;
        this._fireRateMultiplier = 1;
    }

    /**
     * Checks if the tower's cooldown has finished.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: Returns true if enough time has passed since the
     * last attack.
     *
     * @param currentTime The current animation time in milliseconds
     * @returns true if the tower can attack, false otherwise
     */
    private canAttack(currentTime: number): boolean {
        const cooldown: number = this._towerModel.attackCooldown * this._fireRateMultiplier;
        return currentTime - this._lastAttackTime >= cooldown;
    }

    /**
     * Attacks enemies if the cooldown has finished and an enemy is in range.
     *
     * The cooldown only restarts if the tower actually fired, so a tower
     * never wastes its cooldown when there is nothing to shoot.
     *
     * Precondition: units should contain the enemies currently in the game,
     * and currentTime should come from requestAnimationFrame.
     * Postcondition: Returns a new projectile and restarts the cooldown,
     * or returns null if the tower could not attack.
     *
     * @param units All enemies currently in the game
     * @param currentTime The current animation time in milliseconds
     * @returns The projectile fired, or null if the tower did not attack
     */
    public attack(units: DamageableUnit[], currentTime: number): Projectile | null {
        if (!this.canAttack(currentTime)) {
            return null;
        }

        const projectile: Projectile | null = this._towerModel.attack(units);

        if (projectile !== null) {
            this._lastAttackTime = currentTime;
        }

        return projectile;
    }

    /**
     * Sets how much the tower's fire rate is slowed.
     *
     * Precondition: multiplier should be 1 or greater.
     * Postcondition: The tower's cooldown is multiplied by this value.
     * Use 1 to return the tower to normal speed.
     *
     * @param multiplier The cooldown multiplier (1 = normal, 2 = half speed)
     */
    public setFireRateMultiplier(multiplier: number): void {
        this._fireRateMultiplier = Math.max(1, multiplier);
    }

    /**
     * Draws the tower on the canvas.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: The tower image is drawn if it has loaded. If the
     * image has not loaded yet, a gray square is drawn instead so the
     * tower is never invisible.
     *
     * @param canvas The canvas where the tower is drawn
     * @param ctx The canvas drawing context
     */
    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        if (this._gameImage.complete) {
            ctx.drawImage(
                this._gameImage.img,
                this._gameImage.x,
                this._gameImage.y,
                this._gameImage.width,
                this._gameImage.height
            );
        } else {
            ctx.save();
            ctx.fillStyle = "gray";
            ctx.fillRect(
                this._towerModel.x,
                this._towerModel.y,
                this._towerModel.width,
                this._towerModel.height
            );
            ctx.restore();
        }
    }

    /**
     * Draws a circle showing the tower's attack range.
     * Used when the player is placing or selecting a tower.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: A see-through circle is drawn around the tower.
     *
     * @param canvas The canvas where the range is drawn
     * @param ctx The canvas drawing context
     */
    public drawRange(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.arc(
            this._towerModel.centerX,
            this._towerModel.centerY,
            this._towerModel.range,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    /**
     * Checks if a point (like a mouse click) is on this tower.
     *
     * @param x The x-coordinate being checked
     * @param y The y-coordinate being checked
     * @returns true if the point is inside the tower, false otherwise
     */
    public containsPoint(x: number, y: number): boolean {
        return this._towerModel.containsPoint(x, y);
    }

    /** The tower's x-coordinate */
    public get x(): number {
        return this._towerModel.x;
    }

    /** The tower's y-coordinate */
    public get y(): number {
        return this._towerModel.y;
    }

    /** The tower's width */
    public get width(): number {
        return this._towerModel.width;
    }

    /** The tower's height */
    public get height(): number {
        return this._towerModel.height;
    }

    /** The tower's name */
    public get name(): string {
        return this._towerModel.name;
    }

    /** The tower's placement cost */
    public get cost(): number {
        return this._towerModel.cost;
    }

    /** The tower's attack range in pixels */
    public get range(): number {
        return this._towerModel.range;
    }
}

export { TowerController };