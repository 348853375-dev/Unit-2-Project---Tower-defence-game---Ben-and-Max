import { GameObject } from "./GameObject";

class GameImage {
    private _img : HTMLImageElement;
    private _filename : string;
    private _model : GameObject;

    constructor(filename: string, model : GameObject) {
        this._filename = filename;
        this._model = model;

        this._img = new Image();
        this._img.src = filename;
    }

    public get x() : number { return this._model.x }
    public get y() : number { return this._model.y }
    public get width() : number { return this._model.width }
    public get height() : number { return this._model.height }
    public get filename() : string { return this._filename }
    public get img() : HTMLImageElement { return this._img }

    public get complete() : boolean { return this._img.complete; }
} 

export { GameImage };
