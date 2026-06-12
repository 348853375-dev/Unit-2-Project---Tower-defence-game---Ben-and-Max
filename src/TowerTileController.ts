import { TowerTile } from "./TowerTile.js";
import { TileController } from "./TileController.js";

export class TowerTileController extends TileController {
    public static readonly TILE_COLOUR : string = 'rgb(96,70,15)';
    constructor ( tile : TowerTile ) {
        super(tile, TowerTileController.TILE_COLOUR);
    }
    
}