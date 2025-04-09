import { highlightMoves } from './squareHighlight.js';
import { getPieceClicked } from './renderBoard.js';
import { takeTurn } from "./turn.js";



export async function getValidMoves (squareSelected, turn_color, turn) {
    if (window.turn === 'user') {
    const pieceSelected = getPieceClicked (squareSelected, window.boardState);
    fetch ('/get-valid-turns', {
        method: 'POST',
        body: JSON.stringify ({piece: pieceSelected, color: turn_color, square: squareSelected, turn: turn}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response => response.json())
    .then (validMoves => {
        console.log ('valid moves:', validMoves);
        highlightMoves (validMoves);
        takeTurn (validMoves, turn_color, squareSelected);
    })
    .catch (error => {
        console.log ('could not fetch valid turns', error);
    });
    }
    else if (window.turn === 'computer') {
        const pieceSelected = getPieceClicked (squareSelected, window.boardState);
        return fetch ('/get-valid-turns', {
            method: 'POST',
            body: JSON.stringify ({piece: pieceSelected, color: turn_color, square: squareSelected, turn: turn}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then (response => response.json())
        .catch (error => {
            console.log ('could not fetch valid turns', error);
        });
        }
    }
