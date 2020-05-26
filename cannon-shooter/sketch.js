let cannon;
let angler;
let shells = [];
let position;

function setup() {
  createCanvas(windowWidth, 720);
  rectMode(CENTER);
  angle = mouseY;
  position = createVector(0, 600);
  cannon = new Cannon(position.x, position.y);
  createP('mouseclick to shoot');
}

function draw() {
  background(127);
  cannon.display();
  const gravity = createVector(0, 2);
  for (let s of shells) {
    s.applyForce(gravity);

    // add friction
    const c = -0.04;
    const fr = s.velocity.copy();
    fr.normalize();
    fr.mult(c);
    s.applyForce(fr);
    s.checkForGround();
    s.update();
    s.display();
  }

  angle = map(mouseY, 0, height, -PI / 2, 0);
}

class Cannon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(angle);
    fill(90);
    strokeWeight(4);
    rect(0, 0, 200, 40);
    pop();
  }
}

class Shell {
  constructor(d) {
    this.d = d;
    this.mass = d * 2;
    this.location = createVector(position.x, position.y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(200, 150);
    push();
    translate(this.location.x, this.location.y);
    rotate(radians(this.angle));
    square(0, 0, this.d);
    pop();
  }

  update() {
    this.aAcceleration = constrain(this.location.x, -0.01, 0.01);
    this.velocity.add(this.acceleration);
    this.velocity.limit(9);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.aVelocity += this.aAcceleration;

    // spin only in the air
    if (this.location.y + this.d / 2 < height) {
      this.angle += this.aVelocity;
    }
  }

  applyForce(force) {
    const accellerationForce = p5.Vector.div(force, this.mass);
    this.acceleration.add(accellerationForce);
  }

  checkForGround() {
    if (this.location.y >= height - this.d / 2) {
      this.location.y = height - this.d / 2;
      this.velocity.y *= constrain(this.mass, -0.3, -0.7);
      this.velocity.x *= constrain(this.mass, 0.4, 0.8);
    }
  }
}

function mouseClicked() {
  const shotForce = p5.Vector.fromAngle(angle);
  shotForce.mult(random(200, 300));
  shell = new Shell(random(20, 30));
  shell.applyForce(shotForce);
  shells.push(shell);
}
