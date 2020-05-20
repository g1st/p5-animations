function preload() {
  flyImage = loadImage('./fly.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(80);
  fly = new Fly(width / 2, height / 2, 14, 6);
  wind = new WindInfo();
}

let flyImage;
let fly;
let wind;
let t = 0;
let t2 = 10000;

function draw() {
  background(80);

  const n = noise(t);
  const z = noise(t2);

  t += 0.01;
  t2 += 0.01;

  const x = map(n, 0, 1, -0.08, 0.0);
  const y = map(z, 0, 1, -0.05, 0.05);

  if (mouseIsPressed) {
    const blowWind = new p5.Vector(0.1, 0);
    fly.applyForce(blowWind);
    wind.displayActive();
  } else {
    wind.information();
  }

  const lostFly = new p5.Vector(x, y);
  fly.applyForce(lostFly);
  fly.display();
  fly.move();
  fly.bounce();
  drawWindow();
}

class Fly {
  constructor(x, y, xSpeed, ySpeed) {
    this.location = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
  }

  move() {
    this.mouse = new p5.Vector(mouseX, mouseY);
    this.velocity.add(this.acceleration);
    this.velocity.limit(8);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  bounce() {
    if (this.location.x > width || this.location.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.location.y > height || this.location.y < 0) {
      this.velocity.y *= -1;
    }
  }

  display() {
    fill('pink');
    image(flyImage, this.location.x, this.location.y, 100, 100);
  }
}

class WindInfo {
  constructor() {
    this.info = 'Press mouse to blow window to the right!';
  }

  information() {
    fill(255);
    textSize(width * 0.03);
    text(this.info, width / 3, 50);
  }

  displayActive() {
    noStroke();
    const xPos = width / 4;
    const yPos = height / 8;
    const rectWidth = width / 2;
    const rectHeight = height / 30;
    rect(xPos, yPos, rectWidth, rectHeight);
    triangle(
      xPos + rectWidth,
      0,
      xPos + rectWidth + rectWidth / 6,
      yPos + rectHeight / 2,
      xPos + rectWidth,
      yPos * 2 + rectHeight / 2
    );
  }
}

function drawWindow() {
  fill('skyblue');
  if (height < width) {
    rect(0, 0, width * 0.02, height);
  } else {
    rect(0, 0, width * 0.06, height);
  }

  push();
  const windowWidth = (width * 0.02) / 2;
  const windowHeight = height / 2;
  translate(windowWidth, windowHeight);
  rotate(-PI / 2);
  if (height < width) {
    textSize(windowWidth * 1.5);
    fill(20);
    text("I'm a window!", 0, windowWidth / 2);
  } else {
    textSize(windowWidth * 5);
    fill(20);
    text("I'm a window!", 0, windowWidth * 3);
  }
  pop();
}
