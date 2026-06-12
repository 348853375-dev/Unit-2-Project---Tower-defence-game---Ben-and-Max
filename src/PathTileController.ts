import { PathTile } from "./PathTile.js";
import { TileController } from "./TileController.js";

/**
 * PathTileController draws the path tiles the enemies walk on.
 */
class PathTileController extends TileController {
    /** The color of path tiles (dirt brown) */
    public static readonly TILE_COLOUR: string = "rgb(148, 117, 73)";

    /**
     * Creates a PathTileController.
     *
     * Precondition: tile must be a valid PathTile.
     * Postcondition: The controller is created for the given tile.
     *
     * @param tile The path tile being controlled
     */
    constructor(tile: PathTile) {
        super(tile, PathTileController.TILE_COLOUR);
    }
}

export { PathTileController };