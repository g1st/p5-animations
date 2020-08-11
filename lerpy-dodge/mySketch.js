const circlePoints = [];
const rectPoints = [];
const lerps = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  rectMode(CENTER);
  const smaller = width < height ? width : height;
  makeCircle(smaller * 0.3);
  makeRect(smaller * 0.3);
  makeMorph();
}

function draw() {
  background(100);
  drawBackgroundRects();
  for (let i = 0; i < circlePoints.length; i++) {
    let v1;

    // bottom right
    if (mouseX > width / 2 && mouseY > height / 2) {
      v1 = rectPoints[i];
      // top right
    } else if (mouseX > width / 2 && mouseY <= height / 2) {
      v1 = p5.Vector.random2D().mult(600);
      // top left
    } else if (mouseX < width / 2 && mouseY <= height / 2) {
      v1 = circlePoints[i];
      // bottom left
    } else if (mouseX < width / 2 && mouseY > height / 2) {
      v1 = new p5.Vector();
    }
    lerps[i].lerp(v1, 0.075);
  }
  translate(width / 2, height / 2);
  drawShape();
}

function drawBackgroundRects() {
  const w = width / 2;
  const h = height / 2;
  push();

  noStroke();
  rectMode(CORNER);
  // top right
  fill('#004643');
  rect(w, 0, w, h);
  // bottom right
  fill('#232946');
  rect(w, h, w, h);
  // bottom left
  fill('#fec7d7');
  rect(0, h, w, h);
  // topleft
  fill('#55423d');
  rect(0, 0, w, h);
}

function drawShape() {
  push();
  blendMode(DODGE);

  beginShape();
  noFill();
  strokeWeight(5);
  stroke('#fffffe');
  fill('#ff8906');
  for (let v of lerps) {
    vertex(v.x, v.y);
  }
  endShape(CLOSE);
  pop();
}

function makeCircle(size) {
  for (let i = 0; i < 360; i += 9) {
    const x = size * sin(radians(i));
    const y = size * cos(radians(i));
    circlePoints.push(createVector(x, y));
  }
}

function makeMorph() {
  for (let i = 0; i < 360; i += 9) {
    const x = 200 * sin(radians(i));
    const y = 200 * cos(radians(i));
    lerps.push(createVector(x, y));
  }
}

function makeRect(size) {
  // top edge
  for (let i = -size; i < size; i += size / 5) {
    const x = i;
    const y = -size;
    rectPoints.push(createVector(x, y));
  }
  // right edge
  for (let i = -size; i < size; i += size / 5) {
    const x = size;
    const y = i;
    rectPoints.push(createVector(x, y));
  }
  // bottom edge
  for (let i = size; i > -size; i -= size / 5) {
    const x = i;
    const y = size;
    rectPoints.push(createVector(x, y));
  }
  // left edge
  for (let i = size; i > -size; i -= size / 5) {
    const x = -size;
    const y = i;
    rectPoints.push(createVector(x, y));
  }
}
