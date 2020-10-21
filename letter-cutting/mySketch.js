let g;
let letter = 'a';

function setup() {
  createCanvas(400, 400);
  g = createGraphics(400, 400);
  hiddenGraphics(g);
}

function draw() {
  background('#A3A948');
  copyHiddenImage(g);
  fill(100);
  text('Press any key and move mouse around', 0, height - 5);
}

function hiddenGraphics(g) {
  g.fill(100, 150, 100);
  g.background('#A3A948');
  g.textAlign(CENTER, CENTER);
  g.textSize(392);
  g.text(letter, g.width / 2, g.height / 2);
}

function copyHiddenImage(img) {
  // copy(srcImg, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
  const cellsPerLine = 4;
  const cellWidth = floor(img.width / cellsPerLine);

  for (let col = 0; col < cellsPerLine; col++) {
    for (let row = 0; row < cellsPerLine; row++) {
      const d = floor(dist(mouseX, mouseY, col * cellWidth, row * cellWidth));
      let amp = map(d, 0, img.width * 1.4, 0, 80);
      textSize(16);
      noStroke();

      const index = row * cellsPerLine + col;
      const waveLength = TWO_PI / 2;
      const phase = index * (waveLength / (cellsPerLine * cellsPerLine));
      const x = col * cellWidth;
      const y = row * cellWidth;
      const xOffset = floor(sin(phase + frameCount / 10) * amp);
      copy(
        img,
        x,
        y,
        cellWidth,
        cellWidth,
        x + xOffset,
        y,
        cellWidth,
        cellWidth
      );
    }
  }
}

function keyPressed() {
  letter = key;
  hiddenGraphics(g);
}
