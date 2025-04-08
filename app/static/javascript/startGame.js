import { setupBoard } from "./boardSetup.js";
import { takeTurn } from "./turn.js";
import { setupDefaults } from "./buttonListeners.js";
import { setupButtonListeners } from "./buttonListeners.js";
import { addPieceListeners } from "./renderBoard.js";

let turn = 'user';

window.addEventListener ('load', function () {
    setupBoard (window.userColor);
    setupDefaults();
    setupButtonListeners();
});

export function startGame (user_color, time, difficulty) {
    console.log ('start game function', user_color, time, difficulty);
    if (user_color == 'white') {
        turn = 'user';
    }
    else {
        turn = 'computer';
    }

    addPieceListeners(window.boardState, turn);
}

