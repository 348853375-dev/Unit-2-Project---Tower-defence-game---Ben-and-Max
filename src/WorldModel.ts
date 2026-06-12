import { Tile } from "./Tile.js";
import { PathTile } from "./PathTile.js";
import { TowerTile } from "./TowerTile.js";

/**
 * The WorldModel stores the map: a grid of tiles and the path the
 * enemies follow.
 *
 * The map is designed by hand in the LAYOUT array below instead of
 * being random, so the path is always a proper zigzag from the spawn
 * point (top right) to the crate (bottom left), exactly like the
 * project plan.
 *
 * In LAYOUT, each character is one tile:
 * - 'P' = PathTile (enemies walk here, not buildable)
 * - 'T' = TowerTile (buildable, enemies cannot walk here)
 *
 * PATH_CORNERS lists the [column, row] of every corner of the path in
 * walking order. The model turns these into pixel waypoints that
 * enemies follow with setPath.
 */
class WorldModel {
    /**
     * The map design: 10 rows by 15 columns.
     * Enemies spawn at the top right, zigzag down the map, and reach
     * the crate at the bottom left.
     */
    private static readonly LAYOUT: string[] = [
        "TTTTTTTTTTTTTTP",
        "TTTTTTTTTTTTTTP",
        "TPPPPPPPPPPPPPP",
        "TPTTTTTTTTTTTTT",
        "TPTTTTTTTTTTTTT",
        "TPPPPPPPPPPPPPT",
        "TTTTTTTTTTTTTPT",
        "TTTTTTTTTTTTTPT",
        "PPPPPPPPPPPPPPT",
        "TTTTTTTTTTTTTTT"
    ];

    /**
     * The corners of the path as [column, row], in the order enemies
     * walk them: spawn (top right) to crate (bottom left).
     */
    private static readonly PATH_CORNERS: [number, number][] = [
        [14, 0],
        [14, 2],
        [1, 2],
        [1, 5],
        [13, 5],
        [13, 8],
        [0, 8]
    ];

    private _tileGrid!: Tile[][];

    private _numRows: number;
    private _numCols: number;

    private _worldWidth: number;
    private _worldHeight: number;

    private _tileLength!: number;

    /**
     * Creates the world from the LAYOUT design.
     *
     * Precondition: worldWidth and worldHeight should be greater than 0.
     * Postcondition: The tile grid is built and the tile length is
     * calculated so every tile is a square that fits the canvas.
     *
     * @param worldWidth The width of the canvas in pixels
     * @param worldHeight The height of the canvas in pixels
     */
    constructor(worldWidth: number, worldHeight: number) {
        this._numRows = WorldModel.LAYOUT.length;
        this._numCols = WorldModel.LAYOUT[0]!.length;

        this._worldWidth = worldWidth;
        this._worldHeight = worldHeight;

        this.generateWorld();
    }

    /** The number of rows in the grid */
    public get numRows(): number {
        return this._numRows;
    }

    /** The number of columns in the grid */
    public get numCols(): number {
        return this._numCols;
    }

    /** The side length of one square tile in pixels */
    public get tileLength(): number {
        return this._tileLength;
    }

    /**
     * Gets the tile at a grid position.
     *
     * Precondition: row and column must be inside the grid.
     * Postcondition: Returns the tile at that position.
     *
     * @param row The grid row
     * @param column The grid column
     * @returns The tile at that grid position
     */
    public getTile(row: number, column: number): Tile {
        return this._tileGrid[row]![column] as Tile;
    }

    /**
     * Gets the tile under a pixel position, like a mouse click.
     *
     * Precondition: x and y should be canvas coordinates.
     * Postcondition: Returns the tile under the point, or null if the
     * point is outside the grid.
     *
     * @param x The x-coordinate being checked
     * @param y The y-coordinate being checked
     * @returns The tile under the point, or null
     */
    public getTileAt(x: number, y: number): Tile | null {
        const column: number = Math.floor(x / this._tileLength);
        const row: number = Math.floor(y / this._tileLength);

        if (row < 0 || row >= this._numRows || column < 0 || column >= this._numCols) {
            return null;
        }

        return this.getTile(row, column);
    }

    /**
     * Gets the pixel waypoints enemies walk through, built from
     * PATH_CORNERS. Each waypoint is the center of a corner tile.
     *
     * Precondition: The world must be generated.
     * Postcondition: Returns the waypoints in walking order, from the
     * spawn point to the crate.
     *
     * @returns The waypoints as pixel coordinates
     */
    public get waypoints(): { x: number; y: number }[] {
        const points: { x: number; y: number }[] = [];

        for (const [column, row] of WorldModel.PATH_CORNERS) {
            points.push({
                x: column * this._tileLength + this._tileLength / 2,
                y: row * this._tileLength + this._tileLength / 2
            });
        }

        return points;
    }

    /**
     * Builds the tile grid from the LAYOUT design.
     *
     * Precondition: Every row in LAYOUT must have the same length.
     * Postcondition: The grid is filled with PathTiles where LAYOUT
     * has 'P' and TowerTiles everywhere else.
     */
    private generateWorld(): void {
        const tileWidth: number = Math.floor(this._worldWidth / this._numCols);
        const tileHeight: number = Math.floor(this._worldHeight / this._numRows);

        // Use the smaller of the two so every tile is a square.
        this._tileLength = Math.min(tileWidth, tileHeight);

        this._tileGrid = new Array<Array<Tile>>(this._numRows);

        for (let row = 0; row < this._numRows; row++) {
            this._tileGrid[row] = new Array<Tile>(this._numCols);

            for (let column = 0; column < this._numCols; column++) {
                const tileCharacter: string = WorldModel.LAYOUT[row]!.charAt(column);

                const tileX: number = column * this._tileLength;
                const tileY: number = row * this._tileLength;

                if (tileCharacter === "P") {
                    this._tileGrid[row]![column] = new PathTile(
                        tileX,
                        tileY,
                        this._tileLength,
                        this._tileLength
                    );
                } else {
                    this._tileGrid[row]![column] = new TowerTile(
                        tileX,
                        tileY,
                        this._tileLength,
                        this._tileLength
                    );
                }
            }
        }
    }
}

export { WorldModel };


