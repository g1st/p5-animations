// https://www.colourlovers.com/palette/440186/July
const palette = {
  name: 'July',
  colors: ['#F2A73D', '#A0E8B7', '#EB0A44', '#F2643D'],
  background: '#26251C',
};
let score = 0;
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
let shotHitAsteroidSound;

function preload() {
  // images
  shipImage = loadImage('assets/playerShip1_red.png');
  meteor1 = loadImage('assets/meteorBrown_big1.png');
  meteor2 = loadImage('assets/meteorBrown_big2.png');
  meteor3 = loadImage('assets/meteorBrown_big3.png');
  meteor4 = loadImage('assets/meteorBrown_big4.png');

  // sounds
  shotSound = loadSound('assets/sounds/shot.wav');
  shotHitAsteroidSound = loadSound('assets/sounds/explosion.ogg');
}

function setup() {
  p5.disableFriendlyErrors = true;
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  background(palette.background);
  shotSound.setVolume(0.04);
  shotHitAsteroidSound.setVolume(0.04);

  cameraPos = createVector(0, 0);
  radarDiameter = Math.min(width, height);
  spaceShip = new SpaceShip();
  // numOfAsteroids, spaceBoundary, radarDiameter
  asteroids = new Asteroids(500, 5000, radarDiameter);
}

function draw() {
  background(palette.background);
  fill('white');
  text(`FPS: ${int(frameRate())}`, 25, 25);
  fill('white');
  text(`SCORE: ${score}`, width - 100, 25);
  scale(scaling);
  drawRadar();
  showCameraPosition();
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

function drawRadar() {
  fill(255, 255, 255, 5);
  circle(width / 2, height / 2, radarDiameter);
}

function showCameraPosition() {
  fill('white');
  noStroke();
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
