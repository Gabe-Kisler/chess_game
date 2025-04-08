import { pieceImages } from './constants.js';
import { removeHighlight } from './squareHighlight.js';
import { removePieceListeners } from './turn.js';
import { removeValidMoveListeners } from './turn.js';
import { getValidMoves } from './getMoves.js';
import { highlightMoves } from './squareHighlight.js';
import { getComputerMove } from './computerMoves.js';

let isBoardRendered = false;
let pieceSelected = '';
let pieceListeners = {};
let moveListeners = {};
let validMoves = '';

export function render_board(boardState) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (isBoardRendered) {
        removeValidMoveListeners(moveListeners);
        removePieceListeners(pieceListeners);
    }

    console.log('render board called:', boardState);
    console.log ('called with color, turn', window.color, window.turn);

    renderSquares(boardState, rows, columns);

    window.boardState = boardState;
    isBoardRendered = true;
}

function renderSquares(boardState, rows, columns) {
    if (window.turn === 'computer') {
        getComputerMove (window.userColor)
    }
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

export function addPieceListeners(boardState, turn) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let currSquareId = rows[i] + columns[j];
            const piece = boardState[currSquareId];
            const imageElement = document.getElementById(`${currSquareId}-img`);

            if (imageElement && piece && !pieceListeners[currSquareId]) {
                const handler = function () {
                    removeHighlight();
                    pieceSelected = getPieceClicked(currSquareId, boardState);
                    pieceListeners[currSquareId] = { element: imageElement, handler };

                    if (turn === 'user' && pieceSelected[0] === 'w') {
                        validMoves = getValidMoves(currSquareId, 'white', turn);
                        highlightMoves(validMoves);
                    }
                    if (turn === 'user' && pieceSelected[0] === 'b') {
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

export function getPieceClicked(squareId, boardState) {
    const piece = boardState[squareId];
    return piece;
}

