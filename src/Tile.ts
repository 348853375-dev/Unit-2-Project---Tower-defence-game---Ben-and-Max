import { GameObject } from "./GameObject.js";

export class Tile extends GameObject {
    protected _tileType : string;

    protected constructor(x : number, y : number, width : number, height : number,
        tileType : string) {
            super(x, y, width, height);

            this._tileType = tileType;
        }
        
        public get tileType() : string { return this._tileType};
}