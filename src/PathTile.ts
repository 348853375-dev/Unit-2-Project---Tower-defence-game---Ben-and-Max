import { Tile } from "./Tile.js";

/**
 * PathTile is the tile enemies walk on.
 * It is a path and is not buildable, because the path belongs to the
 * enemies.
 */
class PathTile extends Tile {
    public static readonly TILE_TYPE: string = "Path";

    /**
     * Creates a path tile.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A path tile is created (path = true, buildable = false).
     *
     * @param x The tile's x-coordinate
     * @param y The tile's y-coordinate
     * @param width The tile's width
     * @param height The tile's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, PathTile.TILE_TYPE, false, true);
    }
}

export { PathTile };