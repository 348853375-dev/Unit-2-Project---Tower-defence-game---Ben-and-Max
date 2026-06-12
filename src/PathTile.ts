import { Tile } from "./Tile.js";

export class PathTile extends Tile {
    
    public static readonly TILE_TYPE = "Path";

    constructor(x : number, y : number, width : number, height : number) {
        super(x, y, width, height, PathTile.TILE_TYPE);
    }
}