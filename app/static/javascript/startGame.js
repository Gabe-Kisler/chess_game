const startButton = document.getElementById ('start-game')

startButton.addEventListener('click', startGame);

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
    setupBoard ();
    takeTurn (turn_color)
}

function setupBoard (user_color) {
    fetch(`/setup_game/${user_color}`)
        .then(reponse => reponse.json())
        .then(boardState => {
            render_board(boardState);
        });
}

function render_board (boardState) {
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (i = 0; i < 8; i++) {
        for (j = 0; j <= 8; j++) {
            squareId = rows[i] + columns[j];

            const piece = boardState[squareId];
            const squareElement = document.getElementById(squareId);
            const imageElement = document.getElementById(`${squareId}-img`);

            console.log (piece);
            console.log (squareElement)
            console.log (imageElement)

            if (imageElement) {
                imageElement.addEventListener('click', function() {
                    getPieceClicked (squareId, boardState)
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
    takeTurn (piece, squareId);
}
function takeTurn (turn_color) {
    let pieceClicked = getPieceClicked ();

    fetch ('/get-valid-turns', {
        method: 'POST',
        body: JSON.stringify ({piece: pieceClicked, color: turn_color, square: squareId}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then (response => response.json())
        .then (validTurns => {
            getValidTurns(validTurns);
        })
        .catch (error => {
            console.log ('could not fetch valid turns', error);
        });
    }

function getPieceClicked (squareId, boardState) {
    piece = boardState[squareId];
    return [squareId, piece]
}



