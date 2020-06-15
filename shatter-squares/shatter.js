let ps;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  // new ParticleSystem(startX, startY, numOfParticles, particleWidth);
  ps = new ParticleSystem(width * 0.1, 80, 15, 40);
}

function draw() {
  background(127);

  ps.display();
  ps.update();

  info();
}

function info() {
  textSize(16);
  fill(240);
  text('Mouseclick to shatter, any key to restore blocks', 10, 30);
}

function mouseClicked() {
  ps.shatter();
}

function keyPressed() {
  ps = new ParticleSystem(width * 0.1, 80, 15, 40);
}
class ParticleSystem {
  constructor(x, y, quantity, size) {
    this.position = createVector(x, y);
    this.quantity = quantity;
    this.size = size;
    this.particles = [];

    for (let i = 0; i < this.quantity; i++) {
      const p = new Particle(
        this.position.x + i * this.size,
        this.position.y,
        this.size
      );
      this.particles.push(p);
    }
  }

  display() {
    for (let p of this.particles) {
      p.display();
    }
  }

  update() {
    for (let p of this.particles) {
      p.update();
    }
  }

  shatter() {
    for (let p of this.particles) {
      p.shakeIt();

      const gravity = createVector(0, random(0.1, 0.3));
      const randomRotation = random(-0.03, 0.03);

      setTimeout(() => {
        p.applyForce(gravity);
        p.applyRotation(randomRotation);
      }, 100);
    }
  }
}

class Particle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.size = size;
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.angle = 0;
    this.aAcc = 0;
    this.aVel = 0;
    this.shake = 0;
  }

  display() {
    const shakeVector = p5.Vector.random2D().mult(this.shake);
    push();
    fill(50, 80);
    translate(this.pos.x + shakeVector.x, this.pos.y + shakeVector.y);
    rotate(this.angle);
    rect(0, 0, this.size, this.size);
    pop();
    this.shake -= 0.2;
    if (this.shake < 0) {
      this.shake = 0;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  applyRotation(aForce) {
    this.aAcc += aForce;
  }

  shakeIt() {
    this.shake = 3;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // this.acc.mult(0);
    this.vel.mult(1.05);

    this.aVel += this.aAcc;
    this.angle += this.aVel;
  }
}
