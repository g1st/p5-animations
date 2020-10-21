// based on glyphy on https://canvas-cards.glitch.me/#glyphy-selector
// palette from https://www.colourlovers.com/palette/845564/its_raining_love
const palette = '#A3A948,#EDB92E,#F85931,#CE1836,#009989'.split(',');
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(palette[4]);
  angleMode(DEGREES);
  createPoints(6);
  noLoop();
}

const points = [];

function draw() {
  drawGlyphs(4);
}

function keyPressed() {
  drawGlyphs(4);
}

function mouseClicked() {
  drawGlyphs(4);
}

function drawGlyphs(numOfGlyphs) {
  const glyphWidth = floor(width / numOfGlyphs / 4);
  const multiplier = (glyphWidth * numOfGlyphs * 1.2) / width;

  for (let i = 0; i < numOfGlyphs; i++) {
    drawGlyph(
      (width / 2) * i * multiplier + width / numOfGlyphs,
      height / 2,
      glyphWidth
    );
  }
}

function createPoints(numOfPoints) {
  for (let i = 0; i < numOfPoints; i++) {
    let angle = (360 / numOfPoints) * i;
    let x = sin(angle);
    let y = cos(angle);
    points.push({
      x,
      y,
      angle,
    });
  }
}

function getCombinations(numOfPoints) {
  const pairs = [];

  for (let i = 0; i < numOfPoints; i++) {
    pairs.push([i, (i + 1) % numOfPoints]);
    pairs.push([i, null]);
  }

  return pairs;
}

function drawGlyph(x, y, size) {
  push();
  translate(x, y);
  drawGlyphBackground(x, y, size * 1.3);

  const possibleCombinations = getCombinations(points.length);
  const numberOfLines = floor(random(points.length / 2, points.length + 1));
  const lineIndexes = shuffle(possibleCombinations).slice(0, numberOfLines);
  const center = {
    x: 0,
    y: 0,
  };

  for (let [index1, index2] of lineIndexes) {
    let p1 = points[index1];
    let p2 = index2 === null ? center : points[index2];

    strokeWeight(size / 8);
    stroke(palette[3]);
    line(p1.x * size, p1.y * size, p2.x * size, p2.y * size);
  }
  pop();
}

function drawGlyphBackground(x, y, size) {
  beginShape();
  noStroke();
  fill(palette[1]);
  for (let p of points) {
    vertex(p.x * size, p.y * size);
  }
  endShape(CLOSE);
}
