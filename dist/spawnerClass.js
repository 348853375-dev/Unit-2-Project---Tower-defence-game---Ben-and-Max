/**
 * Class for the enemy spawner
 * The spawner generates enemies during a wave.
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
 */
class Spawner {
    // used to control how often the enemies are spawned (milliseconds between spawns)
    _spawnRate;
    // the enemy types left to spawn in the current wave, in order
    _enemyQueue;
    // the function used to create enemies (provided by the GameController)
    _createEnemy;
    // the time the wave is allowed to start spawning (start delay)
    _spawningStartTime;
    // the time the last enemy was spawned
    _lastSpawnTime;
    // true while a wave is running
    _isActive;
    /**
     * Creates a Spawner object
     *
     * Preconditions:
     *
     * 1. createEnemy must be a function that returns a new enemy
     *
     * Postconditions:
     *
     * 1. spawner is created and waits for startWave to be called
     *
     * @param createEnemy the function used to create one enemy of a given type
     */
    constructor(createEnemy) {
        this._createEnemy = createEnemy;
        this._spawnRate = 1000;
        this._enemyQueue = [];
        this._spawningStartTime = 0;
        this._lastSpawnTime = 0;
        this._isActive = false;
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
     * @returns spawn rate value in milliseconds between spawns
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
     * @param newRate new spawn rate value in milliseconds
     */
    set SpawnRate(newRate) {
        this._spawnRate = Math.max(1, newRate);
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
        return this._enemyQueue.length;
    }
    /**
     * Checks if the current wave has finished spawning
     *
     * Preconditions:
     *
     * 1. spawner object exists
     *
     * Postconditions:
     *
     * 1. returns true if every enemy in the wave has been spawned
     *
     * @returns true if there is nothing left to spawn
     */
    isFinishedSpawning() {
        return this._enemyQueue.length === 0;
    }
    /**
     * Starts a new wave of enemies
     *
     * Preconditions:
     *
     * 1. enemyTypes must contain at least 1 enemy type
     * 2. spawnRate must be greater than 0
     * 3. startDelay must be greater or equal to 0
     * 4. currentTime should come from requestAnimationFrame
     *
     * Postconditions:
     *
     * 1. the spawner waits for the start delay, then begins spawning
     *    one enemy from the queue every spawnRate milliseconds
     *
     * @param enemyTypes the enemy types to spawn this wave, in order
     * @param spawnRate milliseconds between each spawn
     * @param startDelay milliseconds to wait before the first spawn
     * @param currentTime the current animation time in milliseconds
     */
    startWave(enemyTypes, spawnRate, startDelay, currentTime) {
        this._enemyQueue = enemyTypes.slice();
        this._spawnRate = Math.max(1, spawnRate);
        this._spawningStartTime = currentTime + Math.max(0, startDelay);
        this._lastSpawnTime = 0;
        this._isActive = true;
    }
    /**
     * Updates the spawner over time
     *
     * Preconditions:
     *
     * 1. currentTime should come from requestAnimationFrame
     *
     * Postconditions:
     *
     * 1. spawner checks if it should spawn a new enemy
     * 2. calls spawnEnemy if the start delay is over and enough
     *    time has passed since the last spawn
     *
     * @param currentTime the current animation time in milliseconds
     * @returns the new enemy that was spawned, or null if it is not time yet
     */
    updateSpawner(currentTime) {
        if (!this._isActive || this._enemyQueue.length === 0) {
            return null;
        }
        // still waiting for the wave's start delay
        if (currentTime < this._spawningStartTime) {
            return null;
        }
        // not enough time has passed since the last spawn
        if (currentTime - this._lastSpawnTime < this._spawnRate) {
            return null;
        }
        this._lastSpawnTime = currentTime;
        return this.spawnEnemy();
    }
    /**
     * Spawns a new enemy
     *
     * Preconditions:
     *
     * 1. the enemy queue must not be empty
     *
     * Postconditions:
     *
     * 1. a new enemy object is created using the next type in the queue
     * 2. the enemies remaining decreases by 1
     *
     * @returns a new enemy, or null if the queue was empty
     */
    spawnEnemy() {
        const enemyType = this._enemyQueue.shift();
        if (enemyType === undefined) {
            return null;
        }
        return this._createEnemy(enemyType);
    }
    /**
     * Stops the spawner and clears the wave
     *
     * Preconditions:
     *
     * 1. spawner object exists
     *
     * Postconditions:
     *
     * 1. spawning stops and the queue is emptied (used on restart)
     */
    reset() {
        this._enemyQueue = [];
        this._isActive = false;
        this._lastSpawnTime = 0;
        this._spawningStartTime = 0;
    }
}
// export the Spawner class and the factory type
export { Spawner };
//# sourceMappingURL=spawnerClass.js.map