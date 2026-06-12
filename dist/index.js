import { GameController } from "./GameController.js";
/**
 * The entry point for Robot Tower Defence.
 *
 * Waits for the player to press Start on the menu, then hides the menu
 * and creates the GameController, which starts the game loop.
 */
function startGame() {
    const menu = document.getElementById("menu");
    if (menu !== null) {
        menu.style.display = "none";
    }
    new GameController("game-canvas");
}
window.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    if (startButton === null) {
        throw new Error("Start button was not found.");
    }
    startButton.addEventListener("click", () => {
        startGame();
    });
});
//# sourceMappingURL=index.js.map