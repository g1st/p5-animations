'use strict';
const particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  const numOfParticles = ceil(max(windowWidth, windowHeight) / 90);
  for (let i = 0; i < numOfParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

const Particle = function (x, y) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D().mult(random(0.2, 0.5));

  this.trail = [];
};

function showParticle(particle) {
  fill(200, 60);
  const diameter = map(particle.vel.mag(), 0.2, 1, 10, 3);
  circle(particle.pos.x, particle.pos.y, diameter);

  particle.trail.forEach((t, index) => {
    circle(t.x, t.y, 0.6 * index);
  });
}

function moveParticle(particle) {
  particle.trail.push(particle.pos.copy());
  particle.vel.limit(6);
  if (particle.trail.length > 30) {
    particle.trail.shift();
  }

  particle.pos.add(particle.vel);

  const gravity = createVector(0, 0.02);
  particle.vel.add(gravity);
  checkEdges(particle);
}

function checkEdges(particle) {
  const horizontal = createVector(0, 1);
  const vertical = createVector(1, 0);

  if (particle.pos.x > width) {
    particle.pos.x = width - 1;
    particle.vel.mult(0.95);
    particle.vel.reflect(vertical);
  }
  if (particle.pos.x < 0) {
    particle.pos.x = 1;
    particle.vel.mult(0.95);
    particle.vel.reflect(vertical);
  }
  if (particle.pos.y > height) {
    particle.pos.y = height - 1;
    particle.vel.mult(0.95);
    particle.vel.reflect(horizontal);
  }
  if (particle.pos.y < 0) {
    particle.pos.y = 1;
    particle.vel.mult(0.95);
    particle.vel.reflect(horizontal);
  }
}

function checkDistanceSquared(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}

function draw() {
  background(50);
  noStroke();

  for (let p of particles) {
    showParticle(p);
    moveParticle(p);
  }

  for (let p of particles) {
    let numConnectionDrawn = 0;
    for (let particle of particles) {
      if (numConnectionDrawn > 1) {
        break;
      }
      let distance = checkDistanceSquared(p.pos, particle.pos);
      if (distance < 10000 && distance > 1) {
        numConnectionDrawn++;
        const randomForce = p5.Vector.random2D().mult(random(2));
        p.vel.add(randomForce);

        stroke(220, 80);
        sketchyLine(p.pos.x, p.pos.y, particle.pos.x, particle.pos.y, 3);
      }
    }
  }
}
