// based on https://inconvergent-sandbox.glitch.me/distort.html
// palette from https://www.colourlovers.com/palette/301154/Influenza
const palette = '#300030,#480048,#601848,#C04848,#F07241'.split(',');
const points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createGridPoints(30);
  strokeWeight(0.5);
}

function draw() {
  background(palette[4]);
  drawLinesBetweenPoints(points, 60);
  distort(40);
}

function createGridPoints(gap) {
  const numOfPointsX = floor(width / gap) + 1;
  const numOfPointsY = floor(height / gap) + 2;
  for (let i = 0; i < numOfPointsX; i++) {
    let row = [];
    for (let j = 0; j < numOfPointsY; j++) {
      row.push({
        x: i * gap,
        y: j * gap,
      });
    }
    points.push(row);
  }
}

function drawLinesBetweenPoints(points, disconnectDistance) {
  stroke(palette[0]);
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = 0; j < points[i].length - 1; j++) {
      if (
        dist(
          points[i + 1][j].x,
          points[i + 1][j].y,
          points[i + 1][j + 1].x,
          points[i + 1][j + 1].y
        ) < disconnectDistance &&
        i + 1 < points.length - 1
      ) {
        line(
          points[i + 1][j].x,
          points[i + 1][j].y,
          points[i + 1][j + 1].x,
          points[i + 1][j + 1].y
        );
      }
      if (
        dist(
          points[i][j + 1].x,
          points[i][j + 1].y,
          points[i + 1][j + 1].x,
          points[i + 1][j + 1].y
        ) < disconnectDistance &&
        j + 1 < points.length - 1
      ) {
        line(
          points[i][j + 1].x,
          points[i][j + 1].y,
          points[i + 1][j + 1].x,
          points[i + 1][j + 1].y
        );
      }
    }
  }
}

function distort(distance) {
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {
      if (dist(mouseX, mouseY, points[i][j].x, points[i][j].y) < distance) {
        points[i][j].x += random(-4, 4);
        points[i][j].y += random(-4, 4);
      }
    }
  }
}
