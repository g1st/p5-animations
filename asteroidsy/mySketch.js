// https://www.colourlovers.com/palette/440186/July
const palette = {
  name: 'July',
  colors: ['#F2A73D', '#A0E8B7', '#EB0A44', '#F2643D'],
  background: '#26251C',
};
let score = 0;
let highScore = 0;
let scaling = 1;
let cameraPos;
let radarDiameter;
let spaceShip;
let shipImage;
let meteor1;
let meteor2;
let meteor3;
let meteor4;
let shotSound;
let asteroidDestroySound;
let sound = true;
let gameOver = true;

function preload() {
  // images
  shipImage = loadImage('assets/playerShip1_red.png');
  meteor1 = loadImage('assets/meteorBrown_big1.png');
  meteor2 = loadImage('assets/meteorBrown_big2.png');
  meteor3 = loadImage('assets/meteorBrown_big3.png');
  meteor4 = loadImage('assets/meteorBrown_big4.png');

  // sounds
  shotSound = loadSound('assets/sounds/shot.wav');
  asteroidDestroySound = loadSound('assets/sounds/explosion.ogg');
  asteroidImpactSound = loadSound('assets/sounds/impact.ogg');
}

function setup() {
  p5.disableFriendlyErrors = true;
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  background(palette.background);
  shotSound.setVolume(0.01);
  asteroidDestroySound.setVolume(0.02);
  asteroidImpactSound.setVolume(0.04);

  cameraPos = createVector(0, 0);
  radarDiameter = Math.min(width, height);
}

function draw() {
  background(palette.background);
  if (gameOver) {
    gameScreen();
  } else {
    scale(scaling);
    displayInfo();
    spaceShip.showSpeed();
    translate(-cameraPos.x + width / 2, -cameraPos.y + height / 2);

    spaceShip.drawShip();
    spaceShip.moveShip();
    spaceShip.drawShots();
    spaceShip.moveShots();
    spaceShip.cameraTowards();

    asteroids.draw();
    asteroids.move();
  }
}

function gameStartScreen() {
  fill('white');
  noStroke();
  fill('red');
  textSize(width / 20);
  text('ASTEROIDSY', width * 0.3, height * 0.15);
  fill('white');
  textSize(width / 40);
  let info = `
ENTER - start,
UP ARROW - thrust,
LEFT/RIGHT ARROW - rotate,
SPACE BAR - shoot,
M - toggle sound
`;
  if (spaceShip) {
    info = `Your score: ${score}
Your highscore: ${highScore}
  ${info}`;
  }

  text(info, width * 0.3, height * 0.35);

  fill(100, 100, 200, 50);
  stroke(100, 100, 100, 50);
  strokeWeight(10);
  rect(width / 2, height * 0.55, width * 0.5, height * 0.6);
}
function gameScreen() {
  if (spaceShip) {
    highScore = highScore > score ? highScore : score;
  }
  gameStartScreen();
}

function displayInfo() {
  // fps and sound
  fill('white');
  noStroke();
  textSize(12);
  text(
    `FPS: ${int(frameRate())}
SOUND: ${sound ? 'ON' : 'OFF'}`,
    25,
    25
  );
  text(
    `SCORE: ${score}
LIVES: ${spaceShip.lives}`,
    width - 100,
    25
  );
  text(`Position: ${int(cameraPos.x)}, ${int(cameraPos.y)}`, 50, height - 50);
}

function mouseWheel(event) {
  scaling -= event.delta / 1000;
  if (scaling > 2) {
    scaling = 2;
  }
  if (scaling < 0.1) {
    scaling = 0.1;
  }
}

function keyPressed() {
  // m
  if (keyCode === 77) {
    sound = !sound;
    masterVolume(+sound);
  }
  if (gameOver && keyCode === 13) {
    initGame();
  }
}

function initGame() {
  score = 0;
  gameOver = false;
  spaceShip = new SpaceShip();
  // numOfAsteroids, spaceBoundary, radarDiameter
  asteroids = new Asteroids(750, 5000, radarDiameter);
}
