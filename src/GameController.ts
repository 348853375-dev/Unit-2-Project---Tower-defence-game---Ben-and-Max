import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { TowerController } from "./TowerController.js";
import { TowerModel } from "./TowerModel.js";
import { ScoutTowerModel } from "./ScoutTowerModel.js";
import { FraggerTowerModel } from "./FraggerTowerModel.js";
import { CommandoTowerModel } from "./CommandoTowerModel.js";
import { TankTowerModel } from "./TankTowerModel.js";
import { BaseController } from "./BaseController.js";
import { Projectile } from "./projectileClass.js";
import { Drawable } from "./drawable.js";

/**
 * The GameController runs the game.
 *
 * It owns the game loop, handles the player's mouse and keyboard input,
 * and connects the Model (game state) to the View (drawing). Each frame
 * it updates every system in order, then asks the view to redraw.
 *
 * Player controls:
 * - Keys 1 to 4 select which tower to place (Scout, Fragger, Commando, Tank)
 * - Click the canvas to place the selected tower
 * - F activates the freeze ability
 * - R restarts the game after it ends
 */
class GameController {
    /** The size of one tower in pixels */
    private static readonly TOWER_SIZE: number = 48;

    /** The image file for each tower, in order 1 to 4 */
    private static readonly TOWER_IMAGES: string[] = [
        "images/scout.png",
        "images/fragger.png",
        "images/commando.png",
        "images/tank.png"
    ];

    private _model: GameModel;
    private _view: GameView;
    private _canvas: HTMLCanvasElement;
    private _base: BaseController;

    /** Which tower type is selected for placement (0 to 3) */
    private _selectedTowerIndex: number;

    /** True once the player has won by defeating the boss */
    private _isVictory: boolean;

    /** The latest animation time, used by input handlers */
    private _currentTime: number;

    /**
     * Creates the GameController.
     *
     * Precondition: canvasId must match an existing canvas element.
     * Postcondition: The game controller is created, input listeners are
     * attached, and the game loop starts.
     *
     * @param canvasId The id of the canvas element
     */
    constructor(canvasId: string) {
        const canvasElement: HTMLElement | null = document.getElementById(canvasId);

        if (!(canvasElement instanceof HTMLCanvasElement)) {
            throw new Error("Canvas element was not found.");
        }

        this._canvas = canvasElement;
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;

        this._model = new GameModel();
        this._view = new GameView(this._canvas);

        // The weapon crate in the bottom left corner of the map.
        this._base = new BaseController(
            20,
            this._canvas.height - 84,
            64,
            64,
            100,
            "images/crate.png"
        );

        this._selectedTowerIndex = 0;
        this._isVictory = false;
        this._currentTime = 0;

        this.setupInput();

        // ================= MAX INTEGRATION =================
        // Create the Map and the WaveSpawner here, for example:
        //   this._map = new GameMap(this._canvas.width, this._canvas.height);
        //   this._spawner = new WaveSpawner(this._model, this._map.waypoints);
        // ====================================================

        this.gameLoop(0);
    }

    /**
     * Attaches the mouse and keyboard listeners.
     *
     * Precondition: The canvas must exist.
     * Postcondition: Clicking places towers, F freezes, R restarts,
     * and keys 1 to 4 select the tower type.
     */
    private setupInput(): void {
        this._canvas.addEventListener("click", (event: MouseEvent) => {
            const rect: DOMRect = this._canvas.getBoundingClientRect();
            const clickX: number = event.clientX - rect.left;
            const clickY: number = event.clientY - rect.top;

            this.handleClick(clickX, clickY);
        });

        window.addEventListener("keydown", (event: KeyboardEvent) => {
            this.handleKey(event.key);
        });
    }

    /**
     * Handles one key press.
     *
     * Precondition: key comes from a keydown event.
     * Postcondition: The matching action runs (select tower, freeze,
     * or restart).
     *
     * @param key The key that was pressed
     */
    private handleKey(key: string): void {
        if (key === "1" || key === "2" || key === "3" || key === "4") {
            this._selectedTowerIndex = Number(key) - 1;
        } else if (key === "f" || key === "F") {
            this._model.activateFreeze(this._currentTime);
        } else if (key === "r" || key === "R") {
            if (this.isGameEnded()) {
                this.restart();
            }
        }
    }

    /**
     * Handles a click on the canvas by trying to place the selected
     * tower at that spot.
     *
     * Precondition: clickX and clickY are canvas coordinates.
     * Postcondition: A tower is placed and paid for if the spot is
     * valid and the player can afford it. Otherwise nothing happens.
     *
     * @param clickX The click's x-coordinate on the canvas
     * @param clickY The click's y-coordinate on the canvas
     */
    private handleClick(clickX: number, clickY: number): void {
        if (this.isGameEnded()) {
            return;
        }

        const size: number = GameController.TOWER_SIZE;
        const towerX: number = clickX - size / 2;
        const towerY: number = clickY - size / 2;

        // ================= MAX INTEGRATION =================
        // Replace this placement check with the real tile check, e.g.:
        //   const tile = this._map.getTileAt(clickX, clickY);
        //   if (tile === null || !tile.buildable) { return; }
        //   const towerX = tile.x; const towerY = tile.y;
        // ====================================================
        if (!this.isPlacementValid(towerX, towerY, size)) {
            return;
        }

        const towerModel: TowerModel = this.createSelectedTower(towerX, towerY, size);

        // Only place the tower if the player can afford it.
        if (!this._model.spendMoney(towerModel.cost)) {
            return;
        }

        const filename: string =
            GameController.TOWER_IMAGES[this._selectedTowerIndex] ?? "images/scout.png";
        this._model.addTower(new TowerController(towerModel, filename));
    }

    /**
     * Creates a new tower model of the selected type.
     *
     * Precondition: x, y, and size are valid canvas values.
     * Postcondition: Returns a new tower model (not yet paid for or
     * added to the game).
     *
     * @param x The tower's x-coordinate
     * @param y The tower's y-coordinate
     * @param size The tower's width and height
     * @returns The new tower model
     */
    private createSelectedTower(x: number, y: number, size: number): TowerModel {
        if (this._selectedTowerIndex === 1) {
            return new FraggerTowerModel(x, y, size, size);
        }

        if (this._selectedTowerIndex === 2) {
            return new CommandoTowerModel(x, y, size, size);
        }

        if (this._selectedTowerIndex === 3) {
            return new TankTowerModel(x, y, size, size);
        }

        return new ScoutTowerModel(x, y, size, size);
    }

    /**
     * Checks that a new tower would not overlap an existing tower or
     * the base. This is a temporary check until the map's buildable
     * tiles are connected.
     *
     * Precondition: x, y, and size are valid canvas values.
     * Postcondition: Returns true if the spot is free.
     *
     * @param x The new tower's x-coordinate
     * @param y The new tower's y-coordinate
     * @param size The new tower's width and height
     * @returns true if the tower can be placed there
     */
    private isPlacementValid(x: number, y: number, size: number): boolean {
        for (const tower of this._model.towers) {
            const overlapsX: boolean = x < tower.x + tower.width && x + size > tower.x;
            const overlapsY: boolean = y < tower.y + tower.height && y + size > tower.y;

            if (overlapsX && overlapsY) {
                return false;
            }
        }

        const overlapsBaseX: boolean = x < this._base.x + this._base.width && x + size > this._base.x;
        const overlapsBaseY: boolean = y < this._base.y + this._base.height && y + size > this._base.y;

        return !(overlapsBaseX && overlapsBaseY);
    }

    /**
     * Runs the main game loop.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The game updates, redraws, and requests the next
     * frame. The loop keeps running after the game ends so the end
     * screen stays visible and the player can restart.
     *
     * @param currentTime The current animation time
     */
    private gameLoop(currentTime: number): void {
        this._currentTime = currentTime;

        if (!this.isGameEnded()) {
            this.update(currentTime);
        }

        this.draw(currentTime);

        requestAnimationFrame((newTime: number) => {
            this.gameLoop(newTime);
        });
    }

    /**
     * Updates every game system for one frame, in order:
     * 1. Spawn enemies from the current wave
     * 2. Move enemies (unless frozen)
     * 3. Check for enemies reaching the base
     * 4. Towers attack and create projectiles
     * 5. Projectiles move and apply damage
     * 6. Dead enemies are removed and the player is paid
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The game state advances by one frame.
     *
     * @param currentTime The current animation time
     */
    private update(currentTime: number): void {
        const frozen: boolean = this._model.isFreezeActive(currentTime);

        // ================= MAX INTEGRATION =================
        // 1. Spawn enemies from the current wave, e.g.:
        //      this._spawner.update(currentTime);
        //
        // 2. Move every enemy along the path (skip movement if frozen):
        //      if (!frozen) {
        //          for (const enemy of this._model.enemies) {
        //              enemy.move();
        //          }
        //      }
        //
        // 3. For each enemy that reached the crate:
        //      this._base.takeDamage(10);
        //      this._model.enemyReachedBase(enemy);
        //      (if it was the boss: this._model.loseAllLives();)
        //
        // 4. When the boss is defeated, call: this.winGame();
        // ====================================================

        // Towers attack and create projectiles.
        for (const tower of this._model.towers) {
            const projectile: Projectile | null = tower.attack(this._model.enemies, currentTime);

            if (projectile !== null) {
                this._model.addProjectile(projectile);
            }
        }

        // Projectiles move and apply their damage.
        this._model.updateProjectiles();

        // Dead enemies are removed and the player earns money.
        this._model.removeDeadEnemies();

        // The game ends if the base is destroyed.
        if (this._base.isDestroyed()) {
            this._model.loseAllLives();
        }
    }

    /**
     * Draws the current frame, including the end screens.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The current game state is drawn.
     *
     * @param currentTime The current animation time
     */
    public draw(currentTime: number): void {
        const background: Drawable[] = [];

        // ================= MAX INTEGRATION =================
        // Draw the map first, behind everything:
        //   background.push(this._map);
        // ====================================================

        background.push(this._base);

        this._view.draw(this._model, currentTime, background);

        if (this._isVictory) {
            this._view.drawVictory(this._model);
        } else if (this._model.isGameOver()) {
            this._view.drawGameOver(this._model);
        }
    }

    /**
     * Marks the game as won. Max's wave code should call this when the
     * final boss is defeated.
     *
     * Precondition: None.
     * Postcondition: The victory screen is shown and updates stop.
     */
    public winGame(): void {
        this._isVictory = true;
    }

    /**
     * Checks if the game has ended in a win or a loss.
     *
     * @returns true if the game is over, false otherwise
     */
    private isGameEnded(): boolean {
        return this._isVictory || this._model.isGameOver();
    }

    /**
     * Restarts the game after it has ended.
     *
     * Precondition: None.
     * Postcondition: The model is reset, the base is rebuilt, and a new
     * game begins.
     */
    private restart(): void {
        this._model.reset();
        this._isVictory = false;
        this._selectedTowerIndex = 0;

        this._base = new BaseController(
            20,
            this._canvas.height - 84,
            64,
            64,
            100,
            "images/crate.png"
        );

        // ================= MAX INTEGRATION =================
        // Reset the wave spawner back to wave 1 here, e.g.:
        //   this._spawner.reset();
        // ====================================================
    }
}

export { GameController };