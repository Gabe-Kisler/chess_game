let userTime;
let computerTime;
let computerTimerInterval;
let userTimerInterval;

export function startTimer () {

    const p1Timer = document.getElementById('player-1-time');
    const p2Timer = document.getElementById('player-2-time');

    if (!userTime || !computerTime) {
        if (window.time ==='2:30') {
            userTime = {minutes: 2, seconds: 30};
            computerTime = {minutes: 2, seconds: 30};
        }
        else if (window.time === '5:00') {
            userTime = {minutes: 5, seconds: 0};
            computerTime = {minutes: 10, seconds: 0};
        }
        else if (window.time === '10:00') {
            userTime = {minutes: 10, seconds: 0};
            computerTime = {minutes: 10, seconds: 0};
        }

    clearInterval(userTimerInterval);
    clearInterval(computerTimerInterval);

    }

    if (window.turn === 'user') {
        userTimerInterval  = setInterval (function intervalTime() {
            if (userTime.seconds === 0) {
                if (userTime.minutes === 0) {
                    clearInterval(userTimerInterval);
                    p1Timer.innerHTML = "out of time";
                    return;
                }

                userTime.minutes--;
                userTime.seconds = 59;
            }

            userTime.seconds--;

            p1Timer.innerHTML = userTime.minutes + ':' + userTime.seconds.toString().padStart(2, '0');
        }, 1000);
    }

    if (window.turn === 'computer') {
        computerTimerInterval = setInterval (function intervalTime() {
            if (computerTime.seconds === 0) {
                if (computerTime.minutes === 0) {
                    clearInterval(computerTimerInterval);
                    p2Timer.innerHTML = "out of time";
                    return;
                }

                computerTime.minutes--;
                computerTime.seconds = 59;
            }

            computerTime.seconds--;

            p2Timer.innerHTML = computerTime.minutes + ':' + computerTime.seconds.toString().padStart(2, '0');
        }, 1000);
    }
}

export function stopTimer () {
    clearInterval(userTimerInterval);
    clearInterval(computerTimerInterval);
}

