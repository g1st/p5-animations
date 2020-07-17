class Asteroid {
  constructor(boundary, radarDiameter) {
    this.boundary = boundary;
    this.radarDiameter = radarDiameter;
    this.minRadius = 12;
    this.maxRadius = 50;
    this.position = createVector(
      randomGaussian(0, boundary),
      randomGaussian(0, boundary)
    );
    this.radius = random(this.minRadius, this.maxRadius);
    this.color = random(palette.colors);
    this.phase = random(TWO_PI);
    this.speed = random(3);
    this.isDead = false;

    if (random() < 0.8) {
      this.velocity = p5.Vector.random2D().mult(this.speed);
      this.lives = int(abs(randomGaussian(0, 2))) + 1;
      // stationary asteroid
    } else {
      this.velocity = p5.Vector.random2D().mult(0);
      // global meteor image raferences
      this.still = random([meteor1, meteor2, meteor3]);
      this.lives = random([4, 5, 6]);
    }
  }

  move() {
    this.position.add(this.velocity);
  }

  draw() {
    noStroke();
    fill(this.color);

    if (this.isInsideRadar()) {
      fill(this.color + 'a0');

      const angle = radians(map(frameCount % 90, 0, 90, 0, 360));

      strokeWeight(
        map(sin(this.phase + frameCount / 10), -1, 1, 1, this.lives * 4)
      );

      // todo need a better color
      stroke('red');

      // check if bullet hit theasteroid
      this.checkIfHit();
    }

    if (this.still) {
      fill('rosybrown');
      image(this.still, this.position.x, this.position.y);
    } else {
      circle(this.position.x, this.position.y, this.radius * 2);
    }

    // info text on top of the asteroid
    fill('white');
    noStroke();
    text(`${this.lives}`, this.position.x - 5, this.position.y);
  }

  checkIfHit() {
    for (let bullet of spaceShip.bullets) {
      const distance = this.position.dist(bullet.position);
      const radiusDistance = this.radius + bullet.radius;

      if (distance < radiusDistance) {
        this.lives -= 1;
        bullet.isDead = true;

        if (this.lives < 1) {
          asteroidDestroySound.play();
          score++;
          this.isDead = true;
        } else {
          // just play asteroid hit sound
          asteroidImpactSound.play();
        }

        // todo create new asteroid ?
      }
    }
  }

  isInsideRadar() {
    const radarRadius = this.radarDiameter / 2;
    // cameraPos always global
    const distance = this.position.dist(cameraPos);

    return distance < radarRadius;
  }
}
