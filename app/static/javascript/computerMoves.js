import { getValidMoves } from "./getMoves.js";
import { movePiece } from "./turn.js"
import { addPieceListeners } from './renderBoard.js';

export async function getComputerMove (userColor) {
    console.log ('getting computer moves');
    let validMoves;
    
    console.log (window.turn)
    if (window.userColor === 'white') {
        validMoves = await getValidMoves (null, 'black', 'computer');
    }
    else if (window.userColor === 'black') {
        validMoves = await getValidMoves (null, 'white', 'computer');
    }

    console.log ('in get computer moves, valid moves', validMoves);
    takeComputerTurn(validMoves.from, validMoves.to);
}

function takeComputerTurn (validMoveFrom, validMoveTo) {
    movePiece (validMoveFrom, validMoveTo);


}
