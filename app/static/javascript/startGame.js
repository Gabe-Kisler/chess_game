const startButton = document.getElementById ('start-game')

startButton.addEventListener('click', startGame);

let pieceSelected = '';
let squareId = '';
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

function render_board (boardState) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            let currSquareId = rows[i] + columns[j];

            const piece = boardState[currSquareId];
            const squareElement = document.getElementById(currSquareId);
            const imageElement = document.getElementById(`${currSquareId}-img`);

            console.log (piece);

            if (imageElement) {
                imageElement.addEventListener('click', function() {
                    pieceSelected = getPieceClicked (currSquareId, boardState);
                    if (pieceSelected[0] === 'w')
                    // TEST
                    takeTurn (currSquareId, 'white');
                });
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



function takeTurn (squareSelected, turn_color) {

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
        })
        .catch (error => {
            console.log ('could not fetch valid turns', error);
        });
    }

