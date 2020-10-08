'use strict';

// DIAGRAMS
// https://excalidraw.com/#json=4897715464962048,aeDNRUh44BedgnwfliFrhg
// https://excalidraw.com/#json=4916868737400832,K7Vihfsb9K7D69_BsKPnJg

let gBoids;
let gPredators;
let gObstacles = [];
let gShouldDrawAcceleration = false;
let numOfBoids = 75;
let numOfPredators = 6;
let boidsSlider;
let boidsP;
let predatorsSlider;
let predatorsP;

function setup() {
  let w = min(windowWidth, 800);
  let h = min(windowHeight, 600);
  createCanvas(w, h);
  gBoids = createBoids(numOfBoids);
  gPredators = createPredators(numOfPredators);
  addBoidsSlider();
  addPredatorsSlider();

  frameRate(60);
}

function addBoidsSlider() {
  boidsP = createP();
  boidsP.addClass('sliderInfo');
  boidsSlider = createSlider(0, 200, numOfBoids, 1);
  boidsSlider.position(10, 635);
  boidsSlider.style('width', '300px');
  boidsP.html(`Runners: ${numOfBoids}`);
}

function addPredatorsSlider() {
  predatorsP = createP();
  predatorsP.addClass('sliderInfo');
  predatorsSlider = createSlider(0, 50, numOfPredators, 1);
  predatorsSlider.position(10, 685);
  predatorsSlider.style('width', '300px');
  predatorsP.html(`Chasers: ${numOfPredators}`);
}

function draw() {
  background(palette.background);
  applySliderChanges();

  gBoids.update(gObstacles, gPredators.particles);
  gPredators.update(gObstacles, gBoids.particles);

  gBoids.draw();
  gPredators.draw();

  drawObstacles(gObstacles, gBoids.particles, gPredators.particles);
}

function applySliderChanges() {
  const newBoidsValue = boidsSlider.value();
  const newPredatorsValue = predatorsSlider.value();
  if (newBoidsValue !== numOfBoids) {
    numOfBoids = newBoidsValue;
    boidsP.html(`Runners: ${numOfBoids}`);
  }
  if (newPredatorsValue !== numOfPredators) {
    numOfPredators = newPredatorsValue;
    predatorsP.html(`Chasers: ${numOfPredators}`);
  }
  handleParticlesChange(gBoids, numOfBoids, 'boid');
  handleParticlesChange(gPredators, numOfPredators, 'predator');
}

function handleParticlesChange(particles, newNumber, type) {
  const currentParticleNumber = particles.size;
  if (currentParticleNumber === newNumber) {
    return;
  } else if (currentParticleNumber < newNumber) {
    const particle = type === 'predator' ? new Predator() : new Boid();
    particles.add(particle);
  } else {
    const numToRemove = currentParticleNumber - newNumber;
    particles.remove(numToRemove);
  }
}

function keyPressed() {
  if (key === 'd') {
    gShouldDrawAcceleration = !gShouldDrawAcceleration;
  }
}
function mousePressed() {
  const mousePos = createVector(mouseX, mouseY);
  if (clickInsideObstacle(mousePos, gObstacles)) {
    removeObstacle(mousePos, gObstacles);
  } else {
    addObstacle(mousePos);
  }
}
