import { PathTile } from "./PathTile.js";
import { PathTileController } from "./PathTileController.js";
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
class WorldController {
    /** The map's data */
    _world;
    /** One controller per tile, in the same grid layout */
    _tileControllers;
    /**
     * Creates the WorldController and all tile controllers.
     *
     * Precondition: worldWidth and worldHeight should be greater than 0.
     * Postcondition: The world and every tile controller are created.
     *
     * @param worldWidth The width of the canvas in pixels
     * @param worldHeight The height of the canvas in pixels
     */
    constructor(worldWidth, worldHeight) {
        this._world = new WorldModel(worldWidth, worldHeight);
        this.createTileControllers();
    }
    /** The map's model */
    get world() {
        return this._world;
    }
    /** The pixel waypoints enemies walk, from spawn to crate */
    get waypoints() {
        return this._world.waypoints;
    }
    /** The side length of one square tile in pixels */
    get tileLength() {
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
    getTileAt(x, y) {
        return this._world.getTileAt(x, y);
    }
    /**
     * Creates the matching controller for every tile in the grid.
     *
     * Precondition: The world model must be generated.
     * Postcondition: Every tile has a controller with the right color.
     */
    createTileControllers() {
        const numRows = this._world.numRows;
        const numCols = this._world.numCols;
        this._tileControllers = new Array(numRows);
        for (let row = 0; row < numRows; row++) {
            this._tileControllers[row] = new Array(numCols);
            for (let column = 0; column < numCols; column++) {
                const currentTile = this._world.getTile(row, column);
                if (currentTile instanceof PathTile) {
                    this._tileControllers[row][column] = new PathTileController(currentTile);
                }
                else {
                    this._tileControllers[row][column] = new TowerTileController(currentTile);
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
    draw(canvas, ctx) {
        for (const row of this._tileControllers) {
            for (const tileController of row) {
                tileController.draw(canvas, ctx);
            }
        }
    }
}
export { WorldController };
//# sourceMappingURL=WorldController.js.map