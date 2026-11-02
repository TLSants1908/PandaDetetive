document.addEventListener("DOMContentLoaded", () => {
    const hotspots = Array.from(document.querySelectorAll(".hotspot"));
    const airplaneHitbox = document.getElementById("airplane-hitbox");
    const airplaneOutline = document.getElementById("airplane-outline");
    const characters = document.querySelectorAll(".character");

    const btnStartGame = document.getElementById("btn-start-game");
    const btnResumeGame = document.getElementById("btn-resume-game");
    const btnRestartGame = document.getElementById("btn-restart-game");
    const btnBackToTitle = document.getElementById("btn-back-to-title");
    const startVolumeSlider = document.getElementById("start-volume-slider");
    const pauseVolumeSlider = document.getElementById("pause-volume-slider");

    const searchableObjects = [
        ...hotspots.filter((hotspot) => hotspot.id !== "airplane-outline"),
        airplaneHitbox
    ].filter(Boolean);

    window.setCachedObjects(searchableObjects);

    // Exibe apenas o menu inicial ao carregar a página
    window.showStartMenu();

    // Eventos de Investigação (Objetos)
    searchableObjects.forEach((object) => {
        object.addEventListener("click", (event) => {
            event.stopPropagation();
            if (window.gameState.isPaused || !window.gameState.gameStarted) return;
            window.investigateObject(object);
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
            if (window.gameState.isPaused || !window.gameState.gameStarted) return;

            if (character.dataset.name === "PANDA DETETIVE" && window.gameState.foundClues.size === REQUIRED_CLUES) {
                window.showJudgmentOffer();
                return;
            }

            window.showMessage(character.dataset.name, window.getCharacterDialogue(character.dataset.name));
        });
    });

    // Fechar Popup clicando fora
    const popupElement = document.getElementById("popup");
    if (popupElement) {
        popupElement.addEventListener("click", (event) => {
            if (event.target === popupElement && !window.gameState.gameFinished) window.closePopup();
        });
    }

    // Tecla ESC abre/fecha o Menu de Pausa
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && window.gameState.gameStarted && !window.gameState.gameFinished) {
            window.togglePauseMenu();
        }
    });

    // Controles dos Botões do Menu e Pausa
    if (btnStartGame) {
        btnStartGame.addEventListener("click", () => {
            window.hideStartMenu();
            window.gameState.gameStarted = true;
            window.prepareCase(searchableObjects);

            window.showPopup({
                title: "CASO: O ROUBO DOS DOCES",
                text: "Investigue os objetos do quarto e encontre as pistas necessárias. Os personagens não escondem pistas, mas os diálogos mudam conforme novas evidências são descobertas.",
                buttons: [window.createButton("COMEÇAR", window.closePopup, "success-button")]
            });
        });
    }

    if (btnResumeGame) {
        btnResumeGame.addEventListener("click", window.closePauseMenu);
    }

    if (btnRestartGame) {
        btnRestartGame.addEventListener("click", () => {
            window.closePauseMenu();
            window.restartGame();
        });
    }

    if (btnBackToTitle) {
        btnBackToTitle.addEventListener("click", () => {
            window.closePauseMenu();
            window.closePopup();
            window.gameState.gameStarted = false;
            window.showStartMenu();
        });
    }

    if (startVolumeSlider) {
        startVolumeSlider.addEventListener("input", (event) => window.updateVolumeUI(event.target.value));
    }
    if (pauseVolumeSlider) {
        pauseVolumeSlider.addEventListener("input", (event) => window.updateVolumeUI(event.target.value));
    }
});