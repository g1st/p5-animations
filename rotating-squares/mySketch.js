function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  rectMode(CENTER);
  colorMode(RGB, 68);
}

function draw() {
  background(0);
  const multiColors = [
    '#C4E33F',
    '#93F5E7',
    '#F2A4D7',
    '#06623b',
    '#DC8770',
    '#ff926b',
    '#614370',
    '#36241E',
    '#B23E44',
    '#C29E43',
    '#E8D347',
  ];
  noStroke();
  const alpha = (frameCount % 100) / 100;

  const rotationAngle = 90;

  //sine wave goes between -1 and 1.  map this to a rotation mult between 0 and 2.
  //(frameCount is a built-in global variable)
  const rotationMultiplier = map(cos(frameCount / 100), -1, 1, 0, 2);
  const maxSize = min(height, width);
  //const iterations = map(mouseX, 0, width, 3, 80);
  const iterations = map(sin(frameCount / 20), -1, 1, 5, 80);
  const rimWidth = maxSize / iterations;
  for (let i = 0; i < iterations; i++) {
    push();
    translate(width / 2, height / 2);
    rotate((PI / rotationAngle) * i * rotationMultiplier);
    drawSquare(color(i, i, i), maxSize - i * rimWidth);
    // drawSquare(multiColors[i % multiColors.length], 2000 - (i * 30));
    pop();
  }
}

function drawSquare(color, size) {
  fill(color);
  square(0, 0, size);
}
