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

      // stationary asteroid
    } else {
      this.velocity = p5.Vector.random2D().mult(0);
      // global meteor image raferences
      this.still = random([meteor1, meteor2, meteor3]);
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

      strokeWeight(map(sin(this.phase + frameCount / 10), -1, 1, 1, 6));

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
    text(
      `${int(this.position.x)}, ${int(this.position.y)}`,
      this.position.x - 20,
      this.position.y
    );
  }

  checkIfHit() {
    for (let bullet of spaceShip.bullets) {
      // find dist between asteroid centre and bullet centre
      const distance = this.position.dist(bullet.position);
      // find distance of object radius and bullet radius
      const radiusDistance = this.radius + bullet.radius;
      // if first < r1 + r2 = HIT HAPPENDING
      if (distance < radiusDistance) {
        shotHitAsteroidSound.play();
        // kill object
        this.isDead = true;
        // kill bullet
        bullet.isDead = true;
        // update global score
        score++;

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
