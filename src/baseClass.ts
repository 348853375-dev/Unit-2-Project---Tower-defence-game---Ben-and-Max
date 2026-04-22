 /**
  * Class for the player's base in the game
  * The base is the target that enemies try to reach.
  * 
  * 1. The base starts with 3 lives
  * 2. Each enemy that reaches the base reduces its health by 1
  * 3. the Boss will remove all lives if it reaches the base
  * 4. The game ends when the base has no lives remaining
  * 
  * What the class does
  * 
  * 1. Track remaining lives 
  * 2. Store base position on the map
  * 3. Handle incoming damage from enemies
  * 4. Check if the base has been destroyed
  * 
  */
class Base {

    // The number of lives the base has left, shows how many enemies can reach the base before you lose
    private _health: number;

    // stores the position of the base on the map, also is the endpoint of the enemies
    private _position: string;

    /**
     * Creates a Base object
     * 
     * Preconditions:
     * 
     * 1. health must be greater or equal 0
     * 2. the position must be a real point on the map
     * 
     * Postconditions:
     * 
     * 1. base starts with correct health and position
     * 
     * @param health number of lives the base starts with
     * @param position location of the base on the map
     */

    constructor(health: number, position: string) {
        this._health = health;
        this._position = position;
    }

    /**
     * Gets the current number of lives left
     * 
     * Preconditions:
     * 
     * 1. base object exists
     * 
     * Postconditions:
     * 
     * 2. returns the current health value
     * 
     * @returns number of lives remaining
     */

    public get Health(): number {
        return this._health
    }

    /**
     * Sets the number of lives for the base
     * 
     * Preconditions:
     * 
     * 1. newHealth must be greater or equal to 0
     * 
     * Postconditions:
     * 
     * 2. base health is updated to new value
     * 
     * @param newHealth new life value
     */

    public set Health(newHealth: number) {
        this._health = newHealth;
    }

    /**
     * Gets the base position
     * 
     * Preconditions:
     * 
     * 1. base object exists
     * 
     * Postconditions:
     * 
     * 1. returns the current position
     * 
     * @returns position of the base
     */

    public get Position(): string {
        return this._position;
    }

    /**
     * Sets the base position
     * 
     * Preconditions:
     * 
     * 1. newPosition must be a real point on the map
     * 
     * Postconditions:
     * 
     * 2. base position is updated
     * 
     * @param newPosition new location of the base
     */
    public set Position(newPosition: string) {
        this._position = newPosition;
    }

    /**
     * Applies damage to the base when an enemy reaches it
     * 
     * Preconditions:
     * 
     * 1. amount must be > 0
     * 
     * Postconditions:
     * 
     * 1. health is reduced by the damage amount
     * 2. health will not go below 0
     * 
     * @param amount damage dealt to the base
     */

    public takeDamage(amount: number): void {
        this._health -= amount;

        if (this._health < 0) {
            this._health = 0;
        }
    }

    /**
     * Checks if the base has been destroyed
     * 
     * Preconditions:
     * 
     * 1. base object exists
     * 
     * Postconditions:
     * 
     * 1. returns true if health is 0
     * 2. returns false if it is not
     * 
     * @returns true if base is destroyed (game over), false if not
     */

    public isDestroyed(): boolean {
        return this._health === 0;
    }
}

// export the Base class
export { Base };