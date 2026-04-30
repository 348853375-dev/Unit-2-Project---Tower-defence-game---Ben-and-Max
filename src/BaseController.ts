import { BaseModel } from "./BaseModel.js";
import { GameImage } from "./GameImage.js";
import { Drawable } from "./Drawable.js"

class BaseController implements Drawable {
    private _baseModel: BaseModel;
    private _gameImage: GameImage;

    constructor(x: number, y: number, health: number, filename: string) {
        this._baseModel = new BaseModel(health, x, y);
        this._gameImage = new GameImage(filename, this._baseModel);
    }

    public draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        if (this._gameImage.complete) {
            ctx.drawImage(
                this._gameImage.img,
                this._baseModel.x,
                this._baseModel.y, 80, 80
            );
        }
    }

    public takeDamage(amount: number): void {
        this._baseModel.takeDamage(amount);
    }

    public isDestroyed(): boolean {
        return this._baseModel.isDestroyed();
    }
}

export { BaseController };