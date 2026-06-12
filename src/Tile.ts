import { GameObject } from "./GameObject.js";

/**
 * Tile is the abstract parent class for every tile on the map.
 *
 * Each tile has two booleans from the project plan:
 * - buildable: the player can place a tower on it
 * - path: enemies walk on it
 *
 * The three tile types set these differently:
 * - PathTile: path, not buildable
 * - TowerTile: buildable, not a path
 * - DecorationTile: neither
 */
abstract class Tile extends GameObject {
    protected _tileType: string;
    protected _buildable: boolean;
    protected _path: boolean;

    /**
     * Creates a tile.
     *
     * Precondition: width and height should be greater than 0.
     * Postcondition: A tile is created with its type and flags.
     *
     * @param x The tile's x-coordinate
     * @param y The tile's y-coordinate
     * @param width The tile's width
     * @param height The tile's height
     * @param tileType The name of the tile type
     * @param buildable true if the player can place a tower here
     * @param path true if enemies walk on this tile
     */
    protected constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        tileType: string,
        buildable: boolean,
        path: boolean
    ) {
        super(x, y, width, height);

        this._tileType = tileType;
        this._buildable = buildable;
        this._path = path;
    }

    /** The name of the tile type */
    public get tileType(): string {
        return this._tileType;
    }

    /** True if the player can place a tower on this tile */
    public get buildable(): boolean {
        return this._buildable;
    }

    /** True if enemies walk on this tile */
    public get path(): boolean {
        return this._path;
    }
}

export { Tile };