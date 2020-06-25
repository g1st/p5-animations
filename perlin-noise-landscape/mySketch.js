function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	noLoop();
	strokeCap(SQUARE);
}

function draw() {
	background(100);
	drawWaves(floor(random(0, 9999)));
	info();
}

function mouseClicked() {
	background(100);
	drawWaves(floor(random(0, 9999)));
	info();
}

function info() {
	text('Mouseclick to regenerate', 0, 10);
}

function drawWaves(delta) {
	const numOfWaves = 220;
	for (let i = 0; i < numOfWaves; i++) {
		let alpha = map(i, 0, numOfWaves - 1, 0, 360);
		drawWave(0.01 * i, 4 * i, 80, alpha, delta);
	}
}

function drawWave(phase, yOffset, maxPoints, alpha, delta) {
	let prevX;
	let prevY;
	let isWater = false;
	const waveAmplitudeStart = 0;
	const waveAmplitudeEnd = 500;
	const waveAmplitude = waveAmplitudeEnd - waveAmplitudeStart;
	const waterThreshold = 0.6 // 0 - lots of water, 1 - no water
	const snowThreshold = 0.3 // 0 - no snow, 1 - lots of snow
	strokeWeight(8);

	for (let i = 0; i < maxPoints; i++) {
		const offset = delta / 100;
		const n = noise(i / 50 + offset, phase);

		let y = map(n * 10, 2, 8, waveAmplitudeStart, waveAmplitudeEnd);
		let x = map(i, 0, maxPoints - 1, 0, width);

		if (n < snowThreshold) {
			stroke(255, 255, 255, alpha);
		} else if (n > waterThreshold) {
			stroke(0, 100, 200, alpha);
		} else {
			stroke(0, 200, 100, alpha);
		}

		// not sure if this change anything/much at all
		if (y < waveAmplitudeStart) {
			y = abs(y);
		}
		if (y > waveAmplitudeEnd) {
			y = waveAmplitudeEnd * 2 - y;
		}

		if (prevX === undefined || prevY === undefined) {
			prevX = 0;
			prevY = y;
		} else {

			// last loops iteration an water line didn't complete, so do it manually
			if (isWater && i === maxPoints - 1) {
				strokeWeight(18);
				stroke(0, 100, 200, alpha);
				line(prevX, prevY + yOffset, x, prevY + yOffset);
			}

			// water starts
			else if (y > waveAmplitudeStart + waveAmplitude * waterThreshold) {
				isWater = true;
				continue; // skip the rest and don't save intermediate x and y positions
			}

			// water finish
			else if (isWater && y <= waveAmplitudeStart + waveAmplitude * waterThreshold) {
				isWater = false;
				stroke(0, 100, 200, alpha);
				line(prevX, y + yOffset, x, y + yOffset);
			} else {
				line(prevX, prevY + yOffset, x, y + yOffset);
			}
			prevX = x;
			prevY = y;
		}
	}
}