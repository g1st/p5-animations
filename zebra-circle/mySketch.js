function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noLoop();
  noStroke();
}

const smallInnerCircle =
  window.innerWidth < 1200 ? window.innerWidth * 0.08 : 96;
const bigInnerCircle =
  window.innerWidth < 1200 ? window.innerWidth * 0.18 : 216;

function draw() {
  drawArcs(300);

  // black circles in the middle
  fill(0);
  circle(
    width / 2 - smallInnerCircle / 2,
    height / 2 + smallInnerCircle / 2,
    smallInnerCircle
  );
  circle(
    width / 2 + bigInnerCircle / 3.2,
    height / 2 - bigInnerCircle / 4.5,
    bigInnerCircle
  );
}

function drawArcs(numOfArcs) {
  const smallerDimension = width > height ? height : width;
  const circleDiameter = smallerDimension * 0.9;
  for (let i = 0; i < numOfArcs; i++) {
    if (i % 2 === 0) {
      fill(0);
    } else {
      fill(255);
    }
    arc(
      width / 2,
      height / 2,
      circleDiameter,
      circleDiameter,
      (TWO_PI / numOfArcs) * i,
      (TWO_PI / numOfArcs) * i + TWO_PI / numOfArcs
    );
  }
}
