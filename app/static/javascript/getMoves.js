import { highlightMoves } from './squareHighlight.js';
import { getPieceClicked } from './pieceListeners.js';
import { takeTurn } from "./turn.js";
import { handleUserLoss } from "./handleEndGame.js"


/*fetches valid moves for piece selected,
  if user - highlight valid moves & call takeTurn
  if computer - return valid moves*/
export async function getValidMoves (squareSelected, turn_color, turn) {
    let delay = Math.floor(Math.random() * 7001);

    if (window.turn === 'user') {
    const pieceSelected = getPieceClicked (squareSelected, window.boardState);
    fetch ('/get-valid-turns', {
        method: 'POST',
        body: JSON.stringify ({piece: pieceSelected, color: turn_color, square: squareSelected, turn: window.turn}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response => response.json())
    .then (validMoves => {
        console.log ('valid moves:', validMoves);
        highlightMoves (validMoves);
        if (typeof validMoves === 'string') {
            if (validMoves === 'checkmate'){
                handleUserLoss('checkmate');
                console.log ('checkmate');
            }
            else if (validMoves === 'stalemate') {
                handleUserLoss('stalemate');
                console.log ('stalemate');
            }
            return;
        }
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
