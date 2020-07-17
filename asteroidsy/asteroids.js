class Asteroids {
  constructor(numOfObjects, boundary, radarDiameter) {
    this.asteroids = [];
    this.numOfObjects = numOfObjects;
    this.boundary = boundary;
    this.radarDiameter = radarDiameter;
    this.init();
  }

  init() {
    for (let i = 0; i < this.numOfObjects; i++) {
      let asteroid = new Asteroid(this.boundary, this.radarDiameter);

      this.asteroids.push(asteroid);
    }
  }

  move() {
    this.asteroids = this.asteroids.filter((asteroid) => !asteroid.isDead);

    for (let asteroid of this.asteroids) {
      asteroid.move();
    }
  }

  draw() {
    for (let asteroid of this.asteroids) {
      asteroid.draw();
    }
  }
}
