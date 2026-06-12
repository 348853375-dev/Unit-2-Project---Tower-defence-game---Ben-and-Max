/**
 * TileController is the abstract parent controller for every tile.
 *
 * It connects a Tile model to its color on the canvas and draws it.
 * Each child controller (PathTileController, TowerTileController)
 * provides its own color.
 */
class TileController {
    /** The color the tile is drawn with (the view part) */
    _tileColour;
    /** The tile's data (the model part) */
    _tile;
    /**
     * Creates a TileController.
     *
     * Precondition: tile must be a valid Tile and tileColour a valid
     * CSS color.
     * Postcondition: The controller is created for the given tile.
     *
     * @param tile The tile model being controlled
     * @param tileColour The color used to draw the tile
     */
    constructor(tile, tileColour) {
        this._tile = tile;
        this._tileColour = tileColour;
    }
    /** The tile model this controller draws */
    get tile() {
        return this._tile;
    }
    /** The color used to draw the tile */
    get tileColour() {
        return this._tileColour;
    }
    /** The tile's x-coordinate */
    get x() {
        return this._tile.x;
    }
    /** The tile's y-coordinate */
    get y() {
        return this._tile.y;
    }
    /** The tile's width */
    get width() {
        return this._tile.width;
    }
    /** The tile's height */
    get height() {
        return this._tile.height;
    }
    /** True if the player can place a tower on this tile */
    get buildable() {
        return this._tile.buildable;
    }
    /**
     * Checks if a point (like a mouse click) is on this tile.
     *
     * @param x The x-coordinate being checked
     * @param y The y-coordinate being checked
     * @returns true if the point is inside the tile
     */
    containsPoint(x, y) {
        return this._tile.containsPoint(x, y);
    }
    /**
     * Draws the tile as a colored square with a thin outline.
     *
     * Precondition: canvas and ctx must exist.
     * Postcondition: The tile is drawn at its position.
     *
     * @param canvas The canvas where the tile is drawn
     * @param ctx The canvas drawing context
     */
    draw(canvas, ctx) {
        ctx.save();
        ctx.fillStyle = this._tileColour;
        ctx.fillRect(this._tile.x, this._tile.y, this._tile.width, this._tile.height);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.strokeRect(this._tile.x, this._tile.y, this._tile.width, this._tile.height);
        ctx.restore();
    }
}
export { TileController };
//# sourceMappingURL=TileController.js.map