import { GameImage } from "./GameImage.js";
/**
 * The TowerController controls any tower model.
 * This class uses polymorphism stores a TowerModel, can be either scout, fragger, commando, tank
 * but the actual object can be a ScoutTowerModel, FraggerTowerModel,
 * CommandoTowerModel, or TankTowerModel.
 */
class TowerController {
    /** Stores the tower's data */
    _towerModel;
    /** Stores the tower's image */
    _gameImage;
    /** Stores the last time this tower attacked */
    _lastAttackTime;
    /**
     * Creates a TowerController.
     * Precondition: towerModel must be a TowerModel or a child of TowerModel.
     * Postcondition: A tower controller is created and connected to an image.
     * @param towerModel The tower model being controlled
     * @param filename The image file used for the tower
     */
    constructor(towerModel, filename) {
        this._towerModel = towerModel;
        this._gameImage = new GameImage(filename, this._towerModel);
        this._lastAttackTime = 0;
    }
    /**
     * Draws the tower on the canvas
     * Precondition: canvas and ctx must exist
     * Postcondition: The tower image is drawn if it has loaded
     * @param canvas The canvas where the tower is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas, ctx) {
        if (this._gameImage.complete) {
            ctx.drawImage(this._gameImage.img, this._gameImage.x, this._gameImage.y, this._gameImage.width, this._gameImage.height);
        }
    }
    /**
     * Checks if the tower is ready to attack again.
     * Pre: currentTime should come from Date.now() or performance.now().
     * Post: Returns true if the tower can attack.
     * @param currentTime The current game time
     * @returns true if enough time has passed since the last attack
     */
    canAttack(currentTime) {
        return currentTime - this._lastAttackTime >= this._towerModel.attackCooldown;
    }
    /**
     * Records that the tower attacked.
     * Pre: currentTime should come from Date.now() or performance.now().
     * Post: The tower's last attack time is updated.
     * @param currentTime The current game time
     */
    recordAttack(currentTime) {
        this._lastAttackTime = currentTime;
    }
    /**
     * Gets the tower's damage.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's damage
     */
    get damage() {
        return this._towerModel.damage;
    }
    /**
     * Gets the tower's range.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's range
     */
    get range() {
        return this._towerModel.range;
    }
    /**
     * Gets the tower's cost.
     * This will be different depending on which child tower model is being used.
     * @returns The tower's cost
     */
    get cost() {
        return this._towerModel.cost;
    }
    /**
     * Gets the tower's name.
     * @returns The tower's name
     */
    get name() {
        return this._towerModel.name;
    }
    /**
     * Gets the tower's attack type.
     * Example: single target or AOE.
     * @returns The tower's attack type
     */
    get towerType() {
        return this._towerModel.towerType;
    }
    /** The tower's x-coordinate */
    get x() {
        return this._towerModel.x;
    }
    /** The tower's y-coordinate */
    get y() {
        return this._towerModel.y;
    }
    /** The tower's width */
    get width() {
        return this._towerModel.width;
    }
    /** The tower's height */
    get height() {
        return this._towerModel.height;
    }
}
export { TowerController };
//# sourceMappingURL=TowerController.js.map