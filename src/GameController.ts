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
import { WorldController } from "./WorldController.js";
import { Spawner } from "./spawnerClass.js";
import { Wave } from "./Wave.js";
import { Enemy } from "./Enemy.js";
import { Enemy1 } from "./Enemy1.js";
import { Enemy2 } from "./Enemy2.js";
import { Enemy3 } from "./Enemy3.js";
import { Boss } from "./Boss.js";
import { DamageableUnit } from "./DamageableUnit.js";
import { Tile } from "./Tile.js";

/**
 * The GameController runs the game.
 *
 * It owns the game loop, handles the player's mouse and keyboard input,
 * and connects every system: the map (WorldController), the enemies
 * (Spawner and Waves), the towers, the projectiles, the base, the
 * Model (game state), and the View (drawing).
 *
 * Player controls:
 * - Keys 1 to 4 select which tower to place (Scout, Fragger, Commando, Tank)
 * - Click a buildable tile to place the selected tower
 * - F activates the freeze ability
 * - R restarts the game after it ends
 */
class GameController {
    /** The damage the base takes when a normal robot reaches it */
    private static readonly ROBOT_BASE_DAMAGE: number = 34;

    private _model: GameModel;
    private _view: GameView;
    private _canvas: HTMLCanvasElement;
    private _base: BaseController;
    private _worldController: WorldController;
    private _spawner: Spawner;

    /** The level's four waves, in order */
    private _waves: Wave[];

    /** Which wave is currently running (0 to 3) */
    private _waveIndex: number;

    /** True once the current wave has been handed to the spawner */
    private _waveStarted: boolean;

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
     * Postcondition: The game controller is created, the map, spawner,
     * and waves are built, input listeners are attached, and the game
     * loop starts.
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

        // The map: tile grid plus the waypoints enemies walk.
        this._worldController = new WorldController(this._canvas.width, this._canvas.height);

        // The weapon crate sits on the last waypoint (bottom left).
        this._base = this.createBase();

        // The spawner creates enemies; this factory tells it how.
        this._spawner = new Spawner((enemyType: string) => {
            return this.createEnemy(enemyType);
        });

        this._waves = Wave.createLevelWaves();
        this._waveIndex = 0;
        this._waveStarted = false;

        this._selectedTowerIndex = 0;
        this._isVictory = false;
        this._currentTime = 0;

        this.setupInput();

        this.gameLoop(0);
    }

    /**
     * Creates the base on the tile at the end of the enemy path.
     *
     * Precondition: The world controller must exist.
     * Postcondition: Returns a new base centered on the last waypoint.
     *
     * @returns The new base controller
     */
    private createBase(): BaseController {
        const waypoints: { x: number; y: number }[] = this._worldController.waypoints;
        const lastPoint: { x: number; y: number } = waypoints[waypoints.length - 1]!;
        const size: number = this._worldController.tileLength;

        return new BaseController(
            lastPoint.x - size / 2,
            lastPoint.y - size / 2,
            size,
            size,
            100,
            "images/crate.png"
        );
    }

    /**
     * Creates one enemy of the given type at the spawn point with the
     * path already set. Used by the spawner's factory.
     *
     * Precondition: enemyType should be robot1, robot2, robot3, or boss.
     * Postcondition: Returns a new enemy ready to walk the path.
     *
     * @param enemyType The type of enemy to create
     * @returns The new enemy
     */
    private createEnemy(enemyType: string): Enemy {
        const spawnPoint: { x: number; y: number } = this._worldController.waypoints[0]!;

        let enemy: Enemy;

        if (enemyType === "robot2") {
            enemy = new Enemy2(0, 0);
        } else if (enemyType === "robot3") {
            enemy = new Enemy3(0, 0);
        } else if (enemyType === "boss") {
            enemy = new Boss(0, 0);
        } else {
            enemy = new Enemy1(0, 0);
        }

        // Center the enemy on the spawn waypoint.
        enemy.x = spawnPoint.x - enemy.width / 2;
        enemy.y = spawnPoint.y - enemy.height / 2;

        // The waypoints are tile centers; shift them so the enemy's
        // center (not its top-left corner) walks the path.
        const offsetPath: { x: number; y: number }[] = this._worldController.waypoints.map(
            (point: { x: number; y: number }) => {
                return {
                    x: point.x - enemy.width / 2,
                    y: point.y - enemy.height / 2
                };
            }
        );

        enemy.setPath(offsetPath);

        return enemy;
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
     * tower on the clicked tile.
     *
     * The tower is only placed if the tile is buildable, the tile is
     * empty, and the player can afford the tower. The tower snaps to
     * the tile's position.
     *
     * Precondition: clickX and clickY are canvas coordinates.
     * Postcondition: A tower is placed and paid for, or nothing happens.
     *
     * @param clickX The click's x-coordinate on the canvas
     * @param clickY The click's y-coordinate on the canvas
     */
    private handleClick(clickX: number, clickY: number): void {
        if (this.isGameEnded()) {
            return;
        }

        // The real tile check: only buildable tiles accept towers.
        const tile: Tile | null = this._worldController.getTileAt(clickX, clickY);

        if (tile === null || !tile.buildable) {
            return;
        }

        // Only one tower per tile.
        for (const tower of this._model.towers) {
            if (tower.containsPoint(tile.centerX, tile.centerY)) {
                return;
            }
        }

        // The tower snaps to the tile.
        const towerModel: TowerModel = this.createSelectedTower(
            tile.x,
            tile.y,
            this._worldController.tileLength
        );

        // Only place the tower if the player can afford it.
        if (!this._model.spendMoney(towerModel.cost)) {
            return;
        }

        const towerImages: string[] = [
            "images/scout.png",
            "images/fragger.png",
            "images/commando.png",
            "images/tank.png"
        ];

        const filename: string = towerImages[this._selectedTowerIndex] ?? "images/scout.png";
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
     * 1. The wave system starts waves and spawns enemies
     * 2. Enemies move along the path (unless frozen)
     * 3. Enemies that reached the crate damage the base and cost lives
     * 4. Robot 002 and the Boss slow nearby towers
     * 5. Towers attack and create projectiles
     * 6. Projectiles move and apply damage
     * 7. Defeating the Boss wins the game
     * 8. Dead enemies are removed and the player is paid
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The game state advances by one frame.
     *
     * @param currentTime The current animation time
     */
    private update(currentTime: number): void {
        this.updateWaves(currentTime);

        // Move every enemy, unless the freeze ability is active.
        if (!this._model.isFreezeActive(currentTime)) {
            for (const unit of this._model.enemies) {
                if (unit instanceof Enemy) {
                    unit.move();
                }
            }
        }

        this.handleEnemiesReachingBase();
        this.applyTowerSlows();

        // Towers attack and create projectiles.
        for (const tower of this._model.towers) {
            const projectile: Projectile | null = tower.attack(this._model.enemies, currentTime);

            if (projectile !== null) {
                this._model.addProjectile(projectile);
            }
        }

        // Projectiles move and apply their damage.
        this._model.updateProjectiles();

        // Defeating the Boss wins the game.
        for (const unit of this._model.enemies) {
            if (unit instanceof Boss && unit.isDead()) {
                this.winGame();
            }
        }

        // Dead enemies are removed and the player earns money.
        this._model.removeDeadEnemies();

        // The game is lost if the base is destroyed.
        if (this._base.isDestroyed()) {
            this._model.loseAllLives();
        }
    }

    /**
     * Runs the wave system: starts the current wave, spawns its
     * enemies, and moves to the next wave when the field is clear.
     *
     * Robot 003 and the Boss steal coins from the player the moment
     * they spawn.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: Enemies spawn on schedule and waves advance.
     *
     * @param currentTime The current animation time
     */
    private updateWaves(currentTime: number): void {
        const currentWave: Wave | undefined = this._waves[this._waveIndex];

        if (currentWave === undefined) {
            return;
        }

        // Hand the wave to the spawner once.
        if (!this._waveStarted) {
            this._spawner.startWave(
                currentWave.enemyTypes,
                currentWave.spawnRate,
                currentWave.startDelay,
                currentTime
            );
            this._waveStarted = true;
        }

        // Spawn an enemy if it is time.
        const newEnemy: DamageableUnit | null = this._spawner.updateSpawner(currentTime);

        if (newEnemy !== null) {
            this._model.addEnemy(newEnemy);

            // Robot 003 and the Boss steal coins on spawn.
            if (newEnemy instanceof Enemy3) {
                this._model.stealMoney(Enemy3.STEAL_AMOUNT);
            } else if (newEnemy instanceof Boss) {
                this._model.stealMoney(Boss.STEAL_AMOUNT);
            }
        }

        // When the wave is fully spawned and the field is clear,
        // move to the next wave.
        const waveCleared: boolean =
            this._spawner.isFinishedSpawning() && this._model.enemies.length === 0;

        if (this._waveStarted && waveCleared) {
            this._waveIndex++;
            this._waveStarted = false;
            this._model.nextRound();
        }
    }

    /**
     * Handles enemies that walked the whole path and reached the crate.
     *
     * A normal robot damages the base and costs the player 1 life.
     * The Boss takes all 3 lives at once, ending the game.
     *
     * Precondition: None.
     * Postcondition: Enemies at the crate are removed and lives are lost.
     */
    private handleEnemiesReachingBase(): void {
        const arrivedEnemies: Enemy[] = [];

        for (const unit of this._model.enemies) {
            if (unit instanceof Enemy && unit.hasReachedEnd()) {
                arrivedEnemies.push(unit);
            }
        }

        for (const enemy of arrivedEnemies) {
            if (enemy instanceof Boss) {
                this._base.takeDamage(this._base.health);
                this._model.loseAllLives();
            } else {
                this._base.takeDamage(GameController.ROBOT_BASE_DAMAGE);
                this._model.loseLife();
            }

            // Remove the enemy without paying the player.
            enemy.die();
            this._model.enemyReachedBase(enemy);
        }
    }

    /**
     * Applies Robot 002's and the Boss's special ability: slowing the
     * fire rate of nearby towers.
     *
     * Every frame, all towers are reset to normal speed, then every
     * tower near a Robot 002 or the Boss is slowed. Towers return to
     * normal automatically when the robot dies or walks away.
     *
     * Precondition: None.
     * Postcondition: Towers near slowing robots fire at half speed.
     */
    private applyTowerSlows(): void {
        for (const tower of this._model.towers) {
            tower.setFireRateMultiplier(1);
        }

        for (const unit of this._model.enemies) {
            const isSlower: boolean = unit instanceof Enemy2 || unit instanceof Boss;

            if (!isSlower) {
                continue;
            }

            const enemyCenterX: number = unit.x + unit.width / 2;
            const enemyCenterY: number = unit.y + unit.height / 2;

            for (const tower of this._model.towers) {
                const towerCenterX: number = tower.x + tower.width / 2;
                const towerCenterY: number = tower.y + tower.height / 2;

                const distanceX: number = enemyCenterX - towerCenterX;
                const distanceY: number = enemyCenterY - towerCenterY;
                const distance: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distance <= Enemy2.SLOW_RANGE) {
                    tower.setFireRateMultiplier(Enemy2.SLOW_MULTIPLIER);
                }
            }
        }
    }

    /**
     * Draws the current frame: map, base, enemies, towers,
     * projectiles, HUD, and the end screens.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The current game state is drawn.
     *
     * @param currentTime The current animation time
     */
    public draw(currentTime: number): void {
        const background: Drawable[] = [];

        // The map draws first, behind everything.
        background.push(this._worldController);
        background.push(this._base);

        this._view.draw(this._model, currentTime, background);

        if (this._isVictory) {
            this._view.drawVictory(this._model);
        } else if (this._model.isGameOver()) {
            this._view.drawGameOver(this._model);
        }
    }

    /**
     * Marks the game as won. Called when the Boss is defeated.
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
     * Postcondition: The model, base, spawner, and waves reset and a
     * new game begins.
     */
    private restart(): void {
        this._model.reset();
        this._spawner.reset();

        this._base = this.createBase();

        this._waveIndex = 0;
        this._waveStarted = false;
        this._selectedTowerIndex = 0;
        this._isVictory = false;
    }
}

export { GameController };