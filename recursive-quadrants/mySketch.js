function setup() {
  createCanvas(windowWidth, windowHeight);
  background(150);
  noLoop();
}
let count;
function draw() {
  count = 0;
  background(150);
  translate(width / 2, height / 2);
  drawSquare(int(random(2, 6)));
}

function drawSquare(depth) {
  if (count > 0 && (depth <= 0 || (depth < 4 && random() < 0.4))) {
    return;
  }
  count++;
  const size = width < height ? width / 3 : height / 3;
  const borderWidth = 40;
  // frame
  fill(random(255));
  noStroke();
  rect(
    -size - borderWidth,
    -size - borderWidth,
    size * 2 + borderWidth * 2,
    size * 2 + borderWidth * 2
  );

  // draw 4 squares
  // bottom right
  fill(random(255));
  rect(0, 0, size, size);
  // bottom left
  fill(random(255));
  rect(-size, 0, size, size);
  // top left
  fill(random(255));
  rect(-size, -size, size, size);
  // top right
  fill(random(255));
  rect(0, -size, size, size);

  // let scaling = map(mouseX, 0, width, 0, 1);
  let scaling = 0.4;

  push();
  // top left centre
  translate(-size / 2, -size / 2);
  rotate(radians(random(-1, 1)));
  scale(scaling);
  drawSquare(depth - 1);
  pop();

  push();
  // top right centre
  translate(size / 2, -size / 2);
  rotate(radians(random(-1, 1)));
  scale(scaling);
  drawSquare(depth - 1);
  pop();
  push();

  // bottom left centre
  translate(-size / 2, size / 2);
  rotate(radians(random(-1, 1)));
  scale(scaling);
  drawSquare(depth - 1);
  pop();
  push();

  // bottom right centre
  translate(size / 2, size / 2);
  rotate(radians(random(-1, 1)));
  scale(scaling);
  drawSquare(depth - 1);
  pop();
}

function mouseClicked() {
  redraw();
}
