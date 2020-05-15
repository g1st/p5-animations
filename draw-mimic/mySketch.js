function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(HSB, 360, 100, 100);
  noLoop();
}

const arrayOfPositions = [];
const timers = [];
let timer;
let message = 'Drag mouse/touch sceen to draw!';
let lineColor;

function draw() {
  if (message) {
    textSize(width * 0.06);

    fill(randomBrightColor());
    text(message, 10, height / 2);
  }
}

function mousePressed() {
  background(0);
  message = null;
  timers.forEach((timer) => clearTimeout(timer));
  arrayOfPositions.length = 0;
  lineColor = randomBrightColor();
}

function mouseDragged() {
  stroke(lineColor);
  strokeWeight(3);

  if (arrayOfPositions.length > 0) {
    line(
      mouseX,
      mouseY,
      arrayOfPositions[arrayOfPositions.length - 1].x,
      arrayOfPositions[arrayOfPositions.length - 1].y
    );
  }

  const coordinates = {
    x: mouseX,
    y: mouseY,
    timeStamp: Date.now(),
  };

  // need to record time between each point drawn
  arrayOfPositions.push(coordinates);
}

function mouseReleased() {
  background(0);

  // user just clicked once on the canvas (no dragging event)
  if (arrayOfPositions.length < 1) return;

  const firstTimeStamp = arrayOfPositions[0].timeStamp;

  let prevPosition = null;
  stroke(randomBrightColor());
  strokeWeight(6);

  // gesture by the arryOfPositions
  for (let position of arrayOfPositions) {
    timer = setTimeout(function () {
      if (prevPosition) {
        line(prevPosition.x, prevPosition.y, position.x, position.y);
      }
      prevPosition = position;
    }, position.timeStamp - firstTimeStamp);

    timers.push(timer);
  }
}

function randomBrightColor() {
  return color(random(360), random(40, 60), 100);
}
