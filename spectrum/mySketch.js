function setup() {
  createCanvas(windowWidth, windowHeight);
  background('snow');
}

let seed = 123;

function draw() {
  randomSeed(seed);

  for (let i = 0; i < 40; i++) {
    makeArc(700, i);
    makeArc(500, i);
    makeArc(300, i);
  }

  drawCenter();
}

function makeArc(w, e, rot) {
  strokeWeight(20);
  stroke('snow');
  fill(random(50, 150), random(50, 150), random(100, 255));

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
  circle(width / 2, height / 2, 100);
}

function mouseMoved() {
  redraw();
}

function mousePressed() {
  seed = random(0, 999999);
}
