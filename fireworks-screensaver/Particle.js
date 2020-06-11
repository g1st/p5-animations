class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0.1);
    this.vel = p5.Vector.random2D()
      .mult(random(0.1, 1.8))
      .add(createVector(0, -10));
    this.col = random(fireworkColors);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    noStroke();
    fill(this.col);
    circle(this.pos.x, this.pos.y, 5);
  }

  isFinished() {
    return this.pos.y > height;
  }
}
