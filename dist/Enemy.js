import { GameObject } from "./GameObject.js";
import { GameImage } from "./GameImage.js";
/**
 * Enemy is the abstract parent class for every robot in the game.
 *
 * It stores health, speed, and money value, and moves the enemy along
 * a path of waypoints toward the base. Each child robot (Enemy1,
 * Enemy2, Enemy3, Boss) sets its own stats and color.
 *
 * Enemy implements DamageableUnit so towers and projectiles can attack
 * it, and Drawable so the GameView can draw it.
 */
class Enemy extends GameObject {
    _health;
    _maxHealth;
    _speed;
    _alive;
    _moneyValue;
    /** The color used to draw this enemy if its image is missing */
    _color;
    /** The enemy's image */
    _gameImage;
    /** The list of points the enemy walks through, in order */
    _path;
    /** Which waypoint the enemy is currently walking toward */
    _pathIndex;
    /**
     * Creates an enemy.
     *
     * Precondition: health, speed, width, and height should be greater
     * than 0, and moneyValue should be 0 or greater.
     * Postcondition: An enemy is created at its starting position. It
     * does not move until setPath is called.
     *
     * @param x The enemy's starting x-coordinate
     * @param y The enemy's starting y-coordinate
     * @param width The enemy's width
     * @param height The enemy's height
     * @param health The enemy's starting health
     * @param speed The enemy's movement speed in pixels per frame
     * @param moneyValue The money the player earns when this enemy dies
     * @param color The fallback color if the image has not loaded
     * @param filename The image file used for this enemy
     */
    constructor(x, y, width, height, health, speed, moneyValue, color, filename) {
        super(x, y, width, height);
        this._health = Math.max(1, health);
        this._maxHealth = this._health;
        this._speed = Math.max(0.1, speed);
        this._moneyValue = Math.max(0, moneyValue);
        this._alive = true;
        this._color = color;
        this._gameImage = new GameImage(filename, this);
        this._path = [];
        this._pathIndex = 0;
    }
    /** The enemy's current health */
    get health() {
        return this._health;
    }
    /** Sets the enemy's health (never below 0) */
    set health(value) {
        this._health = Math.max(0, value);
    }
    /** The enemy's movement speed in pixels per frame */
    get speed() {
        return this._speed;
    }
    /** Sets the enemy's movement speed (used by the Boss to speed up) */
    set speed(value) {
        this._speed = Math.max(0.1, value);
    }
    /** The money the player earns when this enemy is defeated */
    get moneyValue() {
        return this._moneyValue;
    }
    /**
     * Gives the enemy the path of waypoints to walk through.
     *
     * Precondition: path should contain at least 1 waypoint.
     * Postcondition: The enemy will move toward the first waypoint when
     * move is called.
     *
     * @param path The waypoints from the spawn point to the base
     */
    setPath(path) {
        this._path = path.slice();
        this._pathIndex = 0;
    }
    /**
     * Moves the enemy one frame along its path.
     *
     * The enemy walks toward its current waypoint. When it arrives, it
     * starts walking toward the next one. When there are no waypoints
     * left, the enemy has reached the base.
     *
     * Precondition: setPath should have been called.
     * Postcondition: The enemy moves up to its speed in pixels.
     */
    move() {
        if (!this._alive || this.hasReachedEnd()) {
            return;
        }
        const target = this._path[this._pathIndex];
        const distanceX = target.x - this._x;
        const distanceY = target.y - this._y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        // Close enough to arrive at the waypoint this frame.
        if (distance <= this._speed) {
            this._x = target.x;
            this._y = target.y;
            this._pathIndex++;
            return;
        }
        // Walk toward the waypoint at a constant speed.
        this._x += (distanceX / distance) * this._speed;
        this._y += (distanceY / distance) * this._speed;
    }
    /**
     * Checks if the enemy has walked through every waypoint and
     * reached the base.
     *
     * @returns true if the enemy is at the end of its path
     */
    hasReachedEnd() {
        return this._path.length > 0 && this._pathIndex >= this._path.length;
    }
    /**
     * Reduces the enemy's health.
     *
     * Precondition: amount should be greater than 0.
     * Postcondition: The enemy loses health and dies if it reaches 0.
     *
     * @param amount The amount of damage the enemy takes
     */
    takeDamage(amount) {
        this._health = Math.max(0, this._health - Math.max(0, amount));
        if (this._health <= 0) {
            this.die();
        }
    }
    /**
     * Kills the enemy.
     *
     * Precondition: None.
     * Postcondition: The enemy is dead and will be removed by the game.
     */
    die() {
        this._alive = false;
    }
    /**
     * Checks if the enemy is dead.
     *
     * @returns true if the enemy has no health or was killed
     */
    isDead() {
        return !this._alive || this._health <= 0;
    }
    /**
     * Checks if the enemy is alive.
     *
     * @returns true if the enemy is alive, false otherwise
     */
    isAlive() {
        return !this.isDead();
    }
    /**
     * Draws the enemy with a health bar above it.
     *
     * If the enemy's image has loaded, the image is drawn. Otherwise a
     * colored square is drawn instead, so the enemy is never invisible.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: The enemy and its health bar are drawn.
     *
     * @param canvas The canvas where the enemy is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas, ctx) {
        ctx.save();
        // The enemy's body: image if loaded, colored square if not.
        if (this._gameImage.complete) {
            ctx.drawImage(this._gameImage.img, this._x, this._y, this._width, this._height);
        }
        else {
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
        }
        // The health bar background (red).
        const barHeight = 4;
        const barY = this._y - barHeight - 2;
        ctx.fillStyle = "red";
        ctx.fillRect(this._x, barY, this._width, barHeight);
        // The health bar fill (green), scaled to remaining health.
        const healthFraction = this._health / this._maxHealth;
        ctx.fillStyle = "lime";
        ctx.fillRect(this._x, barY, this._width * healthFraction, barHeight);
        ctx.restore();
    }
}
export { Enemy };
//# sourceMappingURL=Enemy.js.map