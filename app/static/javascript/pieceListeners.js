import { getValidMoves } from './getMoves.js';
import { highlightMoves } from './squareHighlight.js';
import { removeHighlight } from './squareHighlight.js';
import { stopTimer } from './timer.js';
import { startTimer } from './timer.js';

let pieceListeners = {};
let validMoves = '';

/*adds listeners to pieces*/
export function addPieceListeners(boardState, turn) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    window.turn = turn;

    stopTimer();
    startTimer();

    for (const squareId in pieceListeners) {
        const { element, handler } = pieceListeners[squareId];
        element.removeEventListener('click', handler);
        delete pieceListeners[squareId];
    }



    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let currSquareId = rows[i] + columns[j];
            const piece = boardState[currSquareId];
            const imageElement = document.getElementById(`${currSquareId}-img`);

            if (imageElement && piece) {
                if (pieceListeners[currSquareId]) {
                    const { element, handler } = pieceListeners[currSquareId];
                    element.removeEventListener('click', handler);
                    delete pieceListeners[currSquareId];
                }

                const clickedPiece = boardState[currSquareId];
                const isPieceWhite = clickedPiece[0] === 'w';
                const isPieceBlack = clickedPiece[0] === 'b';
                const isUserWhite = window.userColor === 'white';
                const isUserBlack = window.userColor === 'black';
                const isUserPiece = (isUserWhite && isPieceWhite) || (isUserBlack && isPieceBlack);
            
                if (window.turn === 'user') {
                    if (isUserPiece) {
                        imageElement.classList.add('user-piece');
                    } else {
                        imageElement.classList.remove('user-piece');
                    }
                }


                const handler = function () {
                    if (window.turn !== 'user') {
                        return;
                    }

                    if (isUserPiece) {
                        imageElement.classList.add('user-piece');
                    } 
                    else {
                        imageElement.classList.remove('user-piece');
                    }

                    if (isUserPiece) {
                        if (window.pieceSelected === boardState[currSquareId] && window.squareSelected === currSquareId) {
                            return; 
                        }
                        window.pieceSelected = clickedPiece;
                        window.squareSelected = currSquareId;
                        validMoves = getValidMoves(currSquareId, window.userColor, turn);
                        removeHighlight();
                        highlightMoves(validMoves);
                    } else {
                        window.pieceSelected = null;
                    }
                };
                imageElement.addEventListener('click', handler);
                pieceListeners[currSquareId] = { element: imageElement, handler };
            }
        }
    }
}
        

/*returns piece clicked*/
export function getPieceClicked(squareId, boardState) {
    const piece = boardState[squareId];
    return piece;
}

