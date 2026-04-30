import { BaseModel } from "./BaseModel.js";
import { GameImage } from "./GameImage.js";
class BaseController {
    _baseModel;
    _gameImage;
    constructor(x, y, health, filename) {
        this._baseModel = new BaseModel(health, x, y);
        this._gameImage = new GameImage(filename, this._baseModel);
    }
    draw(canvas, ctx) {
        if (this._gameImage.complete) {
            ctx.drawImage(this._gameImage.img, this._baseModel.x, this._baseModel.y, 80, 80);
        }
    }
    takeDamage(amount) {
        this._baseModel.takeDamage(amount);
    }
    isDestroyed() {
        return this._baseModel.isDestroyed();
    }
}
export { BaseController };
//# sourceMappingURL=BaseController.js.map