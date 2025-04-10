import { getValidMoves } from './getMoves.js';
import { highlightMoves } from './squareHighlight.js';
import { removeHighlight } from './squareHighlight.js';

let pieceListeners = {};
let validMoves = '';

/*adds listeners to pieces*/
export function addPieceListeners(boardState, turn) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    
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
                const handler = function () {
                    if (window.turn != 'user') {
                        return;
                    }

                    if (window.pieceSelected != null) {
                        return;
                    }

                    removeHighlight();
                    window.pieceSelected = getPieceClicked(currSquareId, boardState);
                    pieceListeners[currSquareId] = { element: imageElement, handler };

                    if (turn === 'user' && window.pieceSelected[0] === 'w') {
                        validMoves = getValidMoves(currSquareId, 'white', turn);
                        highlightMoves(validMoves);
                    }
                    if (turn === 'user' && window.pieceSelected[0] === 'b') {
                        validMoves = getValidMoves(currSquareId, 'black', turn);
                        highlightMoves(validMoves);
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

