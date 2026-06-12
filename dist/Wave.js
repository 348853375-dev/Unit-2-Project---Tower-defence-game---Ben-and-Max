/**
 * A Wave stores the information about one wave of enemies: which
 * enemy types spawn, how fast they spawn, and how long the player
 * gets to build before the wave starts.
 *
 * The Wave is data only. The Spawner is the machine that reads this
 * data and actually creates the enemies (Wave = the recipe,
 * Spawner = the cook).
 *
 * Enemy types used: "robot1", "robot2", "robot3", "boss".
 */
class Wave {
    _waveNumber;
    _enemyTypes;
    _spawnRate;
    _startDelay;
    /**
     * Creates a wave.
     *
     * Precondition: enemyTypes should contain at least 1 type,
     * spawnRate should be greater than 0, and startDelay should be 0
     * or greater.
     * Postcondition: A wave is created with its settings.
     *
     * @param waveNumber Which wave this is (1 to 4)
     * @param enemyTypes The enemy types to spawn, in order
     * @param spawnRate Milliseconds between each spawn
     * @param startDelay Milliseconds of build time before spawning starts
     */
    constructor(waveNumber, enemyTypes, spawnRate, startDelay) {
        this._waveNumber = waveNumber;
        this._enemyTypes = enemyTypes.slice();
        this._spawnRate = Math.max(1, spawnRate);
        this._startDelay = Math.max(0, startDelay);
    }
    /** Which wave this is */
    get waveNumber() {
        return this._waveNumber;
    }
    /** The enemy types this wave spawns, in order */
    get enemyTypes() {
        return this._enemyTypes.slice();
    }
    /** Milliseconds between each spawn */
    get spawnRate() {
        return this._spawnRate;
    }
    /** Milliseconds of build time before the wave starts spawning */
    get startDelay() {
        return this._startDelay;
    }
    /** The number of enemies in this wave */
    get enemyCount() {
        return this._enemyTypes.length;
    }
    /**
     * Builds the level's four waves from the project plan:
     *
     * Wave 1: only Robot 001, spawned slowly, 15 seconds of build time
     * Wave 2: Robots 001 and 002, medium pace, 10 seconds of build time
     * Wave 3: all 3 robots, very fast pace, 7 seconds of build time
     * Wave 4: all 3 robots fast, then the BOSS, 5 seconds of build time
     *
     * Precondition: None.
     * Postcondition: Returns the four waves in order.
     *
     * @returns The level's waves, ready for the spawner
     */
    static createLevelWaves() {
        const wave1 = new Wave(1, ["robot1", "robot1", "robot1", "robot1", "robot1"], 2000, 15000);
        const wave2 = new Wave(2, ["robot1", "robot1", "robot2", "robot1", "robot2", "robot1", "robot2"], 1400, 10000);
        const wave3 = new Wave(3, ["robot1", "robot2", "robot1", "robot3", "robot2", "robot1", "robot3", "robot2", "robot3"], 800, 7000);
        const wave4 = new Wave(4, ["robot2", "robot3", "robot2", "robot3", "robot3", "boss"], 800, 5000);
        return [wave1, wave2, wave3, wave4];
    }
}
export { Wave };
//# sourceMappingURL=Wave.js.map