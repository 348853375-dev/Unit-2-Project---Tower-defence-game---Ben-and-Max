class BaseModel {
    private _health: number;
    private _x: number;
    private _y: number;

    constructor(health: number, x: number, y: number) {
        this._health = health;
        this._x = x;
        this._y = y;
    }

    public get health(): number { return this._health; }
    public set health(value: number) { this._health = value; }

    public get x(): number { return this._x; }
    public get y(): number { return this._y; }

    public takeDamage(amount: number): void {
        this._health -= amount;

        if (this._health < 0) {
            this._health = 0;
        }
    }

    public isDestroyed(): boolean {
        return this._health === 0;
    }
}

export { BaseModel };