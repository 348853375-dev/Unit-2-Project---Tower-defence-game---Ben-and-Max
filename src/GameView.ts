import { GameModel } from "./GameModel.js";

class GameView {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    /**
     * 
     * @param canvas 
     */
    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public draw(model: GameModel): void {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillText(`Money: ${model.money}`, 20, 30);
        this._ctx.fillText(`Lives: ${model.lives}`, 20, 60);
        this._ctx.fillText(`Round: ${model.round}`, 20, 90);
    }
}

export { GameView };