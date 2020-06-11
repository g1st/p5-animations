class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fireworks = [];
  }

  add() {
    const numOfParticles = random(40, 80);

    for (let i = 0; i < numOfParticles; i++) {
      const particle = new Particle(this.x, this.y);
      this.fireworks.push(particle);
    }
  }

  shoot() {
    for (let i = this.fireworks.length - 1; i > -1; i--) {
      this.fireworks[i].move();
      if (this.fireworks[i].isFinished()) {
        this.fireworks.splice(i, 1);
      }
    }
  }

  isDone() {
    return this.fireworks.length <= 0;
  }
}
