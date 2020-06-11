let font;
let points;
let moveX = 0;
let moveY = 0;
let speedX;
let speedY;
const textColors = '#0275d8,#5cb85c,#5bc0de,#f0ad4e,#d9534f,#f7f7f7'.split(',');
const fireworkColors = '#ff0000,#ffa500,#ffff00,#008000,#0000ff,#4b0082,#ee82ee'.split(
  ','
);
let clr;
let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  clr = random(textColors);
  points = getFontOutlinePointsForWord('Hi!');
  speedX = random([2, 3, 4]);
  speedY = random([2, 3, 4]);
}

function draw() {
  background(50);

  drawAndMoveText();
  handleEdgeHit();
  shootFirework();
}

function drawAndMoveText() {
  fill(clr);

  for (let point of points) {
    const posX = point.x + moveX + randomGaussian(0, 2);
    const posY = point.y + moveY + randomGaussian(0, 2);

    noStroke();
    circle(posX, posY, 6);
  }

  moveX += speedX;
  moveY += speedY;
}

function handleEdgeHit() {
  const rightEdge = points[points.length - 1].x + moveX;
  const leftEdge = points[0].x + moveX;
  const bottomEdge = points[points.length - 1].y + moveY;
  const topEdge = points[0].y + moveY;

  if (rightEdge >= width || leftEdge < 0) {
    speedX *= -1;
    clr = random(textColors);
    addFirework(rightEdge, leftEdge);
  }
  if (bottomEdge >= height || topEdge < 0) {
    speedY *= -1;
    clr = random(textColors);
    addFirework(rightEdge, leftEdge);
  }
}

function shootFirework() {
  for (let i = fireworks.length - 1; i > -1; i--) {
    fireworks[i].shoot();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }
}

function addFirework(pos1, pos2) {
  let f = new Firework((pos1 + pos2) / 2, height);
  f.add();
  if (fireworks.length < 6) {
    fireworks.push(f);
  }
}

function preload() {
  const fnt = 'Righteous-Regular.ttf';
  font = loadFont(fnt);
}

function getFontOutlinePointsForWord(word) {
  return font.textToPoints(word, 0, height / 2, 180, {
    sampleFactor: 0.3,
    simplifyThreshold: 0,
  });
}
