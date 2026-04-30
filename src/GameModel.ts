class GameModel {
    private _money: number;
    private _lives: number;
    private _round: number;

    constructor() {
        this._money = 100;
        this._lives = 3;
        this._round = 1;
    }

    public get money(): number { return this._money; }
    public get lives(): number { return this._lives; }
    public get round(): number { return this._round; }
}

export { GameModel };