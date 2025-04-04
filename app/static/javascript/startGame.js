const startButton = document.getElementById ('start-game')

startButton.addEventListener('click', startGame);

let boardState = '';
let pieceSelected = '';
let squareId = '';
let pieceListeners = {};
let moveListeners = {};


const pieceImages = {
    "wP": "/static/resources/white-pawn.svg",
    "bP": "/static/resources/black-pawn.svg",
    "wR": "/static/resources/white-rook.svg",
    "bR": "/static/resources/black-rook.svg",
    "wN": "/static/resources/white-knight.svg",
    "bN": "/static/resources/black-knight.svg",
    "wB": "/static/resources/white-bishop.svg",
    "bB": "/static/resources/black-bishop.svg",
    "wQ": "/static/resources/white-queen.svg",
    "bQ": "/static/resources/black-queen.svg",
    "wK": "/static/resources/white-king.svg",
    "bK": "/static/resources/black-king.svg"
};

function startGame () {
    setupBoard ('white');
}

function setupBoard (user_color) {
    fetch(`/setup_game/${user_color}`)
        .then(response => response.json())
        .then(boardState => {
            render_board(boardState);
        });
}

let isBoardRendered = false;

function render_board (boardState) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (isBoardRendered) {
        removeValidMoveListeners(moveListeners);
        removePieceListeners(pieceListeners);
    }

    console.log ('render board called:', boardState);
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let currSquareId = rows[i] + columns[j];


            const piece = boardState[currSquareId];
            const squareElement = document.getElementById(currSquareId);
            const imageElement = document.getElementById(`${currSquareId}-img`);

            console.log (pieceListeners);

            if (imageElement && piece && !pieceListeners[currSquareId]) {
                const handler = function () {
                    removeHighlight();
                    pieceSelected = getPieceClicked (currSquareId, boardState);
                    pieceListeners[currSquareId] = { element: imageElement, handler };

                    if (pieceSelected[0] === 'w')
                        highlightValidMoves (currSquareId, 'white');
                }
                imageElement.addEventListener('click', handler);
                pieceListeners[currSquareId] = { element: imageElement, handler };
  
            }

            if (piece && imageElement) {
                imageElement.src = pieceImages[piece]
                imageElement.style.display = 'block';
            }
            else if (imageElement) {
                imageElement.style.display = 'none';
            }


        }
    }

    isBoardRendered = true;
}

function getPieceClicked (squareId, boardState) {
    piece = boardState[squareId];
    return piece;
}

function highlightMoves (squares) {
    removeHighlight(squares);
    
    for (let square in squares) {
        let move = squares[square];
            console.log ('adding valid move class list');
            document.getElementById(move).classList.add("valid-move");
    }
}




function removeHighlight () {
    const highlightedSquare = document.querySelectorAll('.valid-move');

    highlightedSquare.forEach (square => {
        square.classList.remove('valid-move');
    });

}



function highlightValidMoves (squareSelected, turn_color) {

    console.log ('taking turn with: ', pieceSelected, turn_color, squareSelected);
    fetch ('/get-valid-turns', {
        method: 'POST',
        body: JSON.stringify ({piece: pieceSelected, color: turn_color, square: squareSelected}),
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

function takeTurn (validMoves, turn_color, currSquare) {


    validMoves.forEach (move => {
        let moveSquare = document.getElementById (move);
        const moveHandler = function () {
            movePiece (currSquare, move);
            removeValidMoveListeners(moveListeners);
        }
            moveSquare.addEventListener ("click", moveHandler);
            moveListeners[move] = { element: moveSquare, handler: moveHandler };
    });
}


function movePiece (currSquare, move) {
    console.log ("moving piece from", currSquare, "to", move);

    let currentSquare = document.getElementById (currSquare);
    let squareToMove = document.getElementById(move);

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

 
function removePieceListeners (pieceListeners) {
    for (const square in pieceListeners) {
        const { element, handler } = pieceListeners[square];
        if (element && handler) {
            console.log ('remove valid piece listener', element);
            element.removeEventListener("click", handler);
            delete pieceListeners[square];
        }
    }

}

function removeValidMoveListeners (moveListeners) {
    for (const move in moveListeners) {
        const { element, handler } = moveListeners[move];
        if (element && handler) {
            console.log ('removing valid move listener', element);
            element.removeEventListener("click", handler);
            delete moveListeners[move];
        }
    }
    
}