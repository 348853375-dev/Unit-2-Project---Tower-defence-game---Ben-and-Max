import { GameController } from "./GameController.js";

// add keyboard even listners to the document 
document.addEventListener('keydown', (e : KeyboardEvent) => { checkKeyDown(e); });

// Create the GameController to talk to the Model
let GameController : GameController = new GameController();

/**
 * keydown event listner
 * @param event Information about the key that was pushed down 
 */
function checkKeyDown(event: KeyboardEvent) : void {
    console.log(event.key);
}