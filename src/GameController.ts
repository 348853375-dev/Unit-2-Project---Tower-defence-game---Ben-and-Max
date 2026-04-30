import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";

class GameController {

    private keys: Map<string, boolean> = new Map<string, boolean>();
    private _model: GameModel;
    private _view: GameView;
    private _canvas: HTMLCanvasElement;

    constructor(canvasId: string) {
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;
        this._model = new GameModel();
        this._view = new GameView(this._canvas);

        this.draw();
    }
    public draw(): void {
        this._view.draw(this._model);
    }

    public turnOnKey(key: string): void {
        this.keys.set(key, true);
        this.draw();
        this.printKeyMappings('turnOnKey');
    }


    public turnOffKey(key: string): void {
        this.keys.set(key, false);
        this.draw();
        this.printKeyMappings('turnOffKey');
    }

    private printKeyMappings(callingFunctionName: string): void {
        console.log('=====================');
        console.log(`Calling function: ${callingFunctionName}`);

        for (const [aKey, aValue] of this.keys.entries()) {
            console.log(`${aKey} on: ${aValue}`);
        }

        console.log('=====================');
    }
}

export { GameController };