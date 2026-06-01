import { TowerController } from "./TowerController.js";
import { DamageableUnit } from "./DamageableUnit.js";

class GameModel {
    private _money: number;
    private _lives: number;
    private _round: number;

    /** Stores all tower controllers in the game */
    private _towers: TowerController[];

    /** Stores all enemy units that can be damaged */
    private _enemies: DamageableUnit[];

    /**
     * Creates the game model.
     * Precondition: None.
     * Postcondition: The game starts with default money, lives, round, towers, and enemies.
     */
    constructor() {
        this._money = 100;
        this._lives = 3;
        this._round = 1;

        this._towers = [];
        this._enemies = [];
    }

    /** The player's current money */
    public get money(): number {
        return this._money;
    }

    /** The player's current lives */
    public get lives(): number {
        return this._lives;
    }

    /** The current round */
    public get round(): number {
        return this._round;
    }

    /** The towers currently in the game */
    public get towers(): TowerController[] {
        return this._towers;
    }

    /** The enemies currently in the game */
    public get enemies(): DamageableUnit[] {
        return this._enemies;
    }

    /**
     * Adds a tower to the game.
     * Precondition: tower must be a valid TowerController.
     * Postcondition: The tower is added to the game.
     * @param tower The tower controller being added
     */
    public addTower(tower: TowerController): void {
        this._towers.push(tower);
    }

    /**
     * Adds an enemy to the game.
     * Precondition: enemy must implement DamageableUnit.
     * Postcondition: The enemy is added to the game.
     * @param enemy The enemy unit being added
     */
    public addEnemy(enemy: DamageableUnit): void {
        this._enemies.push(enemy);
    }
}

export { GameModel };