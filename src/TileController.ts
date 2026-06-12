import { Drawable } from "./Drawable.js";
import { Tile } from "./Tile.js";

export class TileController implements Drawable {
   
    // keep track of the view
    protected _tileColour : string;

    // keep track of the model
    protected _tile : Tile;

    protected constructor(tile : Tile, tileColour : string) {
        this._tile = tile;
        this._tileColour = tileColour;
    }

    public get tile() : Tile { return this._tile; }
    public get tileColour() : string { return this._tileColour; }
    public get x() : number { return this._tile.x; }
    public get y() : number { return this._tile.y; }
    public get width() : number { return this._tile.width; }
    public get height() : number { return this._tile.height; }

 
    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        let oldColour : string | CanvasGradient | CanvasPattern = ctx.fillStyle;
        ctx.fillStyle = this._tileColour;
        ctx.fillRect(this._tile.x, this._tile.y, this._tile.width, this._tile.height);
        ctx.fillStyle = oldColour;
    }
}
