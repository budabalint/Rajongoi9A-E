
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1200 ;
canvas.height = 500 ;
canvas.id = "gameCanvas";
canvas.style.display = 'block';
canvas.style.margin = '20px auto';
canvas.style.border = '2px solid black';
canvas.style.backgroundColor = '#f0f0f0';
document.body.appendChild(canvas);


const characterImg = new Image();
characterImg.src = 'character.png'; 
characterImg.onerror = () => {
    characterImg.src = 'default_character.png';
};

const cactusImgs = [
    'cactus1.png',
    'cactus2.png',
    'cactus3.png' 
].map(src => {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
        img.src = 'default_cactus.png';
    };
    return img;
});

let character = {
    x: 100,
    y: 300,
    width: 50,
    height: 50,
    dy: 0,
    gravity: 0.4,
    jumpStrength: -10,
    isJumping: false,
    jumpStartTime: 0
};

let obstacles = [];
let score = 0;
let gameSpeed = 5;
let gameRunning = true;
const GROUND_HEIGHT = 350;
const MIN_OBSTACLE_GAP = 100;
const MAX_OBSTACLE_GAP = 1000; 
const MAX_JUMP_DURATION = 100;
const MIN_JUMP_FORCE = 5;


function randomCactus() {
    const type = Math.floor(Math.random() * cactusImgs.length);
    const gap = Math.random() * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP) + MIN_OBSTACLE_GAP;
    return {
        x: canvas.width + gap,
        y: GROUND_HEIGHT - 50,
        width: 50,
        height: 50,
        img: cactusImgs[type]
    };
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function resetGame() {
    character = {
        x: 100,
        y: 300,
        width: 50,
        height: 50,
        dy: 0,
        gravity: 0.4,
        jumpStrength: -10,
        isJumping: false,
        jumpStartTime: 0
    };
    obstacles = [];
    score = 0;
    gameSpeed = 5 ;
    gameRunning = true;
    gameLoop();
}

function update() {
    if (!gameRunning) return;

    character.y += character.dy;
    character.dy += character.gravity;

    if (character.y >= GROUND_HEIGHT - character.height) {
        character.y = GROUND_HEIGHT - character.height;
        character.isJumping = false;
    }

    obstacles.forEach(obstacle => {
        obstacle.x -= gameSpeed;
    });

    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    if (obstacles.length === 0 || (canvas.width - obstacles[obstacles.length - 1].x) >= MIN_OBSTACLE_GAP) {
        const newCactus = randomCactus();
        obstacles.push(newCactus);
    }

    obstacles.forEach(obstacle => {
        if (checkCollision(character, obstacle)) {
            gameRunning = false;
        }
    });

    score++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_HEIGHT);
    ctx.lineTo(canvas.width, GROUND_HEIGHT);
    ctx.stroke();

    ctx.drawImage(characterImg, character.x, character.y, character.width, character.height);

    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    ctx.fillStyle = '#cc66cc';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);
}

function gameLoop() {
    update();
    draw();
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '32px Arial';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
    }
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (!gameRunning) {
            resetGame();
        } else if (!character.isJumping) {
            character.dy = character.jumpStrength;
            character.isJumping = true;
            character.jumpStartTime = Date.now();
        } 
    }
});



characterImg.onload = () => {
    gameLoop();
};
