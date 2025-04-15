import { getValidMoves } from "./getMoves.js";
import { movePiece } from "./turn.js";
import { stopTimer } from "./timer.js";
import { startTimer } from "./timer.js";

/*fetch random computer move, calls takeComputerTurn & getValidMoves*/
export async function getComputerMove () {
    console.log ('getting computer moves');
    let validMoves;

    stopTimer();
    startTimer();

    let delay = Math.floor(Math.random() * 7001);
    
    
    console.log (window.turn)
    if (window.userColor === 'white') {
        validMoves = await getValidMoves (null, 'black', 'computer');
    }
    else if (window.userColor === 'black') {
        validMoves = await getValidMoves (null, 'white', 'computer');
    }

    console.log ('in get computer moves, valid moves', validMoves);
    setTimeout(() => { takeComputerTurn(validMoves.from, validMoves.to); }, delay); 
}

/*take computer turn, calls movePiece*/
function takeComputerTurn (validMoveFrom, validMoveTo) {
    movePiece (validMoveFrom, validMoveTo);
}
