import { PathTile } from "./PathTile.js";
import { TileController } from "./TileController.js";

export class PathTileController extends TileController {
    public static readonly TILE_COLOUR : string = 'rgb(63,155,11)';
    constructor ( tile : PathTile) {
            super(tile, PathTileController.TILE_COLOUR);
        }
}