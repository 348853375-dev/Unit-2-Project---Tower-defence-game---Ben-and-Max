class GameView {
    _canvas;
    _ctx;
    /**
     *
     * @param canvas
     */
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext("2d");
    }
    draw(model) {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.fillText(`Money: ${model.money}`, 20, 30);
        this._ctx.fillText(`Lives: ${model.lives}`, 20, 60);
        this._ctx.fillText(`Round: ${model.round}`, 20, 90);
    }
}
export { GameView };
//# sourceMappingURL=GameView.js.map