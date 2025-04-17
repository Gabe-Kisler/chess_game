import { setupBoard } from "./boardSetup.js";
import { startGame } from "./startGame.js";

const startGameButton = document.getElementById ('start-game');
const accountButton = document.getElementById ('accountButton');
const themesPopout = document.getElementById('themesPopout');
const themesButton = document.getElementById('themesButton');
const overlay = document.getElementById('themesPopoutOverlay');
const body = document.body;

const defaultBtn = document.getElementById('default');
const blackAndWhiteBtn = document.getElementById('black-and-white');
const lavendarBtn = document.getElementById('lavendar-brown');
const pinksBtn = document.getElementById('pinks');
const brightBtn = document.getElementById('bright');
const spaceBtn = document.getElementById('space');

const easyButton = document.getElementById('easyButton');
const mediumButton = document.getElementById('mediumButton');
const hardButton = document.getElementById('hardButton');
const twoThirtyButton = document.getElementById('twoThirtyButton');
const fiveButton = document.getElementById('fiveButton');
const tenButton = document.getElementById('tenButton');
const whiteButton = document.getElementById('whiteButton');
const blackButton = document.getElementById('blackButton');

const p1Timer = document.getElementById('player-1-time');
const p2Timer = document.getElementById('player-2-time');


/*sets up default indicators on five min, medium, and white buttons*/
export function setupDefaults () {
    mediumButton.classList.add('selected');
    window.difficulty = 'medium';
    fiveButton.classList.add('selected');
    window.time = '5:00';
    whiteButton.classList.add('selected');
    window.userColor = 'white';
    if (window.userColor == 'white') {
        window.turn = 'user';
    }
    else if (window.userColor == 'black') {
        window.turn = 'computer';
    }
}

/*sets up on screen button listeners*/
export function setupButtonListeners () {
    addTimeButtonListeners();
    addDifficultyButtonListeners();
    addColorButtonListeners();
    addGameButtonListeners();
    addThemeButtonListeners();
}

/*game button listener functionality*/
function addGameButtonListeners () {
    document.querySelectorAll('.game-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonId = event.currentTarget.id;
            switch (buttonId) {
                case ('start-game'):
                    console.log ('start game hit');
                    startGame(window.userColor, window.time, window.difficulty);
                    break;
                case ('accountButton'):
                    /* handle later */
                    break;
                case ('themesButton'):
                    displayThemePopout ();
            }
        });
    });

}

/*display theme modal*/
function displayThemePopout() {
    themesPopout.style.display = 'flex';
}

/*remove modal*/
overlay.onclick = function () {
    themesPopout.style.display = 'none';
}

/*apply theme based off defined css class*/
function applyTheme(theme) {
    body.classList.remove(
        'default',
        'black-and-white',
        'lavendar-brown',
        'pinks',
        'bright',
        'space'
    );
    body.classList.add(theme);
}

/*removes all existing time button highlights*/
function clearTimeButtons() {
    document.querySelectorAll('.optionsButton.time').forEach(button => {
        button.classList.remove('selected');
    });
}

/*removes all existing difficulty button highlights*/
function clearDifficultyButtons() {
    document.querySelectorAll('.optionsButton.difficulty').forEach(button => {
        button.classList.remove('selected');
    });
}

/*removes all existing color button highlights*/
function clearColorButtons() {
    document.querySelectorAll('.optionsButton.color').forEach(button => {
        button.classList.remove('selected');
    });
}

/*adds listeners to time buttons*/
function addTimeButtonListeners() {
    document.querySelectorAll('.optionsButton.time').forEach(button => {
        button.addEventListener('click', function () {
            clearTimeButtons();
            button.classList.add('selected');
            if (button.id == 'twoThirtyButton') {
                p1Timer.textContent = '2:30';
                p2Timer.textContent = '2:30';
                window.time = '2:30';
            }
            else if (button.id == 'fiveButton') {
                p1Timer.textContent = '5:00';
                p2Timer.textContent = '5:00';
                window.time = '5:00';
            }
            else if (button.id == 'tenButton') {
                p1Timer.textContent = '10:00';
                p2Timer.textContent = '10:00';
                window.time = '10:00';
            }

        });
    });
}

/*adds listeners to difficulty buttons*/
function addDifficultyButtonListeners() {
    document.querySelectorAll('.optionsButton.difficulty').forEach(button => {
        button.addEventListener('click', function () {
            clearDifficultyButtons();
            button.classList.add('selected');
            if (button.id == 'hardButton') {
                window.difficulty = 'hard';
            }
            else if (button.id == 'easyButton') {
                window.difficulty = 'easy';
            }
            else if (button.id == 'mediumButton') {
                window.difficulty = 'medium';
            }
        });
    });
}

/*adds listeners to color buttons*/
function addColorButtonListeners() {
    document.querySelectorAll('.optionsButton.color').forEach(button => {
        button.addEventListener('click', function () {
            clearColorButtons();
            button.classList.add('selected');
            if (button.id == 'whiteButton') {
                setupBoard ('white');
                window.userColor = 'white';
            }
            if (button.id == 'blackButton') {
                setupBoard ('black');
                window.userColor = 'black';
            }
        });
    });
}

/*adds listeners to buttons on themes modal*/
function addThemeButtonListeners () {
    document.querySelectorAll('.multi-color-button').forEach(button => {
        button.addEventListener('click', function (event) {
            const buttonId = event.currentTarget.id;
            applyTheme (buttonId);
        });
    });
}

