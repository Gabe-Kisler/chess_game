import { stopTimer } from "./timer.js"

const endGameCard = document.getElementById('endGameCard');
const gameResults = document.getElementById('gameResults');


export function handleComputerLoss (type) {
    stopTimer();
    if (type == 'stalemate') {
        gameResults.innerHTML = 'you tie';
    }
    else {
        gameResults.innerHTML = 'you win';
    }
    endGameCard.style.display = 'flex';
}

export function handleUserLoss (type) {
    stopTimer();
    if (type == 'stalemate') {
        gameResults.innerHTML = 'you tie';
    }
    else {
        gameResults.innerHTML = 'computer wins';
    }
    endGameCard.style.display = 'flex';
}