import { removeHighlight } from "./squareHighlight.js";
import { render_board } from "./renderBoard.js";
import { getComputerMove } from "./computerMoves.js";


let moveListeners = {};

export function takeTurn (validMoves, turn_color, currSquare) {


    validMoves.forEach (move => {
        let moveSquare = document.getElementById (move);
        const moveHandler = function () {
            movePiece (currSquare, move);
            removeValidMoveListeners(moveListeners);
        }
            moveSquare.addEventListener ("click", moveHandler);
            moveListeners[move] = { element: moveSquare, handler: moveHandler };
    });

    if (window.turn == 'user') {
        window.turn == 'computer';
        getComputerMove (window.userColor, currSquare);
    }
    else if (window.turn == 'computer') {
        window.turn == 'user';
    }
}

export function movePiece (currSquare, move) {
    console.log ("moving piece from", currSquare, "to", move);


    let currPieceImg = document.getElementById(`${currSquare}-img`);
    let movePieceImg = document.getElementById(`${move}-img`);

    console.log ("current piece image:", currPieceImg);
    console.log ("move piece image:", movePieceImg);

    if (currPieceImg) {
        movePieceImg.src = currPieceImg.src;
        currPieceImg.style.display = "none";
        movePieceImg.style.display = "block";
    }

    removeHighlight ();
    fetch ('/update-board-state', {
        method: 'POST',
        body: JSON.stringify ({ from: currSquare, to: move }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (response => response.json())
    .then (updatedBoardState => {
        render_board(updatedBoardState);
    });

}

 
export function removePieceListeners (pieceListeners) {
    for (const square in pieceListeners) {
        const { element, handler } = pieceListeners[square];
        if (element && handler) {
            console.log ('remove valid piece listener', element);
            element.removeEventListener("click", handler);
            delete pieceListeners[square];
        }
    }

}


export function removeValidMoveListeners (moveListeners) {
    for (const move in moveListeners) {
        const { element, handler } = moveListeners[move];
        if (element && handler) {
            console.log ('removing valid move listener', element);
            element.removeEventListener("click", handler);
            delete moveListeners[move];
        }
    }
    
}