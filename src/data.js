const REQUIRED_CLUES = 9;
const SUSPECTS = ["CACHORRO", "CRIANÇA", "GATA"];
let CULPRIT = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)];

function randomizeCulprit() {
    CULPRIT = SUSPECTS[Math.floor(Math.random() * SUSPECTS.length)];
}

const clueTexts = [
    // Pistas do Cachorro
    "Você encontrou pegadas que combinam com as patas do cachorro.",
    "Você encontrou pelos do cachorro perto do local onde os doces estavam.",
    "Você encontrou migalhas de doce no caminho percorrido pelo cachorro.",
    
    // Pistas da Criança
    "Você encontrou uma embalagem de doce amassada e escondida.",
    "Você encontrou uma marca de mordida compatível com os dentes da criança.",
    "Você encontrou um pedaço da fita do saco de doces preso em pelos da criança.",

    // Pistas da Gata
    "Você encontrou arranhões suspeitos na caixa onde os doces estavam guardados.",
    "Você encontrou tufos de pelos de gato grudados no embrulho rasgado.",
    "You encontrou pegadas sutis de patinhas felinas em cima da escrivaninha."
];

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
    "PUFF": "You verificou o puff. Nada suspeito foi encontrado.",
    "LUMINÁRIA": "A luminária não tem relação com o desaparecimento dos doces.",
    "ABAJUR DE CHÃO": "O abajur não apresenta nenhuma pista.",
    "PRATELEIRA 1": "Você verificou a primeira prateleira. Nada foi encontrado.",
    "PRATELEIRA 2": "Você verificou a segunda prateleira. Nada foi encontrado."
};

const pandaDialogues = [
    "Precisamos investigar o quarto. Examine os objetos e procure evidências.",
    "Boa descoberta. Ainda precisamos encontrar outras pistas antes de acusar alguém.",
    "As evidências estão formando um caminho. Continue observando os objetos do quarto.",
    "Algumas pistas parecem estar relacionadas a diferentes suspeitos que circularam por aqui.",
    "Pelos, arranhões ou pegadas miúdas podem revelar quem passou perto dos doces.",
    "Estamos perto da verdade. Compare as pistas encontradas com os personagens.",
    "Continue investigando até juntar todas as evidências necessárias.",
    "Quase tudo revelado. Analise bem os rastros deixados no quarto.",
    "Todas as pistas foram encontradas. Agora podemos indicar o culpado."
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