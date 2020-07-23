let canvas;
let amount = 0;
let step = 0.01;
const eyes = [];

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(150);
  noStroke();
  initGrid(200);
}

function draw() {
  background(255);
  if (amount > 1) {
    amount = 1;
  }
  amount += step;
  drawingContext.shadowColor = 'lightgrey';

  const mouseVec = createVector(mouseX, mouseY);
  for (let e of eyes) {
    drawEyes(e, mouseVec);
  }
}

function drawEyes(eyes, target) {
  const diffVector = target.copy().sub(eyes.centre);
  const h = diffVector.heading();

  translateEye(eyes.left, eyes.centre, h);
  translateEye(eyes.right, eyes.centre, h);
}

function translateEye(eye, centre, heading) {
  const posOffScreen = eye.offScreenPos;
  const newTarget = p5.Vector.lerp(posOffScreen, eye.targetPos, amount);

  push();
  translate(newTarget.x, newTarget.y);
  rotate(heading);
  drawEye(eye);
  pop();
}

function drawEye(eye) {
  // white
  drawingContext.shadowBlur = 5;
  fill('white');
  circle(0, 0, eye.size);

  // pupil
  drawingContext.shadowBlur = 0;
  fill(240);
  circle(eye.size / 4, 0, eye.size / 2);
}

function initGrid(gap) {
  for (let y = 0; y < height / gap; y++) {
    for (let x = 0; x < width / gap; x++) {
      initEyes(x, y, gap);
    }
  }
}

function initEyes(x, y, gap) {
  const size = randomGaussian(60, 10);
  const offset = gap / 2;
  const randomPositionOffScreen = p5.Vector.random2D()
    .mult(width)
    .add(createVector(width / 2, height / 2));

  const eyePair = {
    centre: createVector(x * gap + offset, y * gap + offset),
    left: {
      offScreenPos: randomPositionOffScreen,
      targetPos: createVector(x * gap - size * 0.55 + offset, y * gap + offset),
      size,
    },
    right: {
      offScreenPos: randomPositionOffScreen,
      targetPos: createVector(x * gap + size * 0.55 + offset, y * gap + offset),
      size,
    },
  };

  eyes.push(eyePair);
}
