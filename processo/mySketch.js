// https://www.happyhues.co/palettes/10
const palette = {
  background: '#004643',
  colors: ['#f9bc60', '#abd1c6', '#e16162', '#eebbc3'],
  stroke: ['#001e1d'],
};
const rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(palette.background);
  generateRects(300);
  noStroke();
  noLoop();
  blendMode(DIFFERENCE);
}

function draw() {
  drawRects();
}

function drawRects() {
  drawingContext.shadowColor = palette.stroke;

  rects.forEach((r) => {
    push();
    translate(r.position.x, r.position.y);
    rotate(radians(r.rotation));
    fill(r.color);
    drawingContext.shadowBlur = r.blur;
    rect(0, 0, r.w, r.h, r.borderRadius);
    pop();
  });
}

function generateRects(numOfRects) {
  rects.length = 0;
  for (let i = 0; i < numOfRects; i++) {
    const rect = {
      w: random(60, 260),
      h: random(60, 200),
      position: createVector(random(width), random(height)),
      color: random(palette.colors),
      rotation: random(360),
      borderRadius: random(10),
      blur: random(20),
    };
    rects.push(rect);
  }
}

function mouseClicked() {
  blendMode(BLEND);
  background(palette.background);
  blendMode(DIFFERENCE);
  generateRects(400);
  redraw();
}
