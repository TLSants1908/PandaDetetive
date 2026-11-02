import { REQUIRED_CLUES, CULPRIT, clueTexts, neutralTexts, pandaDialogues, childDialogues, dogDialogues } from './data.js';
import { gameState } from './state.js';
import { showPopup, closePopup, showMessage, createButton } from './ui.js';

function shuffle(array) {
    const result = [...array];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
}

export function prepareCase(searchableObjects) {
    gameState.clueMap.clear();
    gameState.foundClues.clear();
    gameState.gameFinished = false;

    const randomizedObjects = shuffle(searchableObjects);
    const selectedObjects = randomizedObjects.slice(0, REQUIRED_CLUES);
    const randomizedClues = shuffle(clueTexts);

    selectedObjects.forEach((object, index) => {
        gameState.clueMap.set(object, randomizedClues[index]);
    });
    
    closePopup();
}

export function investigateObject(object) {
    if (gameState.gameFinished) return;

    const clueText = gameState.clueMap.get(object);

    if (!clueText) {
        const neutralText = neutralTexts[object.dataset.name] || "Você investigou este objeto, mas não encontrou nenhuma pista.";
        showMessage(object.dataset.name, neutralText);
        return;
    }

    if (gameState.foundClues.has(object)) {
        showMessage("PISTA JÁ ENCONTRADA", clueText);
        return;
    }

    gameState.foundClues.add(object);

    if (gameState.foundClues.size === REQUIRED_CLUES) {
        showPopup({
            title: "ÚLTIMA PISTA ENCONTRADA",
            text: `${clueText} Você encontrou todas as seis pistas. Deseja indicar o culpado agora?`,
            buttons: [
                createButton("SIM, INDICAR", showAccusation, "success-button"),
                createButton("AINDA NÃO", closePopup)
            ]
        });
        return;
    }

    showMessage("PISTA ENCONTRADA", `${clueText} Converse novamente com os personagens para obter novas dicas.`);
}

export function getCharacterDialogue(characterName) {
    const progress = Math.min(gameState.foundClues.size, REQUIRED_CLUES);
    
    if (characterName === "PANDA DETETIVE") return pandaDialogues[progress];
    if (characterName === "CRIANÇA") return childDialogues[progress];
    if (characterName === "CACHORRO") return dogDialogues[progress];
    
    return "Este personagem não tem nada a dizer agora.";
}

export function showJudgmentOffer() {
    if (gameState.foundClues.size < REQUIRED_CLUES) {
        showMessage("INVESTIGAÇÃO INCOMPLETA", "Ainda existem pistas escondidas. Continue investigando os objetos do quarto.");
        return;
    }

    showPopup({
        title: "INVESTIGAÇÃO CONCLUÍDA",
        text: "Todas as pistas foram encontradas. Deseja indicar o culpado?",
        buttons: [
            createButton("SIM", showAccusation, "success-button"),
            createButton("NÃO", closePopup)
        ]
    });
}

function showAccusation() {
    showPopup({
        title: "QUEM ROUBOU OS DOCES?",
        text: "Analise as pistas e escolha quem deve ser acusado.",
        buttons: [
            createButton("CACHORRO", () => judgeAccusation("CACHORRO")),
            createButton("CRIANÇA", () => judgeAccusation("CRIANÇA"))
        ]
    });
}

function judgeAccusation(accused) {
    gameState.gameFinished = true;
    
    if (accused === CULPRIT) {
        showEndScreen(true, "PARABÉNS!", "Você encontrou o ladrão dos doces e recuperou o saco de doces!");
        return;
    }
    showEndScreen(false, "GAME OVER", "Você acusou um inocente. O verdadeiro ladrão escapou com os doces.");
}

function showEndScreen(victory, title, text) {
    showPopup({
        title: title,
        text: `${text} Deseja jogar novamente?`,
        image: victory,
        buttons: [
            createButton("SIM", restartGame, "success-button"),
            createButton("NÃO", closeGame, "danger-button")
        ]
    });
}

// Dependência injetada via escopo do módulo para reiniciar com os mesmos objetos
let cachedObjects = [];

export function setCachedObjects(objects) {
    cachedObjects = objects;
}

function restartGame() {
    prepareCase(cachedObjects);
    showPopup({
        title: "NOVO CASO",
        text: "As seis pistas foram escondidas em novos objetos. Comece uma nova investigação!",
        buttons: [createButton("COMEÇAR", closePopup, "success-button")]
    });
}

function closeGame() {
    window.close();
    setTimeout(() => {
        document.body.innerHTML = `
            <main class="closed-game-message">
                <h1>JOGO ENCERRADO</h1>
                <p>Obrigado por jogar Panda Detetive. Você já pode fechar esta aba.</p>
            </main>
        `;
    }, 150);
}