// based on glyphy on https://canvas-cards.glitch.me/#glyphy-selector

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	angleMode(DEGREES);
	createPoints(6);
	noLoop();
}

const points = [];

function draw() {
	drawGlyphs(4);
}

function keyPressed() {
	drawGlyphs(4);  
}

function mouseClicked() {
	drawGlyphs(4);  
}

function drawGlyphs(numOfGlyphs) {
	for (let i = 0; i < numOfGlyphs; i++) {
		drawGlyph(width / 2, height / 4 * i + 100, 60);
	}
}

function createPoints(numOfPoints) {
	for (let i = 0; i < numOfPoints; i++) {
		let angle = (360 / numOfPoints) * i;
		let x = sin(angle);
		let y = cos(angle);
		points.push({
			x,
			y,
			angle
		});
	}
}

function getCombinations(numOfPoints) {
	const pairs = [];

	for (let i = 0; i < numOfPoints; i++) {
		pairs.push([i, (i + 1) % numOfPoints]);
		pairs.push([i, null]);
	}

	return pairs;
}

function drawGlyph(x, y, size) {
	push();
	translate(x, y);
	drawGlyphBackground(x, y, size * 1.3);

	const possibleCombinations = getCombinations(points.length);
	const numberOfLines = floor(random(points.length / 2, points.length + 1));
	const lineIndexes = shuffle(possibleCombinations).slice(0, numberOfLines);
	const center = {
		x: 0,
		y: 0
	};


	for (let [index1, index2] of lineIndexes) {
		let p1 = points[index1];
		let p2 = index2 === null ? center : points[index2];

		strokeWeight(5);
		stroke('lime');
		line(p1.x * size, p1.y * size, p2.x * size, p2.y * size);
	}
	pop();
}

function drawGlyphBackground(x, y, size) {
	beginShape();
	noStroke();
	fill(150);
	for (let p of points) {
		vertex(p.x * size, p.y * size);
	}
	endShape(CLOSE);

}