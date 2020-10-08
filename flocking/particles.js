class Particles {
  constructor() {
    this.particles = [];
  }

  add(particle) {
    this.particles.push(particle);
  }

  remove() {
    this.particles.pop();
  }

  get size() {
    return this.particles.length;
  }

  update(obstacles, opposingSpecies) {
    this.particles.forEach((p) =>
      p.update(this.particles, obstacles, opposingSpecies)
    );
  }

  draw() {
    this.particles.forEach((p) => p.draw());
  }
}
