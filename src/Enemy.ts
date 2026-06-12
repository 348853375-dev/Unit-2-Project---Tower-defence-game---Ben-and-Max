import { GameObject } from "./GameObject.js";

abstract class Enemy extends GameObject {
    private _health : number;
    private _speed : number;
    private _alive : boolean;

    protected _destinationX : number;
    protected _destinationY : number;

    protected _destinationSet : boolean;

    protected constructor(health : number, speed : number, x : number, y : number, alive : boolean, width : number,
        height : number){
        super(x, y, width, height);
        this._health = health;
        this._speed = speed;
        this._alive = alive;

        this._destinationX = x;
        this._destinationY = y;
        this._destinationSet = false;
    }

    public setDestination(x : number, y : number) {
            this._destinationSet = true;
            // save the destination coordinate
            this._destinationX = x;
            this._destinationY = y;
        }

        public move() {
            if ( this._destinationSet == true ){
                this.moveToXY();
            }
        }

        protected moveToXY() {
        // Move horizontally
        if (this._x < this._destinationX) {
            this._x += this._speed;
            if (this._x > this._destinationX) this._x = this._destinationX;
        } else if (this._x > this._destinationX) {
            this._x -= this._speed;
            if (this._x < this._destinationX) this._x = this._destinationX;
        }

        // Move vertically
        if (this._y < this._destinationY) {
            this._y += this._speed;
            if (this._y > this._destinationY) this._y = this._destinationY;
        } else if (this._y > this._destinationY) {
            this._y -= this._speed;
            if (this._y < this._destinationY) this._y = this._destinationY;
        }
    }

    setPosition(newX : number, newY : number) : void {
        this._x = newX;
        this._y = newY;
    }

    getHealth() : number {
        return this._health;
    }

    isAlive() : boolean {
        return this._alive;
    }

    setHealth(newHealth : number) : void {
        this._health = newHealth;
    }

    takeDamage(amount : number) : void {
        this._health -= amount;

        if (this._health <= 0) {
            this.die();
        }
    }

    die() : void {
        this._alive = false;
    }

    reachBase() : void {
    }
}

export { Enemy };