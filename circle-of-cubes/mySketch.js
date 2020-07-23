function setup() {
  createCanvas(800, 800, WEBGL);
  ambientLight(100, 0, 0);
  let r = 150;
  let g = 200;
  let b = 255;
  directionalLight(r, g, b, -100, -100, -100);
}

function draw() {
  noStroke();
  background('skyblue');

  rotateZ(frameCount * 0.01);
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(220, 100, 150, -dirX, -dirY, -1);

  drawCircleOfCubes(9, 100);
}

function drawCircleOfCubes(numOfCubes, size) {
  for (let i = 0; i < numOfCubes; i++) {
    let angle = (TWO_PI / numOfCubes) * i;
    let gap = size * 2.5;
    let x = sin(angle) * gap;
    let y = cos(angle) * gap;

    push();
    translate(x, y);
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);

    box(size, size, size);

    pop();
  }
}
