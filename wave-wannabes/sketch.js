let sineWave;
let perlinWave;
let amplitudeSlider;
let velocitySlider;
let offsetSlider;
let aP, oP;

function setup() {
  createCanvas(windowWidth, 420);
  sineWave = new Wave(10, width * 0.45, 0.2, 20);
  perlinWave = new Wave(width * 0.55, width - 10, 0.2, 20, 0.005);
  infoP = createP('Press "l" for line, "c" for circles');
  aP = createP();
  amplitudeSlider = createSlider(0, 180, 40);
  createDiv();
  vP = createP();
  velocitySlider = createSlider(0, 0.4, 0.2, 0.001);
  createDiv();
  oP = createP();
  offsetSlider = createSlider(0, 0.03, 0.005, 0.001);
  amplitudeSlider.style('width', '300px');
  velocitySlider.style('width', '300px');
  offsetSlider.style('width', '300px');
}

function draw() {
  background(255);
  displayInfo();
  applySliderChanges();
  sineWave.sine();
  perlinWave.perlin();
}

function applySliderChanges() {
  sineWave.amplitude = amplitudeSlider.value();
  perlinWave.amplitude = amplitudeSlider.value();
  sineWave.angleVel = velocitySlider.value();
  perlinWave.offsetChange = offsetSlider.value();
  perlinWave.angleVel = velocitySlider.value();
}

function displayInfo() {
  aP.html(`Amplitude: ${amplitudeSlider.value()}px`);
  vP.html(`Angular velocity for sine (left): ${velocitySlider.value()}`);
  oP.html(`Offset change for Perlin's noise (right): ${offsetSlider.value()}`);
}

class Wave {
  constructor(
    start,
    end,
    angularVelocity,
    amplitude,
    offsetChange,
    balls = true
  ) {
    this.angleVel = angularVelocity;
    this.startAngle = 0;
    this.xOff = 0;
    this.offsetChange = offsetChange;
    this.start = start;
    this.end = end;
    this.amplitude = amplitude;
    this.balls = balls;
  }

  sine() {
    this.angle = this.startAngle;
    this.startAngle += 0.02;

    beginShape();
    for (let x = this.start; x <= this.end; x += 10) {
      let y = map(
        sin(this.angle),
        -1,
        1,
        height / 2 + this.amplitude,
        height / 2 - this.amplitude
      );
      stroke(0);
      fill(0, 50);
      if (this.balls) {
        ellipse(x, y, 48, 48);
      } else {
        noFill();
        curveVertex(x, y);
      }
      this.angle += this.angleVel;
    }
    endShape();
  }

  perlin() {
    this.xOff += this.offsetChange;
    beginShape();
    for (let x = this.start; x <= this.end; x += 10) {
      let y = map(
        noise(this.xOff + x),
        0,
        1,
        height / 2 + this.amplitude,
        height / 2 - this.amplitude
      );
      stroke(0);
      fill(0, 50);
      if (this.balls) {
        ellipse(x, y, 48, 48);
      } else {
        noFill();
        curveVertex(x, y);
      }
    }
    endShape();
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    sineWave.balls = true;
    perlinWave.balls = true;
  }
  if (key === 'l' || key === 'L') {
    sineWave.balls = false;
    perlinWave.balls = false;
  }
}
