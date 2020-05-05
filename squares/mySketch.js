function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  noLoop();
  rectMode(CENTER);
  colorMode(RGB, 67);
}

function draw() {
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

  const rotationAngle = 20;

  for (let i = 0; i < 68; i++) {
    push();
    translate(width / 2, height / 2);
    rotate((PI / rotationAngle) * i);
    drawSquare(random(multiColors), 2000 - i * 30);
    pop();
  }
}

function drawSquare(color, size) {
  fill(color);
  square(0, 0, size);
}
