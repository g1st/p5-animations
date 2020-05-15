function setup() {
  createCanvas(windowWidth, windowHeight);
  background('snow');
}

let seed = 123;
const smallerDimension =
  window.innerWidth > window.innerHeight
    ? window.innerHeight
    : window.innerWidth;
const bigCircle = smallerDimension * 0.95;
const mediumCircle = smallerDimension * 0.65;
const smallCircle = smallerDimension * 0.35;

function draw() {
  randomSeed(seed);

  for (let i = 0; i < 40; i++) {
    makeArc(bigCircle, i);
    makeArc(mediumCircle, i);
    makeArc(smallCircle, i);
  }

  drawCenter();
}

function makeArc(w, e, rot) {
  strokeWeight(width > 700 ? 20 : 10);
  stroke('snow');
  colorMode(HSB, 100);
  fill(random(100), 50, 100);

  push();
  rotationAngle = map(mouseX, 0, width, 0, TWO_PI);
  translate(width / 2, height / 2);
  rotate(rotationAngle);
  arc(0, 0, w, w, (PI / 20) * e, (PI / 20) * (e + 1));
  pop();
}

function drawCenter() {
  noStroke();
  fill('snow');
  const circleDiameter = width > 700 ? 100 : 35;
  circle(width / 2, height / 2, circleDiameter);
}

function mouseMoved() {
  redraw();
}

function mousePressed() {
  seed = random(0, 999999);
}
