class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.colour = color(random(255));
  }

  draw() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    fill(this.calculateColour());
    beginShape();
    rectMode(CENTER);
    rect(0, 0, 30, 10);
    endShape();
    pop();
    if (gShouldDrawAcceleration) {
      this.drawAcceleration(this);
    }
  }

  calculateColour() {
    const c = map(this.vel.mag(), 0, 3, 255, 0);
    return color(c);
  }

  handleScreenCrossing() {
    const margin = 20;

    if (this.pos.x < 0 - margin) {
      this.pos.x += width + margin * 2;
    }
    if (this.pos.x > width + margin) {
      this.pos.x -= width + margin * 2;
    }
    if (this.pos.y < 0 - margin) {
      this.pos.y += height + margin * 2;
    }
    if (this.pos.y > height + margin) {
      this.pos.y -= height + margin * 2;
    }
  }

  calculateObstacleRepulsion(particles, obstacles) {
    const obstacleRepulsion = createVector(0, 0);

    obstacles.forEach((obstacle) => {
      const distance = p5.Vector.dist(this.pos, obstacle.pos);
      if (distance <= obstacle.r * 1.5) {
        const acceleration = this.calcNormalizedRepulsionAcceleration(
          obstacle,
          this
        );
        const multiplier = map(distance, 0, obstacle.r * 1.5, 3, 0);
        const appliedAcceleration = acceleration.mult(multiplier);

        obstacleRepulsion.add(appliedAcceleration);
      }
    });
    return obstacleRepulsion;
  }

  calcNormalizedRepulsionAcceleration(from, to) {
    return p5.Vector.sub(from.pos, to.pos).mult(-1).normalize();
  }

  calcNormalizedAttractionAcceleration(from, to) {
    return p5.Vector.sub(from.pos, to.pos).normalize();
  }

  calculateRepulsionFromNearbyParticles(particles) {
    const distanceToStartApplying = 40;
    const repulsion = createVector(0, 0);

    particles.forEach((p) => {
      const distance = p.pos.dist(this.pos);
      if (distance <= distanceToStartApplying && p !== this) {
        const acceleration = this.calcNormalizedRepulsionAcceleration(p, this);
        const multiplier = map(distance, 0, distanceToStartApplying, 3, 1);
        const appliedAcceleration = acceleration.mult(multiplier);

        repulsion.add(appliedAcceleration);
      }
    });

    return repulsion;
  }

  calculateVelocityMatchAcceleration(particles) {
    const averageVelocity = this.calculateAverageVelocity(particles);
    if (!averageVelocity) {
      return createVector(0, 0);
    }
    const acceleration = p5.Vector.div(averageVelocity, 2);

    return acceleration;
  }

  calculateAverageVelocity(particles) {
    const nearbyParticles = this.getNearbyParticles(particles);

    if (nearbyParticles.length === 0) {
      return null;
    }

    const cumulativeVelocity = createVector(0, 0);
    nearbyParticles.forEach((b) => {
      cumulativeVelocity.add(b.vel);
    });
    const averageVelocity = p5.Vector.div(
      cumulativeVelocity,
      nearbyParticles.length
    );

    return averageVelocity;
  }

  calculateAttraction(particles) {
    const avgPosition = this.calculateAveragePosition(particles);

    if (!avgPosition) {
      return createVector(0, 0);
    }

    const diffVec = p5.Vector.sub(avgPosition, this.pos);

    const acceleration = p5.Vector.div(diffVec, 10);

    return acceleration;
  }

  calculateAveragePosition(particles) {
    const nearbyParticles = this.getNearbyParticles(particles);

    if (nearbyParticles.length === 0) {
      return null;
    }

    const sumOfPositionVectors = createVector(0, 0);
    nearbyParticles.forEach((b) => {
      sumOfPositionVectors.add(b.pos);
    });
    const averagePosition = p5.Vector.div(
      sumOfPositionVectors,
      nearbyParticles.length
    );

    return averagePosition;
  }

  getNearbyParticles(particles) {
    const nearEnough = 40;

    return particles.filter((p) => {
      const distance = p.pos.dist(this.pos);
      return distance <= nearEnough && p !== this;
    });
  }
}
