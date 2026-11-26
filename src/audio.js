const menuMusic = new Audio('src/audio/menu-music.mp3');
menuMusic.loop = true;

const gameMusic = new Audio('src/audio/game-music.wav');
gameMusic.loop = true;

const winSound = new Audio('src/audio/win-audio.mp3');
const loseSound = new Audio('src/audio/lose-audio.mp3');

// Mapeamento dos sons de hover para cada objeto
const sfxMap = {
    "ARMÁRIO": new Audio('src/audio/toy-audio.mp3'),
    "CORTINA ESQUERDA": new Audio('src/audio/curtain-audio.mp3'),
    "CORTINA DIREITA": new Audio('src/audio/curtain-audio.mp3'),
    "AVIÃO DE BRINQUEDO": new Audio('src/audio/toy-audio.mp3'),
    "CABECEIRA DA CAMA": new Audio('src/audio/toy-audio.mp3'),
    "CAMA": new Audio('src/audio/cloth.mp3'),
    "TAPETE": new Audio('src/audio/cloth.mp3'),
    "ESCRIVANINHA": new Audio('src/audio/drawer-audio.mp3'),
    "MALA": new Audio('src/audio/bag-audio.mp3'),
    "PUFF": new Audio('src/audio/cloth.mp3'),
    "LUMINÁRIA": new Audio('src/audio/toy-audio.mp3'),
    "ABAJUR DE CHÃO": new Audio('src/audio/toy-audio.mp3'),
    "PRATELEIRA 1": new Audio('src/audio/drawer-audio.mp3'),
    "PRATELEIRA 2": new Audio('src/audio/drawer-audio.mp3')
};

window.iniciarMusicaMenu = function() {
    menuMusic.play().catch(() => {
        console.log("Áudio bloqueado pelo navegador. Aguardando interação do jogador...");
    });
};

window.pararMusicaMenu = function() {
    menuMusic.pause();
    menuMusic.currentTime = 0; 
};

window.iniciarMusicaJogo = function() {
    gameMusic.play().catch(e => console.log("Áudio do jogo bloqueado pelo navegador:", e));
};

window.pararMusicaJogo = function() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
};

window.tocarSomVitoria = function() {
    winSound.currentTime = 0;
    winSound.play().catch(e => console.log("Áudio bloqueado:", e));
};

window.tocarSomDerrota = function() {
    loseSound.currentTime = 0;
    loseSound.play().catch(e => console.log("Áudio bloqueado:", e));
};

window.pararSonsFinais = function() {
    winSound.pause();
    winSound.currentTime = 0;
    loseSound.pause();
    loseSound.currentTime = 0;
};

// Nova função para tocar o som de cada objeto
window.tocarSomObjeto = function(nomeObjeto) {
    const som = sfxMap[nomeObjeto];
    if (som) {
        som.currentTime = 0; // Reinicia o som para tocar desde o início se passar rápido
        som.play().catch(() => {});
    }
};

window.atualizarVolumeAudio = function(vol) {
    // Volume base para as músicas
    menuMusic.volume = vol;
    gameMusic.volume = vol;
    winSound.volume = vol;
    loseSound.volume = vol;

    // Volume dos efeitos sonoros (50% mais alto que a música, limitado a 1.0)
    const sfxVol = Math.min(vol * 1.5, 1.0);
    Object.values(sfxMap).forEach(som => {
        som.volume = sfxVol;
    });
};

// Configura os volumes iniciais
window.atualizarVolumeAudio(window.gameState.volume);
window.iniciarMusicaMenu();

document.addEventListener("click", () => {
    if (menuMusic.paused && !window.gameState.gameStarted) {
        window.iniciarMusicaMenu();
    }
}, { once: true });