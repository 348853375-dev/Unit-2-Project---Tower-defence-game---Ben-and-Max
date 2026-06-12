import { GameModel } from "./GameModel.js";
import { Drawable } from "./drawable.js";
import { DamageableUnit } from "./DamageableUnit.js";

/**
 * The GameView draws the entire game on the canvas.
 *
 * It reads from the GameModel but never changes it (part of the MVC
 * design: the View only displays state). Drawing happens in layers so
 * objects overlap correctly:
 *
 * 1. Background drawables (map tiles and the base, passed in)
 * 2. Enemies
 * 3. Towers
 * 4. Projectiles
 * 5. HUD text (money, lives, score, round, freeze)
 */
class GameView {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    /**
     * Creates the GameView.
     *
     * Precondition: canvas must be a valid canvas element.
     * Postcondition: The view is ready to draw the game.
     *
     * @param canvas The canvas the game is drawn on
     */
    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;

        const context: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

        if (context === null) {
            throw new Error("Could not get the 2D drawing context from the canvas.");
        }

        this._ctx = context;
    }

    /**
     * Draws one full frame of the game.
     *
     * Precondition: model must be a valid GameModel and currentTime
     * should come from requestAnimationFrame.
     * Postcondition: The canvas is cleared and every layer is redrawn.
     *
     * @param model The game model being drawn
     * @param currentTime The current animation time in milliseconds
     * @param background Drawables drawn first, behind everything
     * (the map and the base)
     */
    public draw(model: GameModel, currentTime: number, background: Drawable[] = []): void {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        // Layer 1: map tiles and base.
        for (const drawable of background) {
            drawable.draw(this._canvas, this._ctx);
        }

        // Layer 2: enemies (only if the enemy class has a draw method).
        for (const enemy of model.enemies) {
            if (this.isDrawable(enemy)) {
                enemy.draw(this._canvas, this._ctx);
            }
        }

        // Layer 3: towers.
        for (const tower of model.towers) {
            tower.draw(this._canvas, this._ctx);
        }

        // Layer 4: projectiles, drawn on top so attacks are always visible.
        for (const projectile of model.projectiles) {
            projectile.draw(this._canvas, this._ctx);
        }

        // Layer 5: HUD.
        this.drawHud(model, currentTime);
    }

    /**
     * Checks whether an enemy can draw itself.
     *
     * Enemies are stored as DamageableUnit, which does not require a
     * draw method. This type guard safely checks for one at runtime so
     * the view works with any enemy class.
     *
     * @param unit The unit being checked
     * @returns true if the unit has a draw method
     */
    private isDrawable(unit: DamageableUnit): unit is DamageableUnit & Drawable {
        return typeof (unit as Partial<Drawable>).draw === "function";
    }

    /**
     * Draws the HUD text: money, lives, score, round, and the freeze
     * indicator when the freeze ability is active.
     *
     * Precondition: model must be a valid GameModel.
     * Postcondition: The HUD is drawn in the top left corner.
     *
     * @param model The game model being drawn
     * @param currentTime The current animation time in milliseconds
     */
    private drawHud(model: GameModel, currentTime: number): void {
        this._ctx.save();

        this._ctx.fillStyle = "white";
        this._ctx.strokeStyle = "black";
        this._ctx.lineWidth = 3;
        this._ctx.font = "bold 18px sans-serif";
        this._ctx.textAlign = "left";
        this._ctx.textBaseline = "top";

        const lines: string[] = [
            `Money: $${model.money}`,
            `Lives: ${model.lives}`,
            `Score: ${model.score}`,
            `Round: ${model.round}`
        ];

        let y: number = 10;

        for (const line of lines) {
            this._ctx.strokeText(line, 10, y);
            this._ctx.fillText(line, 10, y);
            y += 24;
        }

        if (model.isFreezeActive(currentTime)) {
            this._ctx.fillStyle = "cyan";
            this._ctx.strokeText("ENEMIES FROZEN", 10, y);
            this._ctx.fillText("ENEMIES FROZEN", 10, y);
        }

        this._ctx.restore();
    }

    /**
     * Draws the game over screen on top of the game.
     *
     * Precondition: model must be a valid GameModel.
     * Postcondition: A dark overlay with the loss message and final
     * score covers the canvas.
     *
     * @param model The game model being drawn
     */
    public drawGameOver(model: GameModel): void {
        this.drawEndScreen(
            "GAME OVER",
            "The robots stole the weapons!",
            model.score,
            "red"
        );
    }

    /**
     * Draws the victory screen on top of the game.
     *
     * Precondition: model must be a valid GameModel.
     * Postcondition: A dark overlay with the win message and final
     * score covers the canvas.
     *
     * @param model The game model being drawn
     */
    public drawVictory(model: GameModel): void {
        this.drawEndScreen(
            "YOU WIN!",
            "The factory is safe!",
            model.score,
            "lime"
        );
    }

    /**
     * Draws a full-screen end screen with a title, message, and score.
     *
     * Precondition: None.
     * Postcondition: The overlay is drawn over the whole canvas.
     *
     * @param title The large text shown (GAME OVER or YOU WIN!)
     * @param message The smaller message under the title
     * @param score The player's final score
     * @param color The color of the title text
     */
    private drawEndScreen(title: string, message: string, score: number, color: string): void {
        this._ctx.save();

        this._ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);

        const centerX: number = this._canvas.width / 2;
        const centerY: number = this._canvas.height / 2;

        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";

        this._ctx.fillStyle = color;
        this._ctx.font = "bold 48px sans-serif";
        this._ctx.fillText(title, centerX, centerY - 50);

        this._ctx.fillStyle = "white";
        this._ctx.font = "24px sans-serif";
        this._ctx.fillText(message, centerX, centerY);

        this._ctx.font = "20px sans-serif";
        this._ctx.fillText(`Final Score: ${score}`, centerX, centerY + 40);

        this._ctx.fillText("Press R to restart", centerX, centerY + 80);

        this._ctx.restore();
    }
}

export { GameView };