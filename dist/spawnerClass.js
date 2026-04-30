/**
 * Class for the enemy spawner
 * The spawner is generates enemies during a wave.
 *
 * 1. Controls how fast enemies are spawned
 * 2. Tracks how many enemies are left to spawn
 * 3. Creates enemies of different types
 * 4. Starts and manages enemy waves
 *
 * What the class does
 *
 * 1. Track spawn rate
 * 2. Track remaining enemies
 * 3. Spawn enemies into the game
 * 4. Control waves
 *
 */
class Spawner {
    // used to control how often the enemies are spawned
    _spawnRate;
    // stores how many enemies are left to spawn in the current wave
    _enemiesRemaining;
    /**
     * Creates a Spawner object
     *
     * Preconditions:
     *
     * 1. the spawn rate must be greater than 0
     * 2. the enemies remaining must be greater or equal to 0
     *
     * Postconditions:
     *
     * 1. spawner starts with the correct spawn rate and enemy count
     *
     * @param spawnRate how fast enemies spawn
     * @param enemiesRemaining number of enemies to spawn in the wave
     */
    constructor(spawnRate, enemiesRemaining) {
        this._spawnRate = spawnRate;
        this._enemiesRemaining = enemiesRemaining;
    }
    /**
     * Gets the spawn rate
     *
     * Preconditions:
     *
     * 1. spawner object exists
     *
     * Postconditions:
     *
     * 1. returns the current spawn rate
     *
     * @returns spawn rate value
     */
    get SpawnRate() {
        return this._spawnRate;
    }
    /**
     * Sets the spawn rate
     *
     * Preconditions:
     *
     * 1. the new rate must be greater than 0
     *
     * Postconditions:
     *
     * 1. spawn rate is updated
     *
     * @param newRate new spawn rate value
     */
    set SpawnRate(newRate) {
        this._spawnRate = newRate;
    }
    /**
     * Gets the number of enemies remaining
     *
     * Preconditions:
     *
     * 1. spawner object exists
     *
     * Postconditions:
     *
     * 1. returns the number of enemies left to spawn
     *
     * @returns number of enemies remaining
     */
    get EnemiesRemaining() {
        return this._enemiesRemaining;
    }
    /**
     * Sets the number of enemies remaining
     *
     * Preconditions:
     *
     * 1. the new amouont must be greater or equal to 0
     *
     * Postconditions:
     *
     * 1. enemies remaining is updated
     *
     * @param newAmount new number of enemies
     */
    // Reason for the missing class is that max is currently working on the enemy class and it is not fully added yet,
    // the code breaks when I add a class that does not exist yet
    set EnemiesRemaining(newAmount) {
        this._enemiesRemaining = newAmount;
    }
    /**
     * Spawns a new enemy
     *
     * Preconditions:
     *
     * 1. the enemy type must be a real type ( normal, fast, boss)
     * 2. the enemies remaining must be greater than 0
     *
     * Postconditions:
     *
     * 1. a new enemy object is created
     * 2. the enemies remaining decreases by 1
     *
     * @param enemyType type of enemy to spawn
     * @returns a new Enemy object
     */
    // Reason for the missing class is that max is currently working on the enemy class and it is not fully added yet,
    // the code breaks when I add a class that does not exist yet
    spawnEnemy(enemyType) {
        this._enemiesRemaining--;
        // placeholder for now until all enemies are made
        return { type: enemyType };
    }
    /**
     * Starts a new wave of enemies
     *
     * Preconditions:
     *
     * 1. enemiesRemaining must be greater than 0
     *
     * Postconditions:
     *
     * 1. spawning process begins
     *
     */
    startWave() {
    }
    /**
     * Updates the spawner over time
     *
     * Preconditions:
     *
     * 1. spawner object exists
     *
     * Postconditions:
     *
     * 1. spawner checks if it should spawn a new enemy
     * 2. calls spawnEnemy if conditions are met
     *
     */
    updateSpawner() {
    }
}
// export the Spawner class
export { Spawner };
//# sourceMappingURL=spawnerClass.js.map