import { setupBoard } from "./boardSetup.js";
import { getComputerMove } from './computerMoves.js';
import { setupDefaults } from "./buttonListeners.js";
import { setupButtonListeners } from "./buttonListeners.js";
import { addPieceListeners } from "././pieceListeners.js";
import { startTimer } from "./timer.js";
import { stopTimer } from "./timer.js";
window.turn;
window.userTurnCount;
window.computerTurnCount;
window.userColor;
window.boardState;



window.addEventListener ('load', function () {
    setupBoard (window.userColor);
    setupDefaults();
    setupButtonListeners();
});

export function startGame (user_color, time, difficulty) {
    stopTimer();
    startTimer();
    window.userTurnCount = 0;
    window.computerTurnCount = 0;
    console.log ('start game function', user_color, time, difficulty);
    if (user_color == 'white') {
        window.turn = 'user';
    }
    else {
        window.turn = 'computer';
        getComputerMove ('black');
    }

    addPieceListeners(window.boardState, window.turn);
}


