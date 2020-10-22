// built by keeping an eye on this post https://medium.com/@shvembldr/how-to-make-your-first-generative-art-with-p5-js-3f10afc07de2
// noprotect

const palettes = {
  1: '#F38A8A,#55443D,#A0CAB5,#CDE9CA,#F1EDD0',
  2: '#E8DDCB,#CDB380,#036564,#033649,#031634',
  3: '#EFEECC,#FE8B05,#FE0557,#400403,#0AABBA',
  4: '#027B7F,#FFA588,#D62957,#BF1E62,#572E4F',
  5: '#A3C68C,#879676,#6E6662,#4F364A,#340735',
  6: '#E6EBA9,#ABBB9F,#6F8B94,#706482,#703D6F',
  7: '#161616,#C94D65,#E7C049,#92B35A,#1F6764',
  8: '#6F5846,#A95A52,#E35B5D,#F18052,#FFA446',
  9: '#CCB24C,#F7D683,#FFFDC0,#FFFFFD,#457D97',
};
const borderColoursCombos = [
  ['#393D3F', '#FDFDFF'],
  ['#3F84E5', '#FF88DC'],
  ['#FF4E00', '#8EA604'],
  ['#0D3B66', '#FAF0CA'],
  ['#03F7EB', '#DB2763'],
  ['#896978', '#839791'],
  ['#231942', '#5E548E'],
  ['#B07156', '#AB4E68'],
  ['#FFFFFF', '#6B7D7D'],
];
let colours;
let borderColours;
const corners = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  changeColours(int(random(1, 9)));
  background('#033649');
  noLoop();
}

function changeColours(index) {
  colours = palettes[index].split(',');
}

function draw() {
  background(0);
  borderColours = random(borderColoursCombos);
  translate(width / 2, height / 2);
  rotate(45);
  const gridCellSize = 400;
  let numOfSpikes = int(random(10, 40));
  numOfSpikes % 2 === 0 ? null : numOfSpikes++;
  const cellsOnInnerGridSide = int(random(4, 10));

  for (let col = -2; col <= 2; col++) {
    for (let row = -2; row <= 2; row++) {
      push();
      translate(col * gridCellSize * 1.41, row * gridCellSize * 1.41);
      drawGridCell(gridCellSize, numOfSpikes, cellsOnInnerGridSide);
      pop();
    }
  }
}

function drawGridCell(size, numOfSpikes, cellsOnTheSide) {
  createSpikeRect(size, numOfSpikes);
  createInnerGrid(size, cellsOnTheSide);
}

function createInnerGrid(diameter, cellsOnTheSide) {
  const gridSize = diameter * 1.3;
  const cellLength = gridSize / cellsOnTheSide;
  const firstPoint = -gridSize / 2 + cellLength / 2;
  for (let col = 0; col < cellsOnTheSide; col++) {
    for (let row = 0; row < cellsOnTheSide; row++) {
      const x = firstPoint + col * cellLength;
      const y = firstPoint + row * cellLength;
      if (col % 2 !== 0 && row % 2 !== 0) {
        drawSquareCell(x, y, cellLength);
      } else {
        drawCircleCell(x, y, cellLength);
      }
    }
  }
}

function drawSquareCell(x, y, size) {
  drawRect(x, y, size);
  drawSmallRect(x, y, size);
  drawSmallDot(x, y, size);
}

function drawRect(x, y, size) {
  fill(getRandomColour());
  rect(x, y, size, size);
}

function drawSmallRect(x, y, size) {
  noStroke();
  fill(getRandomColour());
  rect(x + size * 0.065, y + size * 0.065, size * 0.3);

  fill(getRandomColour());
  rect(x, y, size * 0.3);
}

function drawSmallDot(x, y, size) {
  fill(getRandomColour());
  circle(x, y, size * 0.05);
}

function drawCircleCell(x, y, size) {
  drawTriangles(x, y, size / 2);
  drawBigCircle(x, y, size);
  drawCross(x, y, size / 2);
  drawTearDrop(x, y, size);
}

function drawTearDrop(x, y, size) {
  push();
  translate(x, y);
  rotate(random([45, 135, 225, 315]));
  fill(getRandomColour());
  circle(size * 0.12, 0, size * 0.15);
  pop();
}

function drawCross(x, y, half) {
  strokeWeight(2);

  // horizontal
  stroke(getRandomColour());
  line(x - half, y, x + half, y);

  // vertical
  stroke(getRandomColour());
  line(x, y - half, x, y + half);

  // small circle in the centre
  noStroke();
  fill(getRandomColour());
  circle(x, y, half / 5);
}

function drawBigCircle(x, y, size) {
  noStroke();
  fill(getRandomColour());
  circle(x, y, size * 0.8);
}

function drawTriangles(x, y, half) {
  const left = x - half;
  const right = x + half;
  const up = y - half;
  const down = y + half;

  noStroke();
  fill(colours[0]);
  triangle(left, up, left, down, x, y);
  fill(colours[4]);
  triangle(left, up, right, up, x, y);
  fill(colours[2]);
  triangle(left, down, right, down, x, y);
  fill(colours[3]);
  triangle(right, up, right, down, x, y);
}

function createSpikeRect(diameter, numOfSpikes) {
  noStroke();
  for (let angle = 45; angle <= 360; angle += 360 / 4) {
    const x = diameter * cos(angle);
    const y = diameter * sin(angle);
    corners.push(createVector(x, y));
  }

  for (let i = 0; i < corners.length; i++) {
    const firstPos = corners[i];
    const secondPos = corners[(i + 1) % corners.length];

    for (let i = 0; i < numOfSpikes; i++) {
      beginShape();
      const frac = i / numOfSpikes;
      const newPos = p5.Vector.lerp(firstPos, secondPos, frac);
      vertex(newPos.x, newPos.y);
      vertex(secondPos.x, secondPos.y);
      vertex(secondPos.x, secondPos.y);
      vertex(0, 0);

      fill(borderColours[0]);
      if (i % 2 === 0) {
        fill(borderColours[1]);
      }
      endShape(CLOSE);
    }
  }
}

function getRandomColour() {
  return colours[int(random(colours.length))];
}

function keyPressed() {
  if (palettes.hasOwnProperty(key)) {
    changeColours(key);
    redraw();
  }
}

function mouseClicked() {
  changeColours(int(random(1, 10)));
  redraw();
}
