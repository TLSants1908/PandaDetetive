window.createButton = function(label, action, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener("click", action);
    return button;
};

window.showPopup = function({ title, text, image = false, buttons = [] }) {
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");
    const popupImage = document.getElementById("popup-image");
    const popupActions = document.getElementById("popup-actions");

    if (!popup) return;

    popupTitle.textContent = title;
    popupText.textContent = text;
    popupImage.classList.toggle("hidden", !image);
    popupActions.replaceChildren(...buttons);
    popup.classList.remove("hidden");

    const firstButton = popupActions.querySelector("button");
    if (firstButton) {
        firstButton.focus();
    }
};

window.closePopup = function() {
    const popup = document.getElementById("popup");
    if (window.gameState && window.gameState.gameFinished) return;
    if (popup) {
        popup.classList.add("hidden");
    }
};

window.showMessage = function(title, text) {
    window.showPopup({
        title,
        text,
        buttons: [window.createButton("FECHAR", window.closePopup)]
    });
};

window.showStartMenu = function() {
    const startMenu = document.getElementById("start-menu");
    const gameContainer = document.getElementById("game");
    if (startMenu) startMenu.classList.remove("hidden");
    if (gameContainer) gameContainer.classList.add("hidden");
};

window.hideStartMenu = function() {
    const startMenu = document.getElementById("start-menu");
    const gameContainer = document.getElementById("game");
    if (startMenu) startMenu.classList.add("hidden");
    if (gameContainer) gameContainer.classList.remove("hidden");
};

window.openPauseMenu = function() {
    const pauseMenu = document.getElementById("pause-menu");
    if (!window.gameState.gameStarted || window.gameState.gameFinished) return;
    window.gameState.isPaused = true;
    if (pauseMenu) pauseMenu.classList.remove("hidden");
};

window.closePauseMenu = function() {
    const pauseMenu = document.getElementById("pause-menu");
    window.gameState.isPaused = false;
    if (pauseMenu) pauseMenu.classList.add("hidden");
};

window.togglePauseMenu = function() {
    if (window.gameState.isPaused) {
        window.closePauseMenu();
    } else {
        window.openPauseMenu();
    }
};

window.updateVolumeUI = function(value) {
    const numericValue = Number(value);
    window.gameState.volume = numericValue / 100;

    const startVolSlider = document.getElementById("start-volume-slider");
    const pauseVolSlider = document.getElementById("pause-volume-slider");
    const startVolVal = document.getElementById("start-volume-value");
    const pauseVolVal = document.getElementById("pause-volume-value");

    if (startVolSlider) startVolSlider.value = numericValue;
    if (pauseVolSlider) pauseVolSlider.value = numericValue;
    if (startVolVal) startVolVal.textContent = `${numericValue}%`;
    if (pauseVolVal) pauseVolVal.textContent = `${numericValue}%`;
};