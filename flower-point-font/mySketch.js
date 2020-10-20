'use strict';

let font;
let points;
const palette = '#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900'.split(',');
const word = window.localStorage.getItem('word') || 'Hello';

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = getFontOutlinePointsForWord(word);
  bigBubblePositions = _.sampleSize(points, Math.floor(points.length / 20));
  noLoop();
  angleMode(DEGREES);
}

const bigBubbleSizes = [6, 10, 16];
const bigBubbleColours = ['pink', 'skyblue', 'snow'];
let bigBubblePositions;

function draw() {
  background(palette[0]);
  stroke(palette[2]);
  noFill();

  for (let point of points) {
    const posX = point.x;
    const posY = point.y;

    circle(posX, posY, 2);
  }

  for (let point of bigBubblePositions) {
    drawFlower(point.x, point.y);
  }
}

function preload() {
  const fonts = [
    'Righteous-Regular.ttf',
    'IndieFlower-Regular.ttf',
    'Raleway-Regular.ttf',
  ];
  font = loadFont(random(fonts));
}

function getFontOutlinePointsForWord(word) {
  return font.textToPoints(word, 0, height / 2, 120, {
    sampleFactor: 0.25,
    simplifyThreshold: 0,
  });
}

function drawFlower(x, y) {
  const baseX = x;
  const baseY = y;
  const circleDiameter = random([4, 5, 6]);
  const bloomWidth = circleDiameter / 2;
  const bloomHeight = circleDiameter * 1.25;

  fill('red');
  noStroke();
  circle(baseX, baseY, circleDiameter);
  for (let i = 0; i < 10; i++) {
    push();
    translate(baseX, baseY);
    rotate(i * 36);
    fill('white');
    ellipse(0, 0 - circleDiameter * 1.1, bloomWidth, bloomHeight);
    pop();
  }
}

function mousePressed() {
  updateFlowers();
  redraw();
}

function updateFlowers() {
  points = getFontOutlinePointsForWord(word);
  bigBubblePositions = _.sampleSize(points, Math.floor(points.length / 20));
}

window.onload = function () {
  const input = document.querySelector('input');
  input.value = word;
  const button = document.querySelector('button');
  const form = this.document.querySelector('form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const text = input.value;
    window.localStorage.setItem('word', input.value);
    if (text.length > 0) {
      location.reload();
    }
  });
};
