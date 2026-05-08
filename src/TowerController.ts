import { TowerModel } from "./TowerModel.js";
import { GameImage } from "./GameImage.js";
import { Drawable } from "./drawable.js";

/**
 * The TowerController controls any tower model.
 * This class uses polymorphism because it stores a TowerModel,
 * but the actual object can be a ScoutTowerModel, FraggerTowerModel,
 * CommandoTowerModel, or TankTowerModel.
 */
class TowerController implements Drawable {
    /** Stores the tower's data */
    private _towerModel: TowerModel;

    /** Stores the tower's image */
    private _gameImage: GameImage;

    /** Stores the last time this tower attacked */
    private _lastAttackTime: number;

    /**
     * Creates a TowerController.
     * Pre: towerModel must be a TowerModel or a child of TowerModel.
     * Post: A tower controller is created and connected to an image.
     * @param towerModel The tower model being controlled
     * @param filename The image file used for the tower
     */
    constructor(towerModel: TowerModel, filename: string) {
        this._towerModel = towerModel;
        this._gameImage = new GameImage(filename, this._towerModel);
        this._lastAttackTime = 0;
    }

    /**
     * Draws the tower on the canvas.
     * Pre: canvas and ctx must exist.
     * Post: The tower image is drawn if it has loaded.
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
        }
    }

    /**
     * Checks if the tower is ready to attack again.
     * Pre: currentTime should come from Date.now() or performance.now().
     * Post: Returns true if the tower can attack.
     * @param currentTime The current game time
     * @returns true if enough time has passed since the last attack
     */
    public canAttack(currentTime: number): boolean {
        return currentTime - this._lastAttackTime >= this._towerModel.attackCooldown;
    }

    /**
     * Records that the tower attacked.
     * Pre: currentTime should come from Date.now() or performance.now().
     * Post: The tower's last attack time is updated.
     * @param currentTime The current game time
     */
    public recordAttack(currentTime: number): void {
        this._lastAttackTime = currentTime;
    }

    /**
     * Gets the tower's damage.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's damage
     */
    public get damage(): number {
        return this._towerModel.damage;
    }

    /**
     * Gets the tower's range.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's range
     */
    public get range(): number {
        return this._towerModel.range;
    }

    /**
     * Gets the tower's cost.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's cost
     */
    public get cost(): number {
        return this._towerModel.cost;
    }

    /**
     * Gets the tower's name.
     * @returns The tower's name
     */
    public get name(): string {
        return this._towerModel.name;
    }

    /**
     * Gets the tower's attack type.
     * Example: single target or AOE.
     * @returns The tower's attack type
     */
    public get towerType(): string {
        return this._towerModel.towerType;
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
}

export { TowerController };