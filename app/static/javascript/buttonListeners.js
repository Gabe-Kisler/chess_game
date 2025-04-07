
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

window.addEventListener('load', function () {
    mediumButton.classList.add('selected');
    fiveButton.classList.add('selected');
    whiteButton.classList.add('selected');
    addTimeButtonListeners();
    addDifficultyButtonListeners();
    addColorButtonListeners();
    setupBoard ('white');
});

themesButton.onclick = function () {
    themesPopout.style.display = 'flex';
}

overlay.onclick = function () {
    themesPopout.style.display = 'none';
}

function applyTheme(theme) {
    body.classList.remove(
        'default-theme',
        'black-and-white-theme',
        'lavendar-brown-theme',
        'pinks-theme',
        'bright-theme',
        'space-theme'
    );
    body.classList.add(theme);
}

defaultBtn.onclick = function () {
    applyTheme('default-theme');
}
blackAndWhiteBtn.onclick = function () {
    applyTheme('black-and-white-theme');
}
lavendarBtn.onclick = function () {
    applyTheme('lavendar-brown-theme');
}
pinksBtn.onclick = function () {
    applyTheme('pinks-theme');
}
brightBtn.onclick = function () {
    applyTheme('bright-theme');
}
spaceBtn.onclick = function () {
    applyTheme('space-theme');
}

function clearTimeButtons() {
    document.querySelectorAll('.optionsButton.time').forEach(button => {
        button.classList.remove('selected');
    });
}

function clearDifficultyButtons() {
    document.querySelectorAll('.optionsButton.difficulty').forEach(button => {
        button.classList.remove('selected');
    });
}

function clearColorButtons() {
    document.querySelectorAll('.optionsButton.color').forEach(button => {
        button.classList.remove('selected');
    });
}

function addTimeButtonListeners() {
    document.querySelectorAll('.optionsButton.time').forEach(button => {
        button.addEventListener('click', function () {
            clearTimeButtons();
            button.classList.add('selected');
        });
    });
}

function addDifficultyButtonListeners() {
    document.querySelectorAll('.optionsButton.difficulty').forEach(button => {
        button.addEventListener('click', function () {
            clearDifficultyButtons();
            button.classList.add('selected');
        });
    });
}

function addColorButtonListeners() {
    document.querySelectorAll('.optionsButton.color').forEach(button => {
        button.addEventListener('click', function () {
            clearColorButtons();
            button.classList.add('selected');
        });
    });
}

