import { Drawable } from "./drawable.js";
import { Tile } from "./Tile.js";

/**
 * TileController is the abstract parent controller for every tile.
 *
 * It connects a Tile model to its color on the canvas and draws it.
 * Each child controller (PathTileController, TowerTileController)
 * provides its own color.
 */
abstract class TileController implements Drawable {
    /** The color the tile is drawn with (the view part) */
    protected _tileColour: string;

    /** The tile's data (the model part) */
    protected _tile: Tile;

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
    protected constructor(tile: Tile, tileColour: string) {
        this._tile = tile;
        this._tileColour = tileColour;
    }

    /** The tile model this controller draws */
    public get tile(): Tile {
        return this._tile;
    }

    /** The color used to draw the tile */
    public get tileColour(): string {
        return this._tileColour;
    }

    /** The tile's x-coordinate */
    public get x(): number {
        return this._tile.x;
    }

    /** The tile's y-coordinate */
    public get y(): number {
        return this._tile.y;
    }

    /** The tile's width */
    public get width(): number {
        return this._tile.width;
    }

    /** The tile's height */
    public get height(): number {
        return this._tile.height;
    }

    /** True if the player can place a tower on this tile */
    public get buildable(): boolean {
        return this._tile.buildable;
    }

    /**
     * Checks if a point (like a mouse click) is on this tile.
     *
     * @param x The x-coordinate being checked
     * @param y The y-coordinate being checked
     * @returns true if the point is inside the tile
     */
    public containsPoint(x: number, y: number): boolean {
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
    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.fillStyle = this._tileColour;
        ctx.fillRect(this._tile.x, this._tile.y, this._tile.width, this._tile.height);

        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.strokeRect(this._tile.x, this._tile.y, this._tile.width, this._tile.height);

        ctx.restore();
    }
}

export { TileController };
