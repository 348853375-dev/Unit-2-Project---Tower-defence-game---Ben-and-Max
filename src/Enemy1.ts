import { Enemy } from "./Enemy.js";

class Enemy1 extends Enemy {
    constructor(health: number, speed: number, x: number, y: number, alive: boolean) {
        super(health, speed, x, y, alive, 32, 32);
    }
}

let aEnemy1 : Enemy = new Enemy1(5, 10, 100, 100, true);