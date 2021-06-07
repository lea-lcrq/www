//Taille de l'écran
const PONG_SCREEN_WIDTH = 858;
const PONG_SCREEN_HEIGHT = 525;

//Filet
const NET_WIDTH = 2;
const NET_HEIGHT = 9;

//Points
const SCORE_FONT_SIZE = 65;
const LEFT_SCORE_X = 280;
const RIGHT_SCORE_X = 625;
const SCORE_Y = (35 + SCORE_FONT_SIZE);
const VICTORY_SCORE = 22;

var leftScore = 0;
var rightScore= 0;

// Raquettes
const PADDLE_WIDTH = 6;
const PADDLE_HEIGHT = 24;
const LEFT_PADDLE_X = 190;
const RIGHT_PADDLE_X = (PONG_SCREEN_WIDTH - LEFT_PADDLE_X);
const PADDLE_START_Y = 490;
const PADDLE_SPEED = 10;

var leftPaddle;
var rightPAddle;

//Balle (qui est un carré)
const BALL_SIZE = PADDLE_WIDTH;
const BALL_SPEED = 3;

var ball;
var ballSpeed;


 function preload(){
 //pongScoreFont = loadFont('Fonts/pong-score.ttf');
}


function setup(){
//Création initiale du canevas P5*JS
createCanvas(PONG_SCREEN_WIDTH,PONG_SCREEN_HEIGHT);

restartPong();
}

function draw() {
//Calcule le déplacement des raquettes
movePaddles();
//Calcule le déplacement de la balle
moveBall();

//Dessiner le terrain
drawBackground();
//Dessine les scores
drawScoreBoard();
//Dessine les raquettes
drawPaddles();
//Dessine la balle
drawBall();
}

function keyPressed(){
//Réinitialise le jeu
if ("79" == keyCode){
  restartPong();
}
}

//Réinitialisation du jeu lorsqu'un côté a gagné
function restartPong(){
initScoreboard();
initPaddles();
initBall();
}

//Fond et terrain
function drawBackground(){
background(0);


//Spécifier les valeurs pour le dessin
strokeWeight(2);
stroke(255);
strokeCap(SQUARE);

//Tracer les lignes du filet
for (let i=0; i< height; i+=(NET_HEIGHT*2)) {
  line(width/2, i, width/2, i+NET_HEIGHT)
}
}

function initScoreboard(){
leftScore = 0;
rightScore = 0;
}

function updateScoreboard(direction){
if ("left" == direction){
  leftScore +=1;
} else{
  rightScore +=1;
}

if (VICTORY_SCORE == leftScore || VICTORY_SCORE == rightScore){
  drawScoreboard();
  restartPong();
}
}

//Points
function drawScoreBoard(){
//spécifier les valeurs pour le dessin
strokeWeight(0);
stroke(255);

fill('white');
//textFont(pongScoreFont);
textSize(SCORE_FONT_SIZE);

text(leftScore, LEFT_SCORE_X, SCORE_Y);
text(rightScore, RIGHT_SCORE_X, SCORE_Y);
}

//Raquettes
function initPaddles(){
// Création des vecteurs de position pour les raquettes
leftPaddle = createVector();
rightPaddle = createVector();

//Position initiales en X des raquettes
leftPaddle.x = LEFT_PADDLE_X;
rightPaddle.x = RIGHT_PADDLE_X;

//Position initiale en Y des raquettes
leftPaddle.y = rightPaddle.y = PADDLE_START_Y;
}

function movePaddles(){
//Touche Z
if (keyIsDown(90)){
  leftPaddle.y = constrain((leftPaddle.y -= PADDLE_SPEED), 0, (PONG_SCREEN_HEIGHT - PADDLE_HEIGHT));
}

//Touche S
if (keyIsDown(83)){
  leftPaddle.y = constrain((leftPaddle.y += PADDLE_SPEED), 0, PONG_SCREEN_HEIGHT - PADDLE_HEIGHT);
}

//Flèche vers le haut
if (keyIsDown(UP_ARROW)){
  rightPaddle.y = constrain((rightPaddle.y -= PADDLE_SPEED), 0, PONG_SCREEN_HEIGHT - PADDLE_HEIGHT);
}

//Flèche vers le bas
if (keyIsDown(DOWN_ARROW)){
  rightPaddle.y = constrain((rightPaddle.y += PADDLE_SPEED), 0, PONG_SCREEN_HEIGHT - PADDLE_HEIGHT);
}
}

function drawPaddles(){
//Spécifier les valeurs pour le dessin
strokeWeight(0);
stroke(255);

//Tracer les raquettes
rect(leftPaddle.x, leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
rect(rightPaddle.x, rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

//Balle
function initBall(){
//Création des vecteurs de position pour la balle
ball = createVector();
ballSpeed = createVector();

ball.x = PONG_SCREEN_WIDTH/2;
ball.y = PONG_SCREEN_HEIGHT/2;

ballSpeed.x = random(-(BALL_SPEED), (BALL_SPEED));
ballSpeed.y = random(-(BALL_SPEED), (BALL_SPEED));
}

function moveBall(){
//Rebondir sur les bords haut et bas
if ((ball.y + ballSpeed.y) < 0 || (ball.y + ballSpeed.y) > PONG_SCREEN_HEIGHT){
  //Multiplier par -1 c'est inverser le signe
  ballSpeed.y = ballSpeed.y * -1;
}

//Collisions avec les côtés du terrain
if ((ball.x + ballSpeed.x) < 0) {
  //Point pour le joueur droit
  updateScoreboard("right");
  //Réinitialisation de la balle
  initBall();
} else if ((ball.x + ballSpeed.x) > PONG_SCREEN_WIDTH){
  //Point pour le joueur gauche
  updateScoreboard("left");
  //Réinitialisation de la balle
  initBall();
}

//Collision avec la raquette de gauche
if (ball.x > rightPaddle.x && ball.x < (leftPaddle.x + PADDLE_WIDTH)){
  if (ball.y > leftPaddle.y && ball.y < (leftPaddle.y + PADDLE_HEIGHT)){
    ballSpeed.x = ballSpeed.x * -1;
  }
}

//Ajoute le vecteur vitesse (ballSpeed) au vecteur balle (ball)
ball.add(ballSpeed);
}

function drawBall(){
//Spécifier les valeurs pour le dessin
strokeWeight(0);
stroke(255);

//Tracer la balle
rect(ball.x, ball.y, BALL_SIZE);
}