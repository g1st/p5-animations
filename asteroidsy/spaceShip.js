class SpaceShip {
  constructor() {
    this.position = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.size = 60;
    this.thrust = 0.4;
    this.direction = createVector(0, -1);
    this.turnSpeed = 0.06;
    this.isThrusting = false;
    this.trail = [];
    this.shotSpeed = 1;
    this.bullets = [];
  }

  drawShip() {
    push();
    this.drawTrail();
    translate(this.position.x, this.position.y);
    rotate(this.direction.heading() + PI / 2);

    image(shipImage, 0, 0, this.size, this.size);
    if (this.isThrusting) {
      this.drawThrust();
    }
    pop();
  }

  addShots() {
    const rocketWorldOffset = createVector(0, -30).rotate(
      this.direction.heading() + PI / 2
    );
    const newHeading = this.direction.heading() + radians(random(-2, 2));
    const rocket = {
      position: this.position.copy().add(rocketWorldOffset),
      direction: p5.Vector.fromAngle(newHeading),
      velocity: p5.Vector.fromAngle(newHeading, 10).add(this.velocity.copy()),
      shotTime: millis(),
      color: 'red',
      isDead: false,
      radius: 10,
      age: 0,
    };

    const shotInterval = 150; // ms

    if (this.bullets.length < 1) {
      this.bullets.push(rocket);
      shotSound.play();
    } else if (
      millis() >
      this.bullets[this.bullets.length - 1].shotTime + shotInterval
    ) {
      this.bullets.push(rocket);
      shotSound.play();
    }
  }

  moveShots() {
    for (let bullet of this.bullets) {
      bullet.position.add(
        bullet.velocity.add(bullet.direction.copy().mult(this.shotSpeed))
      );
    }

    // todo if shot reached length of radardiameter/2 - remove shot
  }

  drawShots() {
    for (let bullet of this.bullets) {
      bullet.age += 1;
      push();
      fill(bullet.color);
      circle(bullet.position.x, bullet.position.y, bullet.radius);
      pop();
    }
  }

  // todo checkIfHitAsteroid?

  showSpeed() {
    fill('white');
    const speed = int(map(this.velocity.mag(), 0, 40, 0, 1100));
    text(`Speed: ${speed}`, width - 80, height - 50);
  }

  drawThrust() {
    push();
    colorMode(HSB);
    for (let i = 0; i < 20; i++) {
      fill(random(0, 50), 100, 100, 0.5);
      circle(
        randomGaussian(0, 3),
        30 + abs(randomGaussian(0, 10)),
        random(3, 8)
      );
    }
    pop();
  }

  drawTrail() {
    for (let t of this.trail) {
      t.age += 1;
      t.size *= 0.99;

      // fill(70, 70, 70, 255);
      fill(70, 70, 70, 255 - t.age);
      circle(t.pos.x, t.pos.y, t.size);
    }
  }

  moveShip() {
    if (keyIsDown(UP_ARROW)) {
      this.applyThrottle(this.direction);
      this.isThrusting = true;
      const thrusterWorldOffset = createVector(0, 33).rotate(
        this.direction.heading() + PI / 2
      );

      // push trail particles when thrusting
      this.trail.unshift({
        age: 0,
        pos: this.position
          .copy()
          .add(thrusterWorldOffset)
          .add(p5.Vector.random2D().mult(6)),
        size: random(8, 14),
        isDead: false,
      });
    } else {
      this.isThrusting = false;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.direction = p5.Vector.fromAngle(
        this.direction.heading() + this.turnSpeed
      );
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.direction = p5.Vector.fromAngle(
        this.direction.heading() - this.turnSpeed
      );
    }
    // SPACEBAR
    if (keyIsDown(32)) {
      this.addShots();
    }

    this.bullets = this.bullets.filter((elem) => !elem.isDead);
    if (frameCount % 60 === 0) {
      this.trail = this.trail.filter((elem) => !elem.isDead);
    }
    for (let t of this.trail) {
      if (t.age > 254) {
        t.isDead = true;
      }
    }
    for (let bullet of this.bullets) {
      if (bullet.age > 25) {
        bullet.isDead = true;
      }
    }

    this.position.add(this.velocity);
    this.velocity.mult(0.99);
  }

  applyThrottle(direction) {
    this.velocity.add(direction.copy().mult(this.thrust));
  }

  cameraTowards() {
    cameraPos = cameraPos.lerp(this.position, 0.1);
  }
}
