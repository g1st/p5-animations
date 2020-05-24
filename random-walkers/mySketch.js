let walkers = [];
const colours = '#EA7542,#EF9032,#EFB332,#EF5632,#EF6C4E,#EA7542,#EF9032,#EFB332,#4A4C56,#3A4218,#F8F7F8,#BAE703,#BAB6B7,#4A4C56,#3A4218,#F8F7F8'.split(
  ','
);
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  reset();
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].display();
    walkers[i].move();
  }

  if (counter > 800) {
    noLoop();
  }
  counter++;
}

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.color = random(colours);
  }

  display() {
    stroke(this.color);
    line(this.x, this.y, this.prevX, this.prevY);
    fill(this.color);
    ellipse(this.x, this.y, 6);
  }

  move() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = this.x + random([-1, 1]) * random(5, 40);
    this.y = this.y + random([-1, 1]) * random(5, 40);
  }
}

function reset() {
  counter = 0;
  walkers = [];
  for (let i = 0; i < 10; i++) {
    let bubble = new Walker(random(0, width), random(0, height));
    walkers.push(bubble);
  }
  background(0);
  loop();
}

function mousePressed() {
  reset();
}
