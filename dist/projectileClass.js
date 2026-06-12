import { GameObject } from "./GameObject.js";
/**
 * Projectile represents a visible attack fired by a tower.
 *
 * A projectile stores its damage, speed, and position. It is created by
 * a tower when the tower attacks. The projectile moves toward a target
 * enemy each frame. When it reaches the target, it applies damage and
 * disappears.
 *
 * There are 2 types of projectiles:
 * - Single target: damages only the target enemy.
 * - AOE (area of effect): damages every enemy near the impact point.
 */
class Projectile extends GameObject {
    /** Projectile type that damages one enemy */
    static TYPE_SINGLE_TARGET = "single target";
    /** Projectile type that damages all enemies in a radius */
    static TYPE_AOE = "aoe";
    _damage;
    _speed;
    _target;
    _projectileType;
    _aoeRadius;
    _isFinished;
    /**
     * Creates a projectile.
     *
     * Precondition: damage and speed should be greater than 0.
     * Postcondition: A projectile is created and will move toward its target.
     *
     * @param x The projectile's starting x-coordinate (usually tower center)
     * @param y The projectile's starting y-coordinate (usually tower center)
     * @param width The projectile's width
     * @param height The projectile's height
     * @param damage The damage applied when the projectile hits
     * @param speed The projectile's movement speed in pixels per frame
     * @param target The enemy being targeted
     * @param projectileType Projectile.TYPE_SINGLE_TARGET or Projectile.TYPE_AOE
     * @param aoeRadius The damage radius for AOE projectiles (0 for single target)
     */
    constructor(x, y, width, height, damage, speed, target, projectileType, aoeRadius) {
        super(x, y, width, height);
        this._damage = Math.max(1, damage);
        this._speed = Math.max(1, speed);
        this._target = target;
        this._projectileType = projectileType;
        this._aoeRadius = Math.max(0, aoeRadius);
        this._isFinished = false;
    }
    /** True if the projectile has hit its target or lost it */
    get isFinished() {
        return this._isFinished;
    }
    /**
     * Updates the projectile's movement for one frame.
     *
     * Precondition: enemies should contain the enemies currently in the game.
     * Postcondition: The projectile moves toward its target. If it reaches
     * the target, damage is applied and the projectile is finished. If the
     * target died before the projectile arrived, the projectile is finished
     * without dealing damage.
     *
     * @param enemies All enemies currently in the game (needed for AOE hits)
     */
    update(enemies) {
        if (this._isFinished) {
            return;
        }
        // If the target died before the projectile arrived, remove the projectile.
        if (this._target.isDead()) {
            this._isFinished = true;
            return;
        }
        const targetCenterX = this._target.x + this._target.width / 2;
        const targetCenterY = this._target.y + this._target.height / 2;
        const distanceX = targetCenterX - this.centerX;
        const distanceY = targetCenterY - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        // Close enough to hit this frame.
        if (distance <= this._speed) {
            this.hitTarget(enemies);
            return;
        }
        // Move toward the target at a constant speed.
        this._x += (distanceX / distance) * this._speed;
        this._y += (distanceY / distance) * this._speed;
    }
    /**
     * Applies damage when the projectile reaches its target.
     *
     * Single target projectiles damage only the target.
     * AOE projectiles damage every enemy within the AOE radius of the
     * impact point.
     *
     * Precondition: enemies should contain the enemies currently in the game.
     * Postcondition: Damage is applied and the projectile is finished.
     *
     * @param enemies All enemies currently in the game
     */
    hitTarget(enemies) {
        if (this._projectileType === Projectile.TYPE_AOE) {
            for (const enemy of enemies) {
                if (this.getDistanceToEnemy(enemy) <= this._aoeRadius) {
                    enemy.takeDamage(this._damage);
                }
            }
        }
        else {
            this._target.takeDamage(this._damage);
        }
        this._isFinished = true;
    }
    /**
     * Gets the distance from the impact point (the target's center) to
     * another enemy's center. Used for AOE damage checks.
     *
     * Precondition: enemy must be a valid DamageableUnit.
     * Postcondition: Returns the straight-line distance between centers.
     *
     * @param enemy The enemy being checked
     * @returns The distance from the impact point to the enemy
     */
    getDistanceToEnemy(enemy) {
        const impactX = this._target.x + this._target.width / 2;
        const impactY = this._target.y + this._target.height / 2;
        const enemyCenterX = enemy.x + enemy.width / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        const distanceX = impactX - enemyCenterX;
        const distanceY = impactY - enemyCenterY;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
    /**
     * Draws the projectile on the canvas as a small circle.
     * Single target projectiles are yellow, AOE projectiles are orange.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: The projectile is drawn at its current position.
     *
     * @param canvas The canvas where the projectile is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas, ctx) {
        ctx.save();
        if (this._projectileType === Projectile.TYPE_AOE) {
            ctx.fillStyle = "orange";
        }
        else {
            ctx.fillStyle = "yellow";
        }
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this._width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
export { Projectile };
//# sourceMappingURL=projectileClass.js.map