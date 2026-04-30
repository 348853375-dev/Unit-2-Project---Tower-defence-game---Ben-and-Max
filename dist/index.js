// add keyboard even listners to the document 
document.addEventListener('keydown', (e) => { checkKeyDown(e); });
// Create the GameController to talk to the Model
let GameController = new GameController();
/**
 * keydown event listner
 * @param event Information about the key that was pushed down
 */
function checkKeyDown(event) {
    console.log(event.key);
}
//# sourceMappingURL=index.js.map