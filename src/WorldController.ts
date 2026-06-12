import { Drawable } from "./drawable.js";
import { Tile } from "./Tile.js";
import { PathTile } from "./PathTile.js";
import { PathTileController } from "./PathTileController.js";
import { TileController } from "./TileController.js";
import { TowerTileController } from "./TowerTileController.js";
import { WorldModel } from "./WorldModel.js";

/**s
 * The WorldController controls the map.
 *
 * It connects the WorldModel (the tile grid and waypoints) to the
 * canvas by creating one TileController for every tile, and draws the
 * whole map. It also answers the GameController's questions about the
 * map: where enemies spawn, where they walk, and whether a clicked
 * tile is buildable.
 */
class WorldController implements Drawable {
    /** The map's data */
    private _world: WorldModel;

    /** One controller per tile, in the same grid layout */
    private _tileControllers!: TileController[][];

    /**
     * Creates the WorldController and all tile controllers.
     *
     * Precondition: worldWidth and worldHeight should be greater than 0.
     * Postcondition: The world and every tile controller are created.
     *
     * @param worldWidth The width of the canvas in pixels
     * @param worldHeight The height of the canvas in pixels
     */
    constructor(worldWidth: number, worldHeight: number) {
        this._world = new WorldModel(worldWidth, worldHeight);

        this.createTileControllers();
    }

    /** The map's model */
    public get world(): WorldModel {
        return this._world;
    }

    /** The pixel waypoints enemies walk, from spawn to crate */
    public get waypoints(): { x: number; y: number }[] {
        return this._world.waypoints;
    }

    /** The side length of one square tile in pixels */
    public get tileLength(): number {
        return this._world.tileLength;
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
        return this._world.getTileAt(x, y);
    }

    /**
     * Creates the matching controller for every tile in the grid.
     *
     * Precondition: The world model must be generated.
     * Postcondition: Every tile has a controller with the right color.
     */
    private createTileControllers(): void {
        const numRows: number = this._world.numRows;
        const numCols: number = this._world.numCols;

        this._tileControllers = new Array<Array<TileController>>(numRows);

        for (let row = 0; row < numRows; row++) {
            this._tileControllers[row] = new Array<TileController>(numCols);

            for (let column = 0; column < numCols; column++) {
                const currentTile: Tile = this._world.getTile(row, column);

                if (currentTile instanceof PathTile) {
                    this._tileControllers[row]![column] = new PathTileController(currentTile);
                } else {
                    this._tileControllers[row]![column] = new TowerTileController(currentTile);
                }
            }
        }
    }

    /**
     * Draws every tile on the map.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: The full tile grid is drawn.
     *
     * @param canvas The canvas where the map is drawn
     * @param ctx The canvas drawing context
     */
    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        for (const row of this._tileControllers) {
            for (const tileController of row) {
                tileController.draw(canvas, ctx);
            }
        }
    }
}

export { WorldController };