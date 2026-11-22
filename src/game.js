let cachedObjects = [];

function shuffle(array) {
    const result = [...array];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
}

window.prepareCase = function(searchableObjects) {
    if (typeof randomizeCulprit === "function") {
        randomizeCulprit();
    }
    console.log("Culpado desta partida (debug):", CULPRIT);

    window.gameState.clueMap.clear();
    window.gameState.foundClues.clear();
    window.gameState.gameFinished = false;

    const randomizedObjects = shuffle(searchableObjects);
    const selectedObjects = randomizedObjects.slice(0, REQUIRED_CLUES);
    
    // 1. Pegamos as 3 pistas exclusivas do culpado
    const culpritClues = [...cluesBySuspect[CULPRIT]];
    
    // 2. Sorteamos 1 pista para cada um dos 5 inocentes (totalizando 5 pistas)
    let innocentClues = [];
    let remainingInnocentClues = [];
    
    SUSPECTS.forEach(suspect => {
        if (suspect !== CULPRIT) {
            const shuffled = shuffle(cluesBySuspect[suspect]);
            innocentClues.push(shuffled[0]); // Primeira pista embaralhada do inocente
            remainingInnocentClues.push(shuffled[1], shuffled[2]); // Guarda o resto para a confusão
        }
    });
    
    // 3. Pegamos 1 pista extra aleatória de um inocente qualquer para dar dúvida
    const extraClue = shuffle(remainingInnocentClues)[0];
    
    // Junta as 3 pistas do culpado + as 6 pistas inocentes, e embaralha a ordem delas no quarto
    const finalClues = shuffle([...culpritClues, ...innocentClues, extraClue]);

    selectedObjects.forEach((object, index) => {
        window.gameState.clueMap.set(object, finalClues[index]);
    });

    window.closePopup();
};

window.investigateObject = function(object) {
    if (window.gameState.gameFinished) return;

    const clueText = window.gameState.clueMap.get(object);

    if (!clueText) {
        const neutralText = neutralTexts[object.dataset.name] || "Você investigou este objeto, mas não encontrou nenhuma pista.";
        window.showMessage(object.dataset.name, neutralText);
        return;
    }

    if (window.gameState.foundClues.has(object)) {
        window.showMessage("PISTA JÁ ENCONTRADA", clueText);
        return;
    }

    window.gameState.foundClues.add(object);

    if (window.gameState.foundClues.size === REQUIRED_CLUES) {
        window.showPopup({
            title: "ÚLTIMA PISTA ENCONTRADA",
            text: `${clueText} Você encontrou todas as pistas. Deseja indicar o culpado agora?`,
            buttons: [
                window.createButton("SIM, INDICAR", window.showAccusation, "success-button"),
                window.createButton("AINDA NÃO", window.closePopup)
            ]
        });
        return;
    }

    window.showMessage("PISTA ENCONTRADA", `${clueText} Converse novamente com os personagens para obter novas dicas.`);
};

window.getCharacterDialogue = function(characterName) {
    const progress = Math.min(window.gameState.foundClues.size, REQUIRED_CLUES);

    if (characterName === "PANDA DETETIVE") return pandaDialogues[progress];
    if (characterName === "CRIANÇA") return childDialogues[progress];
    if (characterName === "CACHORRO") return dogDialogues[progress];
    if (characterName === "GATA") return catDialogues[progress];
    if (characterName === "GALINHA") return chickenDialogues[progress];
    if (characterName === "TARTARUGA") return turtleDialogues[progress];

    return "Este personagem não tem nada a dizer agora.";
};

window.showJudgmentOffer = function() {
    if (window.gameState.foundClues.size < REQUIRED_CLUES) {
        window.showMessage("INVESTIGAÇÃO INCOMPLETA", "Ainda existem pistas escondidas. Continue investigando os objetos do quarto.");
        return;
    }

    window.showPopup({
        title: "INVESTIGAÇÃO CONCLUÍDA",
        text: "Todas as pistas foram encontradas. Deseja indicar o culpado?",
        buttons: [
            window.createButton("SIM", window.showAccusation, "success-button"),
            window.createButton("NÃO", window.closePopup)
        ]
    });
};

window.showAccusation = function() {
    window.showPopup({
        title: "QUEM ROUBOU OS DOCES?",
        text: "Analise as pistas e escolha quem deve ser acusado.",
        buttons: [
            window.createButton("CACHORRO", () => window.judgeAccusation("CACHORRO")),
            window.createButton("CRIANÇA", () => window.judgeAccusation("CRIANÇA")),
            window.createButton("GATA", () => window.judgeAccusation("GATA")),
            window.createButton("GALINHA", () => window.judgeAccusation("GALINHA")),
            window.createButton("TARTARUGA", () => window.judgeAccusation("TARTARUGA")),
            window.createButton("PANDA", () => window.judgeAccusation("PANDA"))
        ]
    });
};

window.judgeAccusation = function(accused) {
    window.gameState.gameFinished = true;
    
    if (window.pararMusicaJogo) window.pararMusicaJogo();

    if (accused === CULPRIT) {
        if (window.tocarSomVitoria) window.tocarSomVitoria();
        window.showEndScreen(true, "PARABÉNS!", `Você encontrou o verdadeiro culpado (${culpritNameFormated(CULPRIT)}) e recuperou o saco de doces!`);
        return;
    }
    
    if (window.tocarSomDerrota) window.tocarSomDerrota();
    window.showEndScreen(false, "GAME OVER", `Você acusou um inocente. O verdadeiro culpado era ${culpritNameFormated(CULPRIT)} e escapou com os doces.`);
};

function culpritNameFormated(name) {
    if (name === "CACHORRO") return "o Cachorro";
    if (name === "CRIANÇA") return "a Criança";
    if (name === "GATA") return "a Gata";
    if (name === "GALINHA") return "a Galinha";
    if (name === "TARTARUGA") return "a Tartaruga";
    if (name === "PANDA") return "o Panda Detetive";
    return "o Culpado";
}

window.showEndScreen = function(victory, title, text) {
    window.showPopup({
        title: title,
        text: `${text} Deseja jogar novamente?`,
        image: victory,
        buttons: [
            window.createButton("SIM", window.restartGame, "success-button"),
            window.createButton("NÃO", window.closeGame, "danger-button")
        ]
    });
};

window.setCachedObjects = function(objects) {
    cachedObjects = objects;
};

window.restartGame = function() {
    window.prepareCase(cachedObjects);
    window.showPopup({
        title: "NOVO CASO",
        text: "As pistas foram escondidas em novos objetos e um novo culpado foi sorteado. Comece uma nova investigação!",
        buttons: [window.createButton("COMEÇAR", () => {
            window.closePopup();
            if (window.pararSonsFinais) window.pararSonsFinais();
            if (window.iniciarMusicaJogo) window.iniciarMusicaJogo();
        }, "success-button")]
    });
};

window.closeGame = function() {
    window.close();
    setTimeout(() => {
        document.body.innerHTML = `
            <main class="closed-game-message">
                <h1>JOGO ENCERRADO</h1>
                <p>Obrigado por jogar Panda Detetive. Você já pode fechar esta aba.</p>
            </main>
        `;
    }, 150);
};