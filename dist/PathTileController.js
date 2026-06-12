import { TileController } from "./TileController.js";
/**
 * PathTileController draws the path tiles the enemies walk on.
 */
class PathTileController extends TileController {
    /** The color of path tiles (dirt brown) */
    static TILE_COLOUR = "rgb(148, 117, 73)";
    /**
     * Creates a PathTileController.
     *
     * Precondition: tile must be a valid PathTile.
     * Postcondition: The controller is created for the given tile.
     *
     * @param tile The path tile being controlled
     */
    constructor(tile) {
        super(tile, PathTileController.TILE_COLOUR);
    }
}
export { PathTileController };
//# sourceMappingURL=PathTileController.js.map