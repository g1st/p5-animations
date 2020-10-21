class ParticleSystem {
  constructor(x, y, columns, rows, size) {
    this.position = createVector(x, y);
    this.columns = columns;
    this.rows = rows;
    this.size = size;
    this.particles = [];

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const p = new Particle(
          this.position.x + i * this.size,
          this.position.y + j * this.size,
          this.size
        );
        // add new items at the start (will look better without alpha)
        this.particles.unshift(p);
      }
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

      if (p.hovered()) {
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
}
