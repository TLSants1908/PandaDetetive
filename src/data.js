const REQUIRED_CLUES = 9;
const SUSPECTS = ["CACHORRO", "CRIANÇA", "GATA", "GALINHA", "TARTARUGA", "PANDA"];
let CULPRIT = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)];

function randomizeCulprit() {
    CULPRIT = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)];
}

// NOVA LÓGICA: Pistas agora estão agrupadas por suspeito para facilitar o sorteio lógico
const cluesBySuspect = {
    "CACHORRO": [
        "Você encontrou pegadas que combinam com as patas do cachorro.",
        "Você encontrou pelos do cachorro perto do local onde os doces estavam.",
        "Você encontrou migalhas de doce no caminho percorrido pelo cachorro."
    ],
    "CRIANÇA": [
        "Você encontrou uma embalagem de doce amassada e escondida.",
        "Você encontrou uma marca de mordida compatível com os dentes da criança.",
        "Você encontrou um pedaço da fita do saco de doces preso em pelos da criança."
    ],
    "GATA": [
        "Você encontrou arranhões suspeitos na caixa onde os doces estavam guardados.",
        "Você encontrou tufos de pelos de gato grudados no embrulho rasgado.",
        "Você encontrou pegadas sutis de patinhas felinas em cima da escrivaninha."
    ],
    "GALINHA": [
        "Você encontrou penas brancas espalhadas perto do armário.",
        "Você notou marcas de bico no plástico que envolvia os doces.",
        "Você achou pequenas pegadas de três dedos com formato de garra."
    ],
    "TARTARUGA": [
        "Você encontrou um rastro de umidade de alguém que rastejou pelo chão.",
        "Você notou um pedaço de alface caído próximo ao local do sumiço.",
        "Você achou marcas de garras lentas, pesadas e arredondadas no tapete."
    ],
    "PANDA": [
        "Você encontrou tufos de pelos pretos e brancos caídos no chão.",
        "Você notou pedaços de bambu mascado perto de onde os doces estavam.",
        "Você achou uma pegada grande e pesada que se parece com a de um urso."
    ]
};

const neutralTexts = {
    "ARMÁRIO": "Você examinou o armário, mas não encontrou nenhuma pista.",
    "CORTINA ESQUERDA": "Você investigou a cortina esquerda. Nada parece suspeito.",
    "CORTINA DIREITA": "Você investigou a cortina direita. Nenhuma pista foi encontrada.",
    "AVIÃO DE BRINQUEDO": "É apenas um avião de brinquedo. Não há pistas aqui.",
    "CABECEIRA DA CAMA": "A cabeceira está normal. Nenhuma pista foi encontrada.",
    "CAMA": "Você examinou a cama, mas não encontrou nada relacionado ao caso.",
    "TAPETE": "Você observou o tapete com cuidado. Nenhuma pista foi encontrada aqui.",
    "ESCRIVANINHA": "A escrivaninha não contém nenhuma pista nesta partida.",
    "MALA": "Você examinou a mala, mas não encontrou evidências.",
    "PUFF": "Você verificou o puff. Nada suspeito foi encontrado.",
    "LUMINÁRIA": "A luminária não tem relação com o desaparecimento dos doces.",
    "ABAJUR DE CHÃO": "O abajur não apresenta nenhuma pista.",
    "PRATELEIRA 1": "Você verificou a primeira prateleira. Nada foi encontrado.",
    "PRATELEIRA 2": "Você verificou a segunda prateleira. Nada foi encontrado."
};

const pandaDialogues = [
    "Precisamos investigar o quarto. E não me olhe com essa cara, sou o detetive, não um suspeito!",
    "Boa descoberta. Pelos pretos e brancos podem ser de qualquer um... quer dizer, continue procurando.",
    "As evidências estão formando um caminho. Observe todos os objetos do quarto.",
    "Algumas pistas parecem apontar para mim, mas eu garanto que estava comendo apenas bambu!",
    "Pelos, arranhões ou pegadas podem revelar quem passou perto dos doces.",
    "Estamos perto da verdade. O culpado será aquele com o maior número de pistas deixadas.",
    "Continue investigando. Como detetive, exijo que todas as provas sejam achadas.",
    "Quase tudo revelado. Analise bem os rastros, por favor, seja justo na sua avaliação!",
    "Todas as pistas foram encontradas. Faça sua acusação (e espero de verdade que não seja eu)."
];

const childDialogues = [
    "Meus doces desapareceram durante a festa. Eu os deixei guardados no quarto.",
    "Talvez quem pegou os doces tenha deixado algum rastro pelo quarto.",
    "Eu ouvi passos e objetos se mexendo, mas não consegui ver quem estava andando.",
    "Lembro que tanto os animais quanto eu circulamos perto de onde estavam os doces.",
    "Procure sinais como pelos, arranhões, pegadas ou embalagens escondidas.",
    "As pistas parecem apontar para direções diferentes...",
    "Continue procurando por todo o quarto.",
    "Estou curiosa para saber quem levou meus doces.",
    "Agora que todas as pistas apareceram, converse com o Panda para fazer a acusação."
];

const dogDialogues = [
    "Eu não sei o que aconteceu com os doces. Estive andando pelo quarto, mas não peguei nada.",
    "Pegadas? Muitos personagens passaram por aqui durante a festa.",
    "Pelos podem cair em qualquer lugar. Isso não prova nada.",
    "Migalhas perto do meu caminho? Talvez alguém tenha deixado aquilo ali.",
    "Uma embalagem escondida não significa que fui eu.",
    "Pergunte também para a gata o que ela estava fazendo.",
    "Essas pistas ainda podem ter outra explicação.",
    "Você já olhou nos lugares mais altos do quarto?",
    "Você encontrou tudo? Pense bem antes de acusar alguém."
];

const catDialogues = [
    "Miau... Eu só estava tirando um cochilo sossegada no meu canto.",
    "Arranhões na caixa? Minhas garras crescem, é perfeitamente normal.",
    "Eu circulo por cima dos móveis, mas não me importo com doces de humanos.",
    "Pelos meus espalhados por aí? Eu me limpo o tempo todo.",
    "Achei estranho toda essa movimentação no quarto hoje.",
    "Não olhe para mim com essa cara de desconfiança.",
    "Certamente o culpado é quem tem hábitos menos elegantes que os meus.",
    "Você está quase juntando todas as evidências...",
    "Termine de investigar o quarto antes de apontar o dedo para mim."
];

const chickenDialogues = [
    "Có có! Eu estava ciscando lá fora, juro que não vi doces.",
    "Penas? Muitas aves perdem penas por aí, isso é natural! Có có.",
    "Alguém bicou o embrulho? Talvez um pássaro que voou pela janela.",
    "Eu durmo cedo, não estava acordada quando os doces sumiram.",
    "Não tente colocar a culpa em mim só porque sou uma ave curiosa.",
    "Có có! Se eu fosse roubar algo, seria milho, não doces.",
    "Acho que a tartaruga estava rondando por aqui também...",
    "Quase todas as pistas foram achadas. Estou nervosa! Có có.",
    "Termine logo isso! Quero voltar pro meu ninho em paz."
];

const turtleDialogues = [
    "Eu... ando... muito... devagar... Não conseguiria fugir com os doces.",
    "Rastro... de... umidade? Deve ser só água do vaso de plantas.",
    "Alface? Alguém deve ter deixado cair do sanduíche.",
    "Estou aqui na mesma posição desde que a festa começou...",
    "Não me olhe assim. Sou pacífica e vegetariana.",
    "As garras que vocês acharam devem ser de outra pessoa.",
    "O... Panda... também... gosta de comer bastante, não acha?",
    "Muitas... pistas... A verdade... vai... aparecer.",
    "Estou... pronta... para ouvir a sua acusação."
];