export function getComputerMove (userColor) {
    console.log ('getting computer moves');
    if (userColor === 'white') {
        validMoves = getValidMoves (null, 'black', 'computer');
        takeComputerTurn (validMoves);
    }
    else if (userColor === 'black') {
        validMoves = getValidMoves (null, 'white', 'computer');
        takeComputerTurn (validMoves);
    }
}

function takeComputerTurn (validMoves, squareFrom) {
    squareTo = validMoves[0];
    movePice (squareFrom, squareTo);
}
