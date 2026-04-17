class Enemy {
    private health : number;
    private speed : number;
    private x : number;
    private y : number;
    private alive : boolean;

    constructor(health : number, speed : number, x : number, y : number, alive : boolean) {
        this.health = health;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    getSpeed() : number {
        return this.speed;
    }

    getPosition() : { x : number; y : number } {
        return { x : this.x, y : this.y };
    }

    setSpeed(newSpeed : number) : void {
        this.speed = newSpeed;
    }

    setPosition(newX : number, newY : number) : void {
        this.x = newX;
        this.y = newY;
    }

    move(newX : number, newY : number) : void {
        this.x += newX * this.speed;
        this.y += newY * this.speed;
    }

    getHealth() : number {
        return this.health;
    }

    isAlive() : boolean {
        return this.alive;
    }

    setHealth(newHealth : number) : void {
        this.health = newHealth;
    }

    takeDamage(amount : number) : void {
        this.health -= amount;

        if (this.health <= 0) {
            this.die();
        }
    }

    die() : void {
        this.alive = false;
    }

    reachBase() : void {
    }
}

export { Enemy };