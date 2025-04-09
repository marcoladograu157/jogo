// Bolinha
let x = 300;
let y = 200;
let diameter = 20;
let radius = diameter / 2;
let speedX = 10;
let speedY = 9;

// Raquete jogador
let paddleX = 10;
let paddleY = 150;
let paddleWidth = 10;
let paddleHeight = 100;
let paddleSpeed = 5;

// Raquete inimigo
let enemyX = 580;
let enemyY = 150;

// Placar
let playerScore = 0;
let enemyScore = 0;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    bolinha();
    raquetes();
    jogador();
    inimigo();
    colisao();
    placar();
    marcarPonto();
//  function inimigoImbativel();
if (playerScore >= 5 || enemyScore >= 5) {
    noLoop(); // Para o jogo
    textSize(40);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    let vencedor = playerScore >= 5 ? "Você venceu! 🏆" : "Inimigo venceu! 😢";
    text(vencedor, width / 2, height / 2);
}

}

function bolinha(){
    fill(255);
    circle(x, y, diameter);
    x += speedX;
    y += speedY;

    if (y + radius > height || y - radius < 0) {
        speedY *= -1;
    }
}

function raquetes(){
    fill(255);
    rect(paddleX, paddleY, paddleWidth, paddleHeight);
    rect(enemyX, enemyY, paddleWidth, paddleHeight);
}

function jogador(){
    if (keyIsDown(UP_ARROW)) {
        paddleY -= paddleSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        paddleY += paddleSpeed;
    }

    paddleY = constrain(paddleY, 0, height - paddleHeight);
}

function inimigo(){
    // Inimigo IA
    let chanceDeErro = map(enemyScore- playerScore,-5,5,35,5);
    chanceDeErro = constrain(chanceDeErro,5,35);
    
    let erro = random(100)<chanceDeErro ? random(-30,30):0;

    let target = y - paddleHeight / 2 + erro;
    enemyY += (target - enemyY)* 0.1 ;
    enemyY = constrain(enemyY, 0, height - paddleHeight);
 
   /*function inimigoImbativel(){
        let target = y - paddleHeight / 2;      
        enemyY += (target - enemyY) * 0.1;      
        enemyY = constrain(enemyY, 0, height - paddleHeight); 
    }*/
    
}

function colisao(){
    if (x - radius < paddleX + paddleWidth &&
        y > paddleY && y < paddleY + paddleHeight) {
        speedX *= -1;
    }

    if (x + radius > enemyX &&
        y > enemyY && y < enemyY + paddleHeight) {
        speedX *= -1;
    }
}

function placar(){
    textSize(32);
    fill(255);
    textAlign(CENTER, TOP);
    text(playerScore, width / 4, 10);
    text(enemyScore, 3 * width / 4, 10);
}

function marcarPonto(){
    if (x < 0) {
        enemyScore++;
        resetBall();
    }
    if (x > width) {
        playerScore++;
        resetBall();
    }
}

function resetBall() {
    x = width / 2;
    y = height / 2;
    speedX *= -1;
    speedY = random(-5, 5);
}
