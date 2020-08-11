// https://www.happyhues.co/palettes/17

const palette = {
  background: '#fef6e4',
  colors: ['#f3d2c1', '#8bd3dd', '#f582ae'],
  stroke: '#001858',
};
const centers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(palette.background);
  noLoop();
  noStroke();
  addCenters();
}

function draw() {
  const stepSize = width / 200;
  for (let x = 0; x < 200; x++) {
    for (let y = 0; y < 200; y++) {
      const [c1, c2] = getTwoNearestCircles(x, y);

      let distance = abs(c1.distance - c2.distance);
      if (distance < 1) {
        fill(palette.stroke);
      } else {
        stroke(c1.circle.color);
        fill(c1.circle.color);
      }

      square(x * stepSize, y * stepSize, stepSize);
    }
  }
}

function addCenters() {
  centers.length = 0;
  for (let i = 0; i < 20; i++) {
    centers.push({
      pos: createVector(random(200), random(200)),
      color: random(palette.colors),
    });
  }
}

function getClosestCircle(x, y) {
  let closestDistance = 99999;
  let closestCircle;
  for (let c of centers) {
    let distance = dist(x, y, c.pos.x, c.pos.y);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCircle = c;
    }
  }
  return closestCircle;
}

function getTwoNearestCircles(x, y) {
  const distances = [];
  for (let c of centers) {
    let distance = dist(x, y, c.pos.x, c.pos.y);
    distances.push({
      distance,
      circle: c,
    });
  }

  distances.sort((a, b) => a.distance - b.distance);

  return distances.slice(0, 2);
}

function mouseClicked() {
  background(palette.background);
  addCenters();
  redraw();
}
