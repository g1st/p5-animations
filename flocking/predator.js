function createPredators(numOfPredators) {
  const predators = new Particles();
  for (let i = 0; i < numOfPredators; i++) {
    const predator = new Predator();
    predators.add(predator);
  }
  return predators;
}

class Predator extends Particle {
  constructor() {
    super();
    this.dangerLevel = random(1, 5);
    this.hitRadius = random(40, 120);
    this.colour = color(palette.colors[1]);
  }

  draw() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    fill(this.colour);
    beginShape();
    rectMode(CENTER);
    rect(0, 0, 30, 10);
    stroke(this.colour);
    noFill();
    // circle(0, 0, this.hitRadius);
    endShape();
    pop();
  }

  update(predators, obstacles, boids) {
    const predatorsRepulsionAcceleration = this.calculateRepulsionFromNearbyParticles(
      predators
    );
    const velocityMatchAcceleration = this.calculateVelocityMatchAcceleration(
      predators
    );
    const flockCentreAcceleration = this.calculateAttraction(predators);
    const prayParticleAttraction = this.calculatePrayParticleAttraction(boids);
    const obstacleRepulsionAcceleration = this.calculateObstacleRepulsion(
      predators,
      obstacles
    );

    this.vel.add(predatorsRepulsionAcceleration);
    this.vel.add(velocityMatchAcceleration);
    this.vel.add(flockCentreAcceleration);
    this.vel.add(prayParticleAttraction);
    this.vel.add(obstacleRepulsionAcceleration.mult(3));

    this.vel.limit(4);
    this.pos.add(this.vel);

    this.handleScreenCrossing();
  }

  calculatePrayParticleAttraction(particles) {
    const distanceToStartApplying = this.hitRadius * 2;
    const attraction = createVector(0, 0);

    particles.forEach((p) => {
      const distance = p.pos.dist(this.pos);
      if (distance <= distanceToStartApplying && p !== this) {
        const acceleration = this.calcNormalizedAttractionAcceleration(p, this);
        const multiplier = map(distance, 0, distanceToStartApplying, 1, 1);
        const appliedAcceleration = acceleration.mult(multiplier);

        attraction.add(appliedAcceleration);
      }
    });

    return attraction;
  }
}
