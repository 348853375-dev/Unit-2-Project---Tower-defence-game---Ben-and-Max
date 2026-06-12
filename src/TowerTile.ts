import { Tile } from "./Tile";


export class TowerTile extends Tile {
    public static readonly TILE_TYPE = 'Mud';

    constructor(x : number, y : number, width : number, height : number) {
        super(x, y, width, height, TowerTile.TILE_TYPE);
    }
}