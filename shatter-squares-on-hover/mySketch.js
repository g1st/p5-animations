let ps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  // new ParticleSystem(startX, startY, numOfParticles, particleWidth);
  ps = new ParticleSystem(width * 0.1, 80, 20, 20, 40);
}

function draw() {
  background(127);

  ps.display();
  ps.update();

  info();
}

function info() {
  textSize(20);
  fill(240);
  text('Hover mouse to shatter blocks, any key to restore', 10, 30);
}

function keyPressed() {
  ps = new ParticleSystem(width * 0.1, 80, 20, 20, 40);
}
