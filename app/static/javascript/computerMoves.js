import { getValidMoves } from "./getMoves.js";
import { movePiece } from "./turn.js";
import { stopTimer } from "./timer.js";
import { startTimer } from "./timer.js";
import { handleComputerLoss } from "./handleEndGame.js"

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

    console.log ('checkmate/stalemate test', validMoves);
    if (validMoves.from === null && validMoves.to === null) {
        console.log ('no moves', validMoves);
        if (validMoves.checkmate) {
            handleComputerLoss ('checkmate', window.userColor);
            console.log('checkmate');
        }
        else if (validMoves.stalemate) {
            handleComputerLoss ('stalemate', window.userColor);
            console.log ('stalemate');
        }
    }
    else {
        console.log ('in get computer moves, valid moves', validMoves);
        setTimeout(() => { takeComputerTurn(validMoves.from, validMoves.to); }, delay); 
    }

}

/*take computer turn, calls movePiece*/
export function takeComputerTurn (validMoveFrom, validMoveTo) {
    movePiece (validMoveFrom, validMoveTo);
}
