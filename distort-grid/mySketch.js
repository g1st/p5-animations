// based on https://inconvergent-sandbox.glitch.me/distort.html

const points = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(220);
	createGridPoints(40, 20);
	strokeWeight(0.5);
}

function draw() {
	background(220);
	drawLinesBetweenPoints(points, 40);
	distort(40);
}

function createGridPoints(numOfPoints, gap) {
	for (let i = 2; i < numOfPoints; i++) {
		let row = [];
		for (let j = 2; j < numOfPoints; j++) {
			row.push({
				y: i * gap,
				x: j * gap
			});
		}
		points.push(row);
	}
}

function drawLinesBetweenPoints(points, disconnectDistance) {
	for (let i = 0; i < points.length - 1; i++) {
		for (let j = 0; j < points[i].length - 1; j++) {
			if (dist(points[i + 1][j].x, points[i + 1][j].y, points[i + 1][j + 1].x, points[i + 1][j + 1].y) < disconnectDistance && i + 1 < points.length - 1) {
				line(points[i + 1][j].x, points[i + 1][j].y, points[i + 1][j + 1].x, points[i + 1][j + 1].y);
			}
			if (dist(points[i][j + 1].x, points[i][j + 1].y, points[i + 1][j + 1].x, points[i + 1][j + 1].y) < disconnectDistance && j + 1 < points.length - 1) {
				line(points[i][j + 1].x, points[i][j + 1].y, points[i + 1][j + 1].x, points[i + 1][j + 1].y);
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
