/**
 * The GameModel stores the full state of the game.
 *
 * It tracks the player's money, lives, score, and round, plus every
 * tower, enemy, and projectile currently in the game. It also manages
 * the freeze ability. The model contains no drawing code, which keeps
 * it separate from the View (part of the MVC design).
 */
class GameModel {
    /** The money the player starts the game with */
    static STARTING_MONEY = 300;
    /** The lives the player starts the game with */
    static STARTING_LIVES = 4;
    /** How long the freeze ability lasts, in milliseconds */
    static FREEZE_DURATION = 5000;
    /** What the freeze ability costs to use */
    static FREEZE_COST = 150;
    _money;
    _lives;
    _round;
    _score;
    /** Stores all tower controllers in the game */
    _towers;
    /** Stores all enemy units that can be damaged */
    _enemies;
    /** Stores all projectiles currently flying */
    _projectiles;
    /** The time the current freeze ends, or 0 if not frozen */
    _freezeEndTime;
    /**
     * Creates the game model.
     *
     * Precondition: None.
     * Postcondition: The game starts with default money, lives, score,
     * round, and empty tower, enemy, and projectile lists.
     */
    constructor() {
        this._money = GameModel.STARTING_MONEY;
        this._lives = GameModel.STARTING_LIVES;
        this._round = 1;
        this._score = 0;
        this._towers = [];
        this._enemies = [];
        this._projectiles = [];
        this._freezeEndTime = 0;
    }
    /** The player's current money */
    get money() {
        return this._money;
    }
    /** The player's current lives */
    get lives() {
        return this._lives;
    }
    /** The current round */
    get round() {
        return this._round;
    }
    /** The player's current score */
    get score() {
        return this._score;
    }
    /** The towers currently in the game */
    get towers() {
        return this._towers;
    }
    /** The enemies currently in the game */
    get enemies() {
        return this._enemies;
    }
    /** The projectiles currently in the game */
    get projectiles() {
        return this._projectiles;
    }
    /**
     * Adds a tower to the game.
     *
     * Precondition: tower must be a valid TowerController.
     * Postcondition: The tower is added to the game.
     *
     * @param tower The tower controller being added
     */
    addTower(tower) {
        this._towers.push(tower);
    }
    /**
     * Adds an enemy to the game.
     *
     * Precondition: enemy must implement DamageableUnit.
     * Postcondition: The enemy is added to the game.
     *
     * @param enemy The enemy unit being added
     */
    addEnemy(enemy) {
        this._enemies.push(enemy);
    }
    /**
     * Adds a projectile to the game.
     *
     * Precondition: projectile must be a valid Projectile.
     * Postcondition: The projectile is added to the game.
     *
     * @param projectile The projectile being added
     */
    addProjectile(projectile) {
        this._projectiles.push(projectile);
    }
    /**
     * Updates every projectile and removes finished ones.
     *
     * Precondition: None.
     * Postcondition: All projectiles move one frame, hits apply their
     * damage, and finished projectiles are removed from the game.
     */
    updateProjectiles() {
        for (const projectile of this._projectiles) {
            projectile.update(this._enemies);
        }
        this._projectiles = this._projectiles.filter((projectile) => {
            return !projectile.isFinished;
        });
    }
    /**
     * Removes dead enemies and pays the player for each one defeated.
     *
     * Each enemy is worth its own moneyValue (Robot 001 = $50,
     * Robot 002 = $125, Robot 003 = $200). The score increases by the
     * same amount.
     *
     * Precondition: Enemies must implement isDead and moneyValue.
     * Postcondition: Dead enemies are removed, and money and score are
     * increased for every enemy defeated.
     */
    removeDeadEnemies() {
        for (const enemy of this._enemies) {
            if (enemy.isDead()) {
                this.addMoney(enemy.moneyValue);
                this._score += enemy.moneyValue;
            }
        }
        this._enemies = this._enemies.filter((enemy) => {
            return !enemy.isDead();
        });
    }
    /**
     * Removes an enemy that reached the base, without paying the player.
     *
     * Precondition: enemy must currently be in the game.
     * Postcondition: The enemy is removed and the player loses a life.
     *
     * @param enemy The enemy that reached the base
     */
    enemyReachedBase(enemy) {
        this._enemies = this._enemies.filter((other) => {
            return other !== enemy;
        });
        this.loseLife();
    }
    /**
     * Adds money to the player.
     *
     * Precondition: amount should be greater than 0.
     * Postcondition: Player money increases.
     *
     * @param amount The amount of money added
     */
    addMoney(amount) {
        this._money += Math.max(0, amount);
    }
    /**
     * Spends money if the player has enough.
     *
     * Precondition: amount should be greater than 0.
     * Postcondition: Money is removed if the player can afford it.
     *
     * @param amount The amount of money spent
     * @returns true if money was spent, false otherwise
     */
    spendMoney(amount) {
        if (amount <= 0) {
            return false;
        }
        if (this._money < amount) {
            return false;
        }
        this._money -= amount;
        return true;
    }
    /**
     * Removes money from the player even if it makes them go to 0.
     * Used by Robot 003, which steals coins when it spawns.
     *
     * Precondition: amount should be greater than 0.
     * Postcondition: Money is reduced but never below 0.
     *
     * @param amount The amount of money stolen
     */
    stealMoney(amount) {
        this._money = Math.max(0, this._money - Math.max(0, amount));
    }
    /**
     * Activates the freeze ability if the player can afford it.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: If the player had enough money, enemies are frozen
     * for FREEZE_DURATION milliseconds.
     *
     * @param currentTime The current animation time in milliseconds
     * @returns true if the freeze was activated, false otherwise
     */
    activateFreeze(currentTime) {
        if (this.isFreezeActive(currentTime)) {
            return false;
        }
        if (!this.spendMoney(GameModel.FREEZE_COST)) {
            return false;
        }
        this._freezeEndTime = currentTime + GameModel.FREEZE_DURATION;
        return true;
    }
    /**
     * Checks if enemies are currently frozen.
     *
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: Returns true while the freeze is active.
     *
     * @param currentTime The current animation time in milliseconds
     * @returns true if enemies should not move, false otherwise
     */
    isFreezeActive(currentTime) {
        return currentTime < this._freezeEndTime;
    }
    /**
     * Removes one life from the player.
     *
     * Precondition: None.
     * Postcondition: The player's lives decrease but never go below 0.
     */
    loseLife() {
        this._lives = Math.max(0, this._lives - 1);
    }
    /**
     * Removes every life from the player. Used when the boss reaches
     * the base, since the boss takes all 3 lives.
     *
     * Precondition: None.
     * Postcondition: The player has 0 lives and the game is over.
     */
    loseAllLives() {
        this._lives = 0;
    }
    /**
     * Goes to the next round.
     *
     * Precondition: None.
     * Postcondition: The round number increases by 1.
     */
    nextRound() {
        this._round++;
    }
    /**
     * Checks if the game is over.
     *
     * @returns true if the player has no lives left, false otherwise
     */
    isGameOver() {
        return this._lives <= 0;
    }
    /**
     * Resets the game back to its starting state.
     * Used when the player restarts after losing.
     *
     * Precondition: None.
     * Postcondition: Money, lives, score, and round return to their
     * starting values and all towers, enemies, and projectiles are
     * removed.
     */
    reset() {
        this._money = GameModel.STARTING_MONEY;
        this._lives = GameModel.STARTING_LIVES;
        this._round = 1;
        this._score = 0;
        this._towers = [];
        this._enemies = [];
        this._projectiles = [];
        this._freezeEndTime = 0;
    }
}
export { GameModel };
//# sourceMappingURL=GameModel.js.map