import { GameModel } from "./GameModel.js";
import { GameView } from "./GameView.js";
class GameController {
    keys = new Map();
    _model;
    _view;
    _canvas;
    constructor(canvasId) {
        this._canvas = document.getElementById(canvasId);
        this._canvas.width = this._canvas.clientWidth;
        this._canvas.height = this._canvas.clientHeight;
        this._model = new GameModel();
        this._view = new GameView(this._canvas);
        this.draw();
    }
    draw() {
        this._view.draw(this._model);
    }
    turnOnKey(key) {
        this.keys.set(key, true);
        this.draw();
        this.printKeyMappings('turnOnKey');
    }
    turnOffKey(key) {
        this.keys.set(key, false);
        this.draw();
        this.printKeyMappings('turnOffKey');
    }
    printKeyMappings(callingFunctionName) {
        console.log('=====================');
        console.log(`Calling function: ${callingFunctionName}`);
        for (const [aKey, aValue] of this.keys.entries()) {
            console.log(`${aKey} on: ${aValue}`);
        }
        console.log('=====================');
    }
}
export { GameController };
//# sourceMappingURL=GameController.js.map