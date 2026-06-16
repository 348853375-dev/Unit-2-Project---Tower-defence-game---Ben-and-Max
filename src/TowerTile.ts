
import { Tile } from "./Tile.js";

/**
 * TowerTile is the tile the player can build on.
 * It is buildable and is not a path, so enemies cannot walk on it.
 */
class TowerTile extends Tile {
    public static readonly TILE_TYPE: string = "Tower";

    /**
     * Creates a tower tile.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A tower tile is created (buildable = true, path = false).
     *
     * @param x The tile's x-coordinate
     * @param y The tile's y-coordinate
     * @param width The tile's width
     * @param height The tile's height
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height, TowerTile.TILE_TYPE, true, false);
    }
}

export { TowerTile };