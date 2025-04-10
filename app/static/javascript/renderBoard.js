import { pieceImages } from './constants.js';
import { removePieceListeners } from './turn.js';
import { removeValidMoveListeners } from './turn.js';

let isBoardRendered = false;
let pieceListeners = {};
let moveListeners = {};

/*removes current listeners & sets board state, calls renderSquares*/
export function render_board(boardState) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (isBoardRendered) {
        removeValidMoveListeners(moveListeners);
        removePieceListeners(pieceListeners);
    }

    console.log('render board called:', boardState);
    console.log ('called with color, turn', window.userColor, window.turn);

    renderSquares(boardState, rows, columns);

    window.boardState = boardState;
    isBoardRendered = true;
}

/*renders pieces from current board state*/
function renderSquares(boardState, rows, columns) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let currSquareId = rows[i] + columns[j];
            const piece = boardState[currSquareId];
            const imageElement = document.getElementById(`${currSquareId}-img`);

            if (piece && imageElement) {
                imageElement.src = pieceImages[piece];
                imageElement.style.display = 'block';
            } else if (imageElement) {
                imageElement.style.display = 'none';
            }
        }
    }
}
