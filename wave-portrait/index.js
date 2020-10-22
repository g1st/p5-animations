// <span>Photo by <a href="https://unsplash.com/@flaviewxvx?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Flavio Gasperini</a> on <a href="https://unsplash.com/s/photos/black-and-white-face?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
let img;
let showImage = false;
const palette = ['#a1dbb2', '#fee5ad', '#faca66', '#f7a541', '#f45d4c'];

function preload() {
  img = loadImage('bw-portrait.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(palette[4]);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  showImage ? image(img, 0, 0) : background(palette[4]);

  const maxAmplitude = map(sin(frameCount * 20), -1, 1, 0, 8);
  let xStep = 12;
  for (let x = -10; x < width + 10; x += xStep) {
    drawLine(x, maxAmplitude);
  }
}

function drawLine(xStart, maxAmplitude) {
  noFill();
  strokeWeight(2);
  stroke(palette[1]);
  beginShape();
  let yStep = 1;
  for (let y = 0; y < height; y += yStep) {
    // brightness of a pixel at that position
    const [r, g, b, a] = img.get(xStart, y);

    const amplitude = map(r, 0, 255, 0, maxAmplitude);
    let x = xStart + sin(y * 40) * amplitude;
    vertex(x, y);
  }
  endShape();
}

function mouseClicked() {
  showImage = !showImage;
  background(palette[4]);
  redraw();
}
