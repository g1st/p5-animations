let bobs = [];

function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 9; i++) {
    let bob = new Bob(100 * i + 100, 0);
    bobs.push(bob);
  }
  createP('Click mouse to release balls from different angles.');
}

function draw() {
  background(225);
  for (let b of bobs) {
    b.display();
    b.update();
  }
}

class Bob {
  constructor(x, y) {
    this.len = x / 3;
    this.ball = createVector(x, y + this.len);
    this.arm = createVector(x, y);
    this.angle = -PI / 2;
    this.aVel = 0;
    this.aAcc = 0;
  }

  display() {
    push();
    translate(this.arm.x, this.arm.y);
    fill(80);
    stroke(80);
    line(0, 0, this.ball.x, this.ball.y);
    ellipse(this.ball.x, this.ball.y, 20, 20);
    pop();
  }

  update() {
    this.ball.x = sin(this.angle) * this.len;
    this.ball.y = cos(this.angle) * this.len;
    this.aAcc = -1 * (0.7 / this.len) * sin(this.angle);
    this.aVel += this.aAcc;
    this.angle += this.aVel;
    this.aVel *= 0.99;
  }
}

function restart() {
  const angle = random(-PI / 2, 0);
  for (b of bobs) {
    b.angle = angle;
    b.aVel = 0;
    b.aAcc = 0;
  }
}

function mouseClicked() {
  restart();
}
