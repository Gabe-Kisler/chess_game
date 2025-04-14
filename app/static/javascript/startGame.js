import { setupBoard } from "./boardSetup.js";
import { getComputerMove } from './computerMoves.js';
import { setupDefaults } from "./buttonListeners.js";
import { setupButtonListeners } from "./buttonListeners.js";
import { addPieceListeners } from "././pieceListeners.js";

let turn = 'user';

window.turn;
window.userTurnCount;
window.computerTurnCount;
window.userColor;
window.boardState;



window.addEventListener ('load', function () {
    setupBoard (window.userColor);
    setupDefaults();
    setupButtonListeners();
});

export function startGame (user_color, time, difficulty) {
    startTimer(time);
    window.userTurnCount = 0;
    window.computerTurnCount = 0;
    console.log ('start game function', user_color, time, difficulty);
    if (user_color == 'white') {
        window.turn = 'user';
    }
    else {
        window.turn = 'computer';
        getComputerMove ('black');
    }

    addPieceListeners(window.boardState, window.turn);
}

export function startTimer (time, player) {

     
    const p1Timer = document.getElementById('player-1-time');
    const p2Timer = document.getElementById('player-2-timer');

    if (window.time ==='2:30') {
        userTime = {'minutes': 2, 'seconds': 30};
        computerTime = {'minutes': 2, 'seconds': 30};
    }
    else if (window.time === '5:00') {
        userTime = {'minutes': 5, 'seconds': 0};
        computerTime = {'minutes': 10, 'seconds': 0};
    }
    else if (window.time === '10:00') {
        userTime = {'minutes': 10, 'seconds': 0};
        computerTime = {'minutes': 10, 'seconds': 0};
    }

    if (window.turn === 'user') {
        var timer  = setInterval (function intervalTime() {
            p1Timer.innerHTML = userTime.minutes + ':' + userTime.seconds;

            userTime -= 1;
            if (userTime <= 0) {
                clearInterval(timer);
                p1Timer.innerHTML = 'out of time';
            }
    }, 1000);

    if (window.turn === 'computer') {
        var timer = setInterval (function intervalTime() {
            if (computerTime.seconds === 0) {
                let seconds = '00'
            }
            p2Timer.innerHTML = computerTime.minutes + ':' + seconds;

            computerTime -= 1;
            if (computerTime <= 0) {
                clearInterval(timer);
                p2Timer.innerHTML = 'no time left';
            }
        }, 1000);
    }
}
}



