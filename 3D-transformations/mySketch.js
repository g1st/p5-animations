// https://github.com/kgolid/chromotome/blob/master/palettes
const palette = {
  name: 'tsu_arcade',
  colors: ['#4aad8b', '#e15147', '#f3b551', '#cec8b8', '#d1af84', '#544e47'],
  stroke: '#251c12',
  background: '#cfc7b9',
};
let boxes = [];
let scaleValue = 0.3;
let currentShapeType = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  initBoxes(300, currentShapeType);
}

function draw() {
  // stroke(palette.stroke);
  noStroke();
  background(palette.background);
  scale(scaleValue);

  //set up some lights
  let r = 255;
  let g = 150;
  let b = 150;
  directionalLight(r, g, b, -100, -100, -100);
  ambientLight(180);

  handleRotation(mouseX + 45, mouseY + 45);

  for (let b of boxes) {
    drawBox(b);
    animateBox(b);
  }
}

function drawBox(b) {
  push();
  translate(b.pos.x, b.pos.y, b.pos.z);
  fill(b.clr);
  box(b.width, b.height, b.depth);
  pop();
}

function handleRotation(mX, mY) {
  const x = map(mX, 0, width, 0, TWO_PI);
  const y = map(mY, 0, height, 0, TWO_PI);
  rotateY(x);
  rotateX(y);
  rotateZ(x);
}

function initBoxes(numOfBoxes, shapeType) {
  boxes = [];
  for (let i = 0; i < numOfBoxes; i++) {
    const width = random(40, 500);
    const height = random(40, 500);
    const depth = random(40, 500);
    const clr = color(random(palette.colors));
    const defaultCube = getDesiredPosition(random([0, 1, 2, 3, 4]));

    const b = {
      width,
      height,
      depth,
      clr,
      pos: defaultCube,
      desired: defaultCube.copy(),
    };

    boxes.push(b);
  }
}

function getDesiredPosition(shapeType) {
  const maxRange = 4000;
  switch (shapeType) {
    case 0:
      // cube
      return createVector(
        random(-1, 1) * maxRange,
        random(-1, 1) * maxRange,
        random(-1, 1) * maxRange
      );
    case 1:
      // flat ground
      return createVector(
        random(-1, 1) * maxRange,
        random(-1, 1) * maxRange,
        0
      );
    case 2:
      // lost in space
      return createVector(
        randomGaussian(0, 1) * maxRange,
        randomGaussian(0, 1) * maxRange,
        randomGaussian(0, 1) * maxRange
      );
    case 3:
      // ball
      return p5.Vector.random3D().mult(maxRange);
    case 4:
      // international space station
      return createVector(random(-1, 1) * maxRange, 0, 0);

    default:
      // default cube
      return createVector(
        random(-1, 1) * maxRange,
        random(-1, 1) * maxRange,
        random(-1, 1) * maxRange
      );
  }
}

function mouseWheel(event) {
  const change = event.delta / Math.abs(event.delta) / 75;
  scaleValue -= change;
  if (scaleValue < 0.01) {
    scaleValue = 0.01;
  }
  if (scaleValue > 1) {
    scaleValue = 1;
  }
}

function mouseClicked() {
  currentShapeType = (currentShapeType + 1) % 5;

  for (let b of boxes) {
    const desired = getDesiredPosition(currentShapeType);
    b.desired = desired;
  }
}

function animateBox(b) {
  b.pos = p5.Vector.lerp(b.pos, b.desired, 0.03);
}
