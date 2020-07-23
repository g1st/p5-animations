let walkers = [];
// https://github.com/kgolid/chromotome/blob/master/palettes
const palette = {
  name: 'cc239',
  colors: ['#e3dd34', '#78496b', '#f0527f', '#a7e0e2'],
  background: '#e0eff0',
};

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();

  background(palette.background);
  createWalkers(1);
  noStroke();
}

function draw() {
  background(palette.background);
  lights();
  directionalLight(10, 20, 20, createVector(0, 0, -1));

  for (let w of walkers) {
    blendMode(BLEND);
    drawWalker(w, 0.5);
    blendMode(SCREEN);
    drawWalker(w);

    addNextRandomBox(w);
  }
}

function addNextRandomBox(w) {
  const totalPositions = w.positions.length;
  const { x, y, z } = w.positions[totalPositions - 1];

  const step = 30;
  const nextX = x + random(-step, step);
  const nextY = y + random(-step, step);
  const nextZ = z + random(-step, step);
  if (totalPositions < 300) {
    w.positions.push({
      x: nextX,
      y: nextY,
      z: nextZ,
    });
  }
  if (totalPositions >= 300) {
    w.positions.shift();
  }
}

function drawWalker(walker, scaling = 1) {
  for (let p of walker.positions) {
    push();

    rotateX(walker.rotation);
    rotateY(walker.rotation);
    rotateZ(walker.rotation);
    translate(p.x, p.y, p.z);

    // check distance from the center point
    const distance = dist(0, 0, 0, p.x, p.y, p.z);

    // first 360px all colours from HSB circle, then repeat
    colorMode(HSB);
    fill(distance % 360, 60, 100, 0.8);

    box(
      walker.width * scaling,
      walker.height * scaling,
      walker.depth * scaling
    );
    pop();
  }
}

function createWalkers(numOfWalkers) {
  for (let i = 0; i < numOfWalkers; i++) {
    const walker = {
      width: random(20, 50),
      height: random(20, 50),
      depth: random(20, 50),
      rotation: random(0, TWO_PI),
      positions: [
        {
          x: 0,
          y: 0,
          z: 0,
        },
      ],
    };

    walkers.push(walker);
  }
}
