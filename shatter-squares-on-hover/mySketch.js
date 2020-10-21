// palette from https://www.colourlovers.com/palette/174686/She_Is_French_Yes
const palette = '#3E4147,#FFFEDF,#DFBA69,#5A2E2E,#2A2C31'.split(',');
let ps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  // new ParticleSystem(startX, startY, numOfParticles, particleWidth);
  ps = new ParticleSystem(width * 0.1, 80, 20, 20, 40);
}

function draw() {
  background(palette[2]);

  ps.display();
  ps.update();

  info();
}

function info() {
  textSize(20);
  fill(20);
  text('Hover mouse to shatter blocks, any key to restore', 10, 30);
}

function keyPressed() {
  ps = new ParticleSystem(width * 0.1, 80, 20, 20, 40);
}
