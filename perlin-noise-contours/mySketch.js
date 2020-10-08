// noprotect
// based on https://jacobjoaquin.tumblr.com/post/188120374046/jacobjoaquin-volumetric-noise-20190225

p5.disableFriendlyErrors = true;

const palette = {
  background: '#004643',
  main: '#e8e4e6',
  secondary: '#abd1c6',
  tertiary: '#e16162',
};
const settings = {
  layers: 8,
  gridSize: 40,
  detail: 1 / 100,
  zChangePerFrame: 1 / 50,
  zOffset: 0.06,
};

function setup() {
  createCanvas(600, 600);
  noSmooth();
  background(palette.background);
}

function draw() {
  background(palette.background);
  translate(300, 300);

  for (i = 0; i < settings.layers; i++) {
    makeNoiseLayer(i * settings.zOffset);
    translate(0, -30);
  }
}

function pad(numN) {
  if (numN < 10) {
    return `0${numN}`;
  }
  return `${numN}`;
}

function makeNoiseLayer(zOffset) {
  noStroke();
  const sF = width / settings.gridSize / 3;
  strokeWeight(sF);

  for (let x = 0; x < settings.gridSize; x++) {
    for (let y = 0; y < settings.gridSize; y++) {
      let zoomedX = x * sF;
      let zoomedY = y * sF;
      // isoX
      let pixelX = zoomedX - zoomedY;
      // isoY
      let pixelY = (zoomedX + zoomedY) / 2;

      if (
        x === 0 ||
        x === settings.gridSize - 1 ||
        y === 0 ||
        y === settings.gridSize - 1
      ) {
        stroke(0);
        point(pixelX, pixelY, sF);
      } else {
        let perlinNoise = noise(
          x * settings.detail,
          y * settings.detail,
          frameCount * settings.zChangePerFrame + zOffset
        );

        if (between(perlinNoise, 0.4, 0.5)) {
          stroke(palette.tertiary);
          point(pixelX, pixelY, sF);
        } else if (between(perlinNoise, 0.6, 0.7)) {
          stroke(palette.secondary);
          point(pixelX, pixelY, sF);
        } else if (
          between(perlinNoise, 0.398, 0.4) ||
          between(perlinNoise, 0.5, 0.502) ||
          between(perlinNoise, 0.596, 0.6) ||
          between(perlinNoise, 0.7, 0.704)
        ) {
          stroke(0);
          point(pixelX, pixelY, sF);
        }
      }
    }
  }
}

function between(value, minimum, maximum) {
  return value > minimum && value < maximum;
}

function keyPressed() {
  if (presets.hasOwnProperty(key)) {
    applyPreset(presets[key]);
  }
}

function applyPreset(presetSettings) {
  for (let setting in presetSettings) {
    if (settings.hasOwnProperty(setting)) {
      settings[setting] = presetSettings[setting];
    }
  }
}
