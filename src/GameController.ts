import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
import { TowerController } from "./TowerController.js";
import { DamageableUnit } from "./DamageableUnit.js";

class GameController {

    private keys: Map<string, boolean> = new Map<string, boolean>();
    private _model: GameModel;
    private _view: GameView;
    private _canvas: HTMLCanvasElement;

    /**
     * Creates the GameController.
     * Precondition: canvasId must match an existing canvas element.
     * Postcondition: The game controller is created and the game loop starts.
     * @param canvasId The id of the canvas element
     */
    constructor(canvasId: string) {
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;

        this._model = new GameModel();
        this._view = new GameView(this._canvas);

        this.gameLoop(0);
    }

    /**
     * Runs the main game loop.
     * Precondition: currentTime should come from requestAnimationFrame.
     * Postcondition: The game updates, redraws, and requests the next frame.
     * @param currentTime The current animation time
     */
    private gameLoop(currentTime: number): void {
        this.update(currentTime);
        this.draw();

        requestAnimationFrame((newTime: number) => {
            this.gameLoop(newTime);
        });
    }

    private update(currentTime: number): void {
        const towers: TowerController[] = this._model.towers;
        const enemies: DamageableUnit[] = this._model.enemies;

        for (const tower of towers) {
            tower.attack(enemies, currentTime);
        }
    }

    /**
     * Draws the game.
     * Precondition: The model and view must exist.
     * Postcondition: The current game state is drawn.
     */
    public draw(): void {
        this._view.draw(this._model);
    }

    public turnOnKey(key: string): void {
        this.keys.set(key, true);
        this.printKeyMappings("turnOnKey");
    }

    public turnOffKey(key: string): void {
        this.keys.set(key, false);
        this.printKeyMappings("turnOffKey");
    }

    private printKeyMappings(callingFunctionName: string): void {
        console.log("=====================");
        console.log(`Calling function: ${callingFunctionName}`);

        for (const [aKey, aValue] of this.keys.entries()) {
            console.log(`${aKey} on: ${aValue}`);
        }

        console.log("=====================");
    }
}

export { GameController };