import { setupBoard } from "./boardSetup.js";
import { setupDefaults } from "./buttonListeners.js";
import { setupButtonListeners } from "./buttonListeners.js";
import { addPieceListeners } from "./pieceListeners.js";

let turn = 'user';

/*on load setup board, setup default options, setup button listeners*/
window.addEventListener ('load', function () {
    setupBoard (window.userColor);
    setupDefaults();
    setupButtonListeners();
});

/*sets up turn counter, adds listeners*/
export function startGame (user_color, time, difficulty) {
    console.log ('start game function', user_color, time, difficulty);
    window.turn = 'user';
    window.pieceSelected = null;
    if (user_color == 'white') {
        turn = 'user';
    }
    else {
        turn = 'computer';
    }

    addPieceListeners(window.boardState, turn);
}

