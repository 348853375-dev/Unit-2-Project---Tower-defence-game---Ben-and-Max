import { TowerTile } from "./TowerTile.js";
import { TileController } from "./TileController.js";

/**
 * TowerTileController draws the tiles the player can build towers on.
 */
class TowerTileController extends TileController {
    /** The color of buildable tiles (factory floor gray-green) */
    public static readonly TILE_COLOUR: string = "rgb(85, 98, 87)";

    /**
     * Creates a TowerTileController.
     *
     * Precondition: tile must be a valid TowerTile.
     * Postcondition: The controller is created for the given tile.
     *
     * @param tile The tower tile being controlled
     */
    constructor(tile: TowerTile) {
        super(tile, TowerTileController.TILE_COLOUR);
    }
}

export { TowerTileController };