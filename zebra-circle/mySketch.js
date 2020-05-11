function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	noLoop();
	noStroke();
}

function draw() {
	drawArcs(300);
	
	// black circles in the middle
	fill(0);
	circle(width / 2 - 30, height / 2 + 20, 60);
	circle(width / 2 + 45, height / 2 - 40, 140);
}

function drawArcs(numOfArcs) {
	const circleDiameter = 400;
	for (let i = 0; i < numOfArcs; i++) {
		if (i % 2 === 0) {
			fill(0);
		} else {
			fill(255);
		}
		arc(width / 2, height / 2, circleDiameter, circleDiameter,
				TWO_PI / numOfArcs * i, TWO_PI / numOfArcs * i + (TWO_PI / numOfArcs));
	}
}