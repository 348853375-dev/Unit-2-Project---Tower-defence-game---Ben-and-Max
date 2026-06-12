import { Drawable } from "./Drawable.js";
import { PathTile } from "./PathTile.js";
import { PathTileController } from "./PathTileController";
import { TileController } from "./TileController"
import { TowerTile } from "./TowerTile.js";
import { TowerTileController } from "./TowerTileController";
import { WorldModel } from "./WorldModel.js"

export class WorldController implements Drawable {
    protected _world: WorldModel;
    protected _tileControllers!: TileController[][];
    protected _canvas: HTMLCanvasElement;
    protected _ctx: CanvasRenderingContext2D;

    constructor(numRows: number, numColumns: number, canvas: HTMLCanvasElement) {
        this._world = new WorldModel(numRows, numColumns, canvas.clientWidth, canvas.clientHeight);
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        this.createTileControllers();
    }

    private createTileControllers() {
        let numRows = this._world.numRows;
        let numCols = this._world.numCols;

        this._tileControllers = new Array(numRows);

        for (let i = 0; i < numRows; i++) {
            this._tileControllers[i] = new Array(numCols);

            for (let j = 0; j < numCols; j++) {
                let currentTile = this._world.getTile(i, j);

                if (currentTile instanceof PathTile) {
                    this._tileControllers[i][j] = new PathTileController(currentTile);
                } else if (currentTile instanceof TowerTile) {
                    this._tileControllers[i][j] = new TowerTileController(currentTile);
                }
            }
        }
    }

    draw() {
        const rows = this._tileControllers.length;

        for (let i = 0; i < rows; i++) {
            const cols = this._tileControllers[i].length;

            for (let j = 0; j < cols; j++) {
                const controller = this._tileControllers[i][j];
                controller.draw(this._canvas, this._ctx);
            }
        }
    }
}
