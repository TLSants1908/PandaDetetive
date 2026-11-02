import { gameState } from './state.js';

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const popupImage = document.getElementById("popup-image");
const popupActions = document.getElementById("popup-actions");

export function createButton(label, action, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    if (className) button.className = className;
    button.addEventListener("click", action);
    return button;
}

export function showPopup({ title, text, image = false, buttons = [] }) {
    popupTitle.textContent = title;
    popupText.textContent = text;
    popupImage.classList.toggle("hidden", !image);
    popupActions.replaceChildren(...buttons);
    popup.classList.remove("hidden");

    const firstButton = popupActions.querySelector("button");
    if (firstButton) firstButton.focus();
}

export function closePopup() {
    if (gameState.gameFinished) return;
    popup.classList.add("hidden");
}

export function showMessage(title, text) {
    showPopup({
        title,
        text,
        buttons: [createButton("FECHAR", closePopup)]
    });
}