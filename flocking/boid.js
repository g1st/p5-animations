function createBoids(numOfBoids) {
  const boids = new Particles();
  for (let i = 0; i < numOfBoids; i++) {
    const boid = new Boid();
    boids.add(boid);
  }
  return boids;
}

class Boid extends Particle {
  constructor() {
    super();
    this.repelAccelerationForDisplay = null;
    this.velocityMatchAccelerationForDisplay = null;
    this.flockCentreAccelerationForDisplay = null;
    this.obstacleRepulsionAccelerationForDisplay = null;
  }

  update(boids, obstacles, predators) {
    const boidsRepulsionAcceleration = this.calculateRepulsionFromNearbyParticles(
      boids
    );
    const obstacleRepulsionAcceleration = this.calculateObstacleRepulsion(
      boids,
      obstacles
    );
    const velocityMatchAcceleration = this.calculateVelocityMatchAcceleration(
      boids
    );
    const flockCentreAcceleration = this.calculateAttraction(boids);
    const predatorRepulsionAcceleration = this.calculatePredatorRepulsion(
      predators
    );

    this.repelAccelerationForDisplay = boidsRepulsionAcceleration;
    this.velocityMatchAccelerationForDisplay = velocityMatchAcceleration;
    this.flockCentreAccelerationForDisplay = flockCentreAcceleration;
    this.obstacleRepulsionAccelerationForDisplay = obstacleRepulsionAcceleration;

    this.vel.add(obstacleRepulsionAcceleration);
    this.vel.add(boidsRepulsionAcceleration);
    this.vel.add(velocityMatchAcceleration);
    this.vel.add(flockCentreAcceleration);
    this.vel.add(predatorRepulsionAcceleration);

    this.vel.limit(3);
    this.vel.mult(0.995);
    this.pos.add(this.vel);

    this.handleScreenCrossing();
  }

  calculatePredatorRepulsion(predators) {
    const predatorRepulsion = createVector(0, 0);

    predators.forEach((predator) => {
      const distance = this.pos.dist(predator.pos);
      if (distance <= predator.hitRadius) {
        const acceleration = this.calcNormalizedRepulsionAcceleration(
          predator,
          this
        );
        const multiplier = map(
          distance,
          0,
          predator.hitRadius * 1.5,
          predator.dangerLevel,
          0
        );
        const appliedAcceleration = acceleration.mult(multiplier);

        predatorRepulsion.add(appliedAcceleration);
      }
    });

    return predatorRepulsion;
  }

  drawAcceleration() {
    if (mouseIsPressed) {
      // debugger;
    }
    const multFactor = 5;

    push();

    translate(this.pos.x, this.pos.y);

    const repelVec = this.repelAccelerationForDisplay.copy().mult(multFactor);
    const velMatchAccVec = this.velocityMatchAccelerationForDisplay
      .copy()
      .mult(multFactor);
    const flockCentreAccVec = this.flockCentreAccelerationForDisplay
      .copy()
      .mult(multFactor);
    const obstacleRepelVec = this.obstacleRepulsionAccelerationForDisplay
      .copy()
      .mult(multFactor * 3);

    stroke('blue');
    line(0, 0, repelVec.x, repelVec.y);

    stroke('red');
    line(0, 0, velMatchAccVec.x, velMatchAccVec.y);

    stroke('green');
    line(0, 0, flockCentreAccVec.x, flockCentreAccVec.y);

    stroke(255);
    line(0, 0, obstacleRepelVec.x, obstacleRepelVec.y);

    pop();
  }
}
