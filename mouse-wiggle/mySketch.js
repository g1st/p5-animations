let bubbles = [];
const colours = '#EA7542,#EF9032,#EFB332,#EF5632,#EF6C4E,#EA7542,#EF9032,#EFB332,#4A4C56,#3A4218,#F8F7F8,#BAE703,#BAB6B7,#4A4C56,#3A4218,#F8F7F8'.split(
  ','
);
let bg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = random(colours);
  background(bg);
  for (let i = 0; i < 1; i++) {
    let bubble = new Baubble(mouseX, mouseY);
    bubbles.push(bubble);
  }
}

function draw() {
  background(bg);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].update();
  }

  if (frameCount > 5000) {
    noLoop();
  }
}

class Baubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.prevPositions = [
      {
        x,
        y,
      },
    ];
    this.color = random(colours);
  }

  display() {
    fill(this.color);
    for (let p of this.prevPositions) {
      circle(p.x, p.y, random(5, 15));
    }
  }

  update() {
    this.prevPositions.push({
      x: this.x,
      y: this.y,
    });

    this.x = mouseX;
    this.y = mouseY;

    for (let p of this.prevPositions) {
      p.x += random([-1, 1]);
      p.y += random([-1, 1]);
    }
  }
}

function mousePressed() {
  for (let bubble of bubbles) {
    bubble.prevPositions = [];
  }
  bg = random(colours);
}
