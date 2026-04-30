class GameModel {
    _money;
    _lives;
    _round;
    constructor() {
        this._money = 100;
        this._lives = 3;
        this._round = 1;
    }
    get money() { return this._money; }
    get lives() { return this._lives; }
    get round() { return this._round; }
}
export { GameModel };
//# sourceMappingURL=GameModel.js.map