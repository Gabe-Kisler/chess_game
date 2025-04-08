import { getPieceClicked } from './renderBoard.js';
import { takeTurn } from './turn.js';

export function highlightMoves (squares) {
    removeHighlight(squares);
    
    for (let square in squares) {
        let move = squares[square];
            console.log ('adding valid move class list');
            document.getElementById(move).classList.add("valid-move");
    }
}

export function removeHighlight () {
    const highlightedSquare = document.querySelectorAll('.valid-move');

    highlightedSquare.forEach (square => {
        square.classList.remove('valid-move');
    });

}

