const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('.restart-button');
const gameBoard = document.querySelector('.game-board');
let loop;
let gameOver = false;

const jump = () => {
    if (gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const startGameLoop = () => {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && marioPosition < 80 && pipePosition > 0) {
            gameOver = true;
            clearInterval(loop);

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'imagens/game-over.png';
            mario.style.width = '180px';
            mario.style.marginLeft = '50px';
            gameBoard.classList.add('game-over');
            restartButton.hidden = false;
        }
    }, 10);
};

const restartGame = () => {
    clearInterval(loop);
    gameOver = false;

    mario.src = 'imagens/mario.gif';
    mario.classList.remove('jump');
    mario.removeAttribute('style');
    pipe.removeAttribute('style');
    gameBoard.classList.remove('game-over');
    restartButton.hidden = true;

    startGameLoop();
};

document.addEventListener('keydown', jump);
restartButton.addEventListener('click', restartGame);
startGameLoop();
