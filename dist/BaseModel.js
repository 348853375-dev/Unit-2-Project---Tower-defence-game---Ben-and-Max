class BaseModel {
    _health;
    _x;
    _y;
    constructor(health, x, y) {
        this._health = health;
        this._x = x;
        this._y = y;
    }
    get health() { return this._health; }
    set health(value) { this._health = value; }
    get x() { return this._x; }
    get y() { return this._y; }
    takeDamage(amount) {
        this._health -= amount;
        if (this._health < 0) {
            this._health = 0;
        }
    }
    isDestroyed() {
        return this._health === 0;
    }
}
export { BaseModel };
//# sourceMappingURL=BaseModel.js.map