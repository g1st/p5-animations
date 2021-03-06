const palette = '#607848,#789048,#C0D860,#F0F0D8,#604848'.split(',');

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  background(palette[1]);
  drawTrees();
}

function drawTrees() {
  const numOfTrees = width > 800 ? 3 : 1;
  const xPos = numOfTrees > 2 ? width / 4 : width / 2;
  for (let i = 1; i <= numOfTrees; i++) {
    push();
    translate(xPos * i, height * 1.008);
    drawTree(8);
    pop();
  }
}

function drawBlossoms() {
  const colors = [color(250, 150, 150, 100), color(255, 100)];

  for (let i = 0; i < 24; i++) {
    fill(random(colors));
    const pos = p5.Vector.random2D().mult(random(220));
    circle(pos.x, pos.y, random(20, 60));
  }
}

function drawTree(iterationsRemaining) {
  if (iterationsRemaining <= 0 || (random() < 0.1 && iterationsRemaining < 4)) {
    drawBlossoms();
    return;
  }

  const branchLength = random(80, 120);

  // piece of wood
  fill(palette[4]);
  push();
  translate(0, -branchLength / 2);
  rect(0, 0, 20, branchLength, 50);
  pop();
  scale(random(0.7, 0.9));

  push();
  translate(0, -branchLength);
  rotate(radians(random(-30, 20)));

  drawTree(iterationsRemaining - 1);
  pop();

  push();
  translate(0, -branchLength);
  rotate(radians(random(-20, 30)));
  drawTree(iterationsRemaining - 1);
  pop();
}

function mouseClicked() {
  background(palette[1]);
  drawTrees();
}
