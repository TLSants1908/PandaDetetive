import { REQUIRED_CLUES } from './data.js';
import { gameState } from './state.js';
import { showPopup, closePopup, showMessage, createButton } from './ui.js';
import { prepareCase, investigateObject, showJudgmentOffer, getCharacterDialogue, setCachedObjects } from './game.js';

// Query Selectors
const hotspots = Array.from(document.querySelectorAll(".hotspot"));
const airplaneHitbox = document.getElementById("airplane-hitbox");
const airplaneOutline = document.getElementById("airplane-outline");
const characters = document.querySelectorAll(".character");
const popup = document.getElementById("popup");

const searchableObjects = [
    ...hotspots.filter((hotspot) => hotspot.id !== "airplane-outline"),
    airplaneHitbox
].filter(Boolean);

setCachedObjects(searchableObjects);

// Eventos de Investigação (Objetos)
searchableObjects.forEach((object) => {
    object.addEventListener("click", (event) => {
        event.stopPropagation();
        investigateObject(object);
    });
});

// Eventos Visuais (Avião)
if (airplaneHitbox && airplaneOutline) {
    airplaneHitbox.addEventListener("mouseenter", () => airplaneOutline.classList.add("airplane-active"));
    airplaneHitbox.addEventListener("mouseleave", () => airplaneOutline.classList.remove("airplane-active"));
}

// Eventos de Personagens (Diálogos e Acusação)
characters.forEach((character) => {
    character.addEventListener("click", (event) => {
        event.stopPropagation();
        
        if (character.dataset.name === "PANDA DETETIVE" && gameState.foundClues.size === REQUIRED_CLUES) {
            showJudgmentOffer();
            return;
        }
        
        showMessage(character.dataset.name, getCharacterDialogue(character.dataset.name));
    });
});

// Eventos do Popup (Fechar)
popup.addEventListener("click", (event) => {
    if (event.target === popup && !gameState.gameFinished) closePopup();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !gameState.gameFinished) closePopup();
});

// Inicialização da Partida
prepareCase(searchableObjects);

showPopup({
    title: "CASO: O ROUBO DOS DOCES",
    text: "Investigue os objetos do quarto e encontre seis pistas. Os personagens não escondem pistas, mas os diálogos mudam conforme novas evidências são descobertas.",
    buttons: [createButton("COMEÇAR", closePopup, "success-button")]
});