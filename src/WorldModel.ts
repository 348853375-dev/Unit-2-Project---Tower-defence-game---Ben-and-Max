import { PathTile } from "./PathTile.js";
import { TowerTile } from "./TowerTile.js";
import { Tile } from "./Tile.js";


export class WorldModel {
    protected _tileGrid! : Tile[][];


    protected _numRows : number;
    protected _numCols : number;


    protected _worldWidth : number;
    protected _worldHeight : number;


    protected _tileLength! : number;




    constructor(numRows : number, numCols : number, worldWidth : number, worldHeight : number) {
        this._numRows = numRows;
        this._numCols = numCols;


        this._worldWidth = worldWidth;
        this._worldHeight = worldHeight;


        this.generateWorld();
    }


    public get numCols() : number { return this._numCols;}
    public get numRows() : number { return this._numRows;}
    public getTile(row : number, column : number) : Tile {return this._tileGrid[row]![column] as Tile; }
    public get tileLength() : number {return this._tileLength}


    private generateWorld(){
        let worldWidth = this._worldWidth
        let worldHeight = this._worldHeight
        let numCols = this._numCols;
        let numRows = this._numRows


        let tileWidth = Math.floor(worldWidth / numCols);
        let tileHeight = Math.floor(worldHeight / numRows);
        


        // pick the smaller of the width and height for the actual tile length so that
        // each tile is a square
        let tileLength = Math.min(tileWidth, tileHeight);


        // create the rows in the grid
        this._tileGrid = new Array<Array<Tile>>(numRows);


        // go through each row to create the columns and put
        // random tiles in each cell
        for (let i = 0; i < numRows; i++){
            // create the columns for the current row
            this._tileGrid[i] = new Array<Tile>(numCols);


            // loop through the columns and put a random tile
            for (let j = 0; j < numCols; j++) {
                // randomly choose between GrassTile (tileChoice = 0)
                // and mudtile (tileChoice = 1)
                let tileChoice = Math.floor(Math.random() * 2);


                if (tileChoice == 0) {
                    this._tileGrid[i]![j] = new PathTile(j * tileLength, i * tileLength, tileLength, tileLength);
                }
                else {
                    this._tileGrid[i]![j] = new TowerTile(j * tileLength, i * tileLength, tileLength, tileLength);
                }
            }
        }
    }
}



