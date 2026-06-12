import { Enemy } from "./Enemy.js";

class Wave {
    private waveNumber : number;
    private enemyCount : number;
    private difficulty : number;

    constructor(waveNumber : number, enemyCount : number, difficulty : number) {
        this.waveNumber = waveNumber;
        this.enemyCount = enemyCount;
        this.difficulty = difficulty;
    }

    getWaveNumber() : number {
        return this.waveNumber;
    }

    getEnemyCount() : number {
        return this.enemyCount;
    }

    getDifficulty() : number {
        return this.difficulty;
    }

    setWaveNumber(newWave : number) : void {
        this.waveNumber = newWave;
    }

    setEnemyCount(newCount : number) : void {
        this.enemyCount = newCount;
    }

    setDifficulty(newDifficulty : number) : void {
        this.difficulty = newDifficulty;
    }

    generateEnemies() : Enemy[] {
    const enemies : Enemy[] = [];

        for (let i = 0; i < this.enemyCount; i++) {
            const enemy = new Enemy(
                100 * this.difficulty,   // health scaling
                1 + this.difficulty,     // speed scaling
                0,                       // x
                0,                       // y
                true                     // alive
            );
            enemies.push(enemy);
        }

        return enemies;
    }   

    increaseDifficulty() : void {
        this.difficulty += 1;
    }
}
