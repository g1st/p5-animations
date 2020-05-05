function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  const multiColors = [
    '#C4E33F',
    '#93F5E7',
    '#F2A4D7',
    '#DC8770',
    '#ff926b',
    '#06623b',
    '#614370',
    '#36241E',
    '#B23E44',
    '#C29E43',
    '#E8D347',
  ];
  background(100);

  let x = width / 2;
  let y = height / 2;
  noStroke();

  let angleMultiplier = map(mouseX, 0, width, 0, 4);
  for (let i = 0; i < 12; i++) {
    push();
    translate(x, y);
    rotate((PI / 15) * i * angleMultiplier);
    drawSquare(multiColors[i % multiColors.length], 350 - i * 30);
    pop();
  }
}

function drawSquare(color, size) {
  fill(color);
  square(0, 0, size);
}
