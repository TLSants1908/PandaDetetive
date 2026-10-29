/* =========================================================
   RNG 01 - O CACHORRO É O CULPADO
========================================================= */

const REQUIRED_CLUES = 6;

const CULPRIT = "CACHORRO";


/* =========================================================
   PISTAS
========================================================= */

const clueTexts = [

    "Você encontrou pegadas que combinam com as patas do cachorro.",

    "Você encontrou pelos do cachorro perto do local onde os doces estavam.",

    "Você encontrou migalhas de doce no caminho percorrido pelo cachorro.",

    "Você encontrou uma embalagem de doce amassada e escondida.",

    "Você encontrou uma marca de mordida compatível com os dentes do cachorro.",

    "Você encontrou um pedaço da fita do saco de doces preso em pelos do cachorro."

];


/* =========================================================
   OBJETOS SEM PISTAS
========================================================= */

const neutralTexts = {

    "ARMÁRIO":
        "Você examinou o armário, mas não encontrou nenhuma pista.",

    "CORTINA ESQUERDA":
        "Você investigou a cortina esquerda. Nada parece suspeito.",

    "CORTINA DIREITA":
        "Você investigou a cortina direita. Nenhuma pista foi encontrada.",

    "AVIÃO DE BRINQUEDO":
        "É apenas um avião de brinquedo. Não há pistas aqui.",

    "CABECEIRA DA CAMA":
        "A cabeceira está normal. Nenhuma pista foi encontrada.",

    "CAMA":
        "Você examinou a cama, mas não encontrou nada relacionado ao caso.",

    "TAPETE":
        "Você observou o tapete com cuidado. Nenhuma pista foi encontrada aqui.",

    "ESCRIVANINHA":
        "A escrivaninha não contém nenhuma pista nesta partida.",

    "MALA":
        "Você examinou a mala, mas não encontrou evidências.",

    "PUFF":
        "Você verificou o puff. Nada suspeito foi encontrado.",

    "LUMINÁRIA":
        "A luminária não tem relação com o desaparecimento dos doces.",

    "ABAJUR DE CHÃO":
        "O abajur não apresenta nenhuma pista.",

    "PRATELEIRA 1":
        "Você verificou a primeira prateleira. Nada foi encontrado.",

    "PRATELEIRA 2":
        "Você verificou a segunda prateleira. Nada foi encontrado."

};


/* =========================================================
   DIÁLOGOS PROGRESSIVOS DO PANDA
========================================================= */

const pandaDialogues = [

    "Precisamos investigar o quarto. Examine os objetos e procure evidências.",

    "Boa descoberta. Ainda precisamos encontrar outras pistas antes de acusar alguém.",

    "As evidências estão formando um caminho. Continue observando os objetos do quarto.",

    "Algumas pistas parecem estar relacionadas a um animal que circulou pelo quarto.",

    "Pegadas, pelos ou marcas de mordida podem revelar quem passou perto dos doces.",

    "Estamos perto da verdade. Compare as pistas encontradas com os personagens.",

    "Todas as pistas foram encontradas. Agora podemos indicar o culpado."

];


/* =========================================================
   DIÁLOGOS PROGRESSIVOS DA CRIANÇA
========================================================= */

const childDialogues = [

    "Meus doces desapareceram durante a festa. Eu os deixei guardados no quarto.",

    "Talvez quem pegou os doces tenha deixado algum rastro pelo quarto.",

    "Eu ouvi passos e objetos se mexendo, mas não consegui ver quem estava andando.",

    "Lembro que um dos animais circulou bastante perto do lugar onde estavam os doces.",

    "Procure sinais como pelos, pegadas, migalhas ou embalagens escondidas.",

    "As pistas parecem apontar para alguém que esteve andando e comendo pelo quarto.",

    "Agora que todas as pistas apareceram, converse com o Panda para fazer a acusação."

];


/* =========================================================
   DIÁLOGOS PROGRESSIVOS DO CACHORRO
========================================================= */

const dogDialogues = [

    "Eu não sei o que aconteceu com os doces. Estive andando pelo quarto, mas não peguei nada.",

    "Pegadas? Muitos personagens passaram por aqui durante a festa.",

    "Pelos podem cair em qualquer lugar. Isso não prova nada.",

    "Migalhas perto do meu caminho? Talvez alguém tenha deixado aquilo ali.",

    "Uma embalagem escondida não significa que fui eu.",

    "Essas pistas ainda podem ter outra explicação.",

    "Você encontrou tudo? Pense bem antes de acusar alguém."

];


/* =========================================================
   ESTADO DO JOGO
========================================================= */

const gameState = {

    clueMap:
        new Map(),

    foundClues:
        new Set(),

    gameFinished:
        false

};


/* =========================================================
   ELEMENTOS DO CENÁRIO
========================================================= */

const hotspots =
    Array.from(
        document.querySelectorAll(
            ".hotspot"
        )
    );

const airplaneHitbox =
    document.getElementById(
        "airplane-hitbox"
    );

const airplaneOutline =
    document.getElementById(
        "airplane-outline"
    );


/*
 * Somente objetos entram na lista de investigação.
 * Os personagens não entram nesta lista.
 */

const searchableObjects = [

    ...hotspots.filter(
        (hotspot) =>
            hotspot.id !==
            "airplane-outline"
    ),

    airplaneHitbox

].filter(Boolean);


/* =========================================================
   PERSONAGENS
========================================================= */

const characters =
    document.querySelectorAll(
        ".character"
    );


/* =========================================================
   ELEMENTOS DO POPUP
========================================================= */

const popup =
    document.getElementById(
        "popup"
    );

const popupTitle =
    document.getElementById(
        "popup-title"
    );

const popupText =
    document.getElementById(
        "popup-text"
    );

const popupImage =
    document.getElementById(
        "popup-image"
    );

const popupActions =
    document.getElementById(
        "popup-actions"
    );


/* =========================================================
   CRIAR BOTÃO
========================================================= */

function createButton(
    label,
    action,
    className = ""
) {

    const button =
        document.createElement(
            "button"
        );

    button.type =
        "button";

    button.textContent =
        label;

    button.className =
        className;

    button.addEventListener(
        "click",
        action
    );

    return button;

}


/* =========================================================
   MOSTRAR POPUP
========================================================= */

function showPopup({
    title,
    text,
    image = false,
    buttons = []
}) {

    popupTitle.textContent =
        title;

    popupText.textContent =
        text;

    popupImage.classList.toggle(
        "hidden",
        !image
    );

    popupActions.replaceChildren(
        ...buttons
    );

    popup.classList.remove(
        "hidden"
    );


    const firstButton =
        popupActions.querySelector(
            "button"
        );


    if (
        firstButton
    ) {

        firstButton.focus();

    }

}


/* =========================================================
   FECHAR POPUP
========================================================= */

function closePopup() {

    if (
        gameState.gameFinished
    ) {

        return;

    }

    popup.classList.add(
        "hidden"
    );

}


/* =========================================================
   MOSTRAR MENSAGEM SIMPLES
========================================================= */

function showMessage(
    title,
    text
) {

    showPopup({

        title:
            title,

        text:
            text,

        buttons: [

            createButton(
                "FECHAR",
                closePopup
            )

        ]

    });

}


/* =========================================================
   EMBARALHAR LISTA
========================================================= */

function shuffle(
    array
) {

    const result =
        [...array];


    for (
        let index = result.length - 1;
        index > 0;
        index -= 1
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                (index + 1)
            );


        [
            result[index],
            result[randomIndex]
        ] = [
            result[randomIndex],
            result[index]
        ];

    }


    return result;

}


/* =========================================================
   PREPARAR NOVA PARTIDA
========================================================= */

function prepareCase() {

    gameState.clueMap.clear();

    gameState.foundClues.clear();

    gameState.gameFinished =
        false;


    /*
     * Embaralha apenas objetos.
     * Os personagens nunca recebem pistas.
     */

    const randomizedObjects =
        shuffle(
            searchableObjects
        );


    /*
     * Seleciona seis objetos aleatórios.
     */

    const selectedObjects =
        randomizedObjects.slice(
            0,
            REQUIRED_CLUES
        );


    /*
     * Embaralha as seis pistas.
     */

    const randomizedClues =
        shuffle(
            clueTexts
        );


    /*
     * Relaciona uma pista a cada objeto selecionado.
     */

    selectedObjects.forEach(
        (
            object,
            index
        ) => {

            gameState.clueMap.set(
                object,
                randomizedClues[index]
            );

        }
    );


    popup.classList.add(
        "hidden"
    );

}


/* =========================================================
   INVESTIGAR OBJETO
========================================================= */

function investigateObject(
    object
) {

    if (
        gameState.gameFinished
    ) {

        return;

    }


    const clueText =
        gameState.clueMap.get(
            object
        );


    /*
     * Objeto sem pista.
     * Mesmo sem pista, sempre abre um popup.
     */

    if (
        !clueText
    ) {

        const neutralText =

            neutralTexts[
                object.dataset.name
            ] ||

            "Você investigou este objeto, mas não encontrou nenhuma pista.";


        showMessage(
            object.dataset.name,
            neutralText
        );


        return;

    }


    /*
     * Pista já encontrada.
     */

    if (
        gameState.foundClues.has(
            object
        )
    ) {

        showMessage(

            "PISTA JÁ ENCONTRADA",

            clueText

        );


        return;

    }


    /*
     * Registra a nova pista.
     */

    gameState.foundClues.add(
        object
    );


    const totalFound =
        gameState.foundClues.size;


    /*
     * Sexta e última pista.
     */

    if (
        totalFound ===
        REQUIRED_CLUES
    ) {

        showPopup({

            title:
                "ÚLTIMA PISTA ENCONTRADA",

            text:
                `${clueText} Você encontrou todas as seis pistas. Deseja indicar o culpado agora?`,

            buttons: [

                createButton(
                    "SIM, INDICAR",
                    showAccusation,
                    "success-button"
                ),

                createButton(
                    "AINDA NÃO",
                    closePopup
                )

            ]

        });


        return;

    }


    /*
     * Pista encontrada.
     * O total não é exibido para o jogador.
     */

    showMessage(

        "PISTA ENCONTRADA",

        `${clueText} Converse novamente com os personagens para obter novas dicas.`

    );

}


/* =========================================================
   OBTER DIÁLOGO ATUAL DO PERSONAGEM
========================================================= */

function getCharacterDialogue(
    characterName
) {

    const progress =
        Math.min(
            gameState.foundClues.size,
            REQUIRED_CLUES
        );


    if (
        characterName ===
        "PANDA DETETIVE"
    ) {

        return pandaDialogues[
            progress
        ];

    }


    if (
        characterName ===
        "CRIANÇA"
    ) {

        return childDialogues[
            progress
        ];

    }


    if (
        characterName ===
        "CACHORRO"
    ) {

        return dogDialogues[
            progress
        ];

    }


    return (
        "Este personagem não tem nada a dizer agora."
    );

}


/* =========================================================
   OFERECER JULGAMENTO
========================================================= */

function showJudgmentOffer() {

    if (
        gameState.foundClues.size <
        REQUIRED_CLUES
    ) {

        showMessage(

            "INVESTIGAÇÃO INCOMPLETA",

            "Ainda existem pistas escondidas. Continue investigando os objetos do quarto."

        );


        return;

    }


    showPopup({

        title:
            "INVESTIGAÇÃO CONCLUÍDA",

        text:
            "Todas as pistas foram encontradas. Deseja indicar o culpado?",

        buttons: [

            createButton(
                "SIM",
                showAccusation,
                "success-button"
            ),

            createButton(
                "NÃO",
                closePopup
            )

        ]

    });

}


/* =========================================================
   ACUSAÇÃO
========================================================= */

function showAccusation() {

    showPopup({

        title:
            "QUEM ROUBOU OS DOCES?",

        text:
            "Analise as pistas e escolha quem deve ser acusado.",

        buttons: [

            createButton(

                "CACHORRO",

                () =>
                    judgeAccusation(
                        "CACHORRO"
                    )

            ),

            createButton(

                "CRIANÇA",

                () =>
                    judgeAccusation(
                        "CRIANÇA"
                    )

            )

        ]

    });

}


/* =========================================================
   VERIFICAR ACUSAÇÃO
========================================================= */

function judgeAccusation(
    accused
) {

    gameState.gameFinished =
        true;


    if (
        accused ===
        CULPRIT
    ) {

        showEndScreen(

            true,

            "PARABÉNS!",

            "Você encontrou o ladrão dos doces e recuperou o saco de doces!"

        );


        return;

    }


    showEndScreen(

        false,

        "GAME OVER",

        "Você acusou um inocente. O verdadeiro ladrão escapou com os doces."

    );

}


/* =========================================================
   TELA FINAL
========================================================= */

function showEndScreen(
    victory,
    title,
    text
) {

    showPopup({

        title:
            title,

        text:
            `${text} Deseja jogar novamente?`,

        /*
         * O saco de doces aparece somente na vitória.
         */

        image:
            victory,

        buttons: [

            createButton(
                "SIM",
                restartGame,
                "success-button"
            ),

            createButton(
                "NÃO",
                closeGame,
                "danger-button"
            )

        ]

    });

}


/* =========================================================
   REINICIAR PARTIDA
========================================================= */

function restartGame() {

    prepareCase();


    showPopup({

        title:
            "NOVO CASO",

        text:
            "As seis pistas foram escondidas em novos objetos. Comece uma nova investigação!",

        buttons: [

            createButton(
                "COMEÇAR",
                closePopup,
                "success-button"
            )

        ]

    });

}


/* =========================================================
   ENCERRAR JOGO
========================================================= */

function closeGame() {

    window.close();


    /*
     * Alguns navegadores impedem o fechamento automático.
     */

    setTimeout(
        () => {

            document.body.innerHTML = `

                <main class="closed-game-message">

                    <h1>
                        JOGO ENCERRADO
                    </h1>

                    <p>
                        Obrigado por jogar Panda Detetive.
                        Você já pode fechar esta aba.
                    </p>

                </main>

            `;

        },
        150
    );

}


/* =========================================================
   EVENTOS DOS OBJETOS
========================================================= */

searchableObjects.forEach(
    (object) => {

        object.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                investigateObject(
                    object
                );

            }
        );

    }
);


/* =========================================================
   CONTORNO ESPECIAL DO AVIÃO
========================================================= */

if (
    airplaneHitbox &&
    airplaneOutline
) {

    airplaneHitbox.addEventListener(
        "mouseenter",
        () => {

            airplaneOutline.classList.add(
                "airplane-active"
            );

        }
    );


    airplaneHitbox.addEventListener(
        "mouseleave",
        () => {

            airplaneOutline.classList.remove(
                "airplane-active"
            );

        }
    );

}


/* =========================================================
   EVENTOS DOS PERSONAGENS
========================================================= */

characters.forEach(
    (character) => {

        character.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                /*
                 * Os personagens nunca possuem pistas.
                 * Eles apenas apresentam diálogos progressivos.
                 */

                if (
                    character.dataset.name ===
                        "PANDA DETETIVE" &&

                    gameState.foundClues.size ===
                        REQUIRED_CLUES
                ) {

                    showJudgmentOffer();

                    return;

                }


                showMessage(

                    character.dataset.name,

                    getCharacterDialogue(
                        character.dataset.name
                    )

                );

            }
        );

    }
);


/* =========================================================
   FECHAR CLICANDO FORA DO POPUP
========================================================= */

popup.addEventListener(
    "click",
    (event) => {

        if (
            event.target === popup &&
            !gameState.gameFinished
        ) {

            closePopup();

        }

    }
);


/* =========================================================
   FECHAR COM ESC
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            !gameState.gameFinished
        ) {

            closePopup();

        }

    }
);


/* =========================================================
   INÍCIO DO JOGO
========================================================= */

prepareCase();


showPopup({

    title:
        "CASO: O ROUBO DOS DOCES",

    text:
        "Investigue os objetos do quarto e encontre seis pistas. Os personagens não escondem pistas, mas os diálogos mudam conforme novas evidências são descobertas.",

    buttons: [

        createButton(
            "COMEÇAR",
            closePopup,
            "success-button"
        )

    ]

});