function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  drawingContext.shadowColor = color(0, 0, 0);
  initShapes(random(10, 30));
  noStroke();
  background(random(palette));
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();
}

const palette = ['#fad089', '#ff9c5b', '#f5634a', '#ed303c', '#3b8183'];

const layers = 7;
const shapes = [];

function draw() {
  for (let i = 0; i < layers; i++) {
    fill(palette[i % palette.length]);

    // first draw with blur
    drawingContext.shadowBlur = 20;
    drawShapes(shapes, i);

    // draw on top to hide shadow blur
    drawingContext.shadowBlur = 0;
    drawShapes(shapes, i);
  }
}

function drawShapes(shapes, i) {
  for (let shape of shapes) {
    push();
    translate(shape.pos.x, shape.pos.y);
    rotate(shape.angle);
    const gap = ((shape.size * 1) / layers) * i;
    if (shape.circle) {
      circle(0, 0, shape.size - gap);
    } else {
      rect(0, 0, shape.size - gap, shape.size - gap);
    }
    pop();
  }
}

function initShapes(numOfBlobs) {
  for (let i = 0; i < numOfBlobs; i++) {
    const offset = 200;
    const x = random(0 - offset, width + offset);
    const y = random(0 - offset, height + offset);
    const shape = {
      pos: createVector(x, y),
      size: random(50, 500),
      circle: random([true, false]),
      angle: random(360),
    };
    shapes.push(shape);
  }
}

function mouseClicked() {
  shapes.length = 0;
  background(random(palette));
  initShapes(random(8, 30));
  redraw();
}
