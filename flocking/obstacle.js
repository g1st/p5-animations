function addObstacle(pos) {
	const obstacle = {
		pos,
		r: random(20, 60),
		alpha: 0 
	}
	gObstacles.push(obstacle);
}

function removeObstacle(clickPos, obstacles) {
	const obstaclesToDisplay = obstacles.filter((obstacle) => {
		return p5.Vector.dist(clickPos, obstacle.pos) >= obstacle.r
	});
	gObstacles = obstaclesToDisplay;
}

function drawObstacle(obstacle, boids, predators) {
	const alpha = calcNewObstacleAlpha(obstacle, boids, predators);
	stroke(0);
	fill(0, 0, 0, alpha);
	circle(obstacle.pos.x, obstacle.pos.y, obstacle.r * 2);
}

function drawObstacles(obstacles, boids, predators) {
	if (obstacles.length === 0) return;
	obstacles.forEach(o => drawObstacle(o, boids, predators));
}

function clickInsideObstacle(clickPos, obstacles) {
	return obstacles.some((obstacle) => p5.Vector.dist(clickPos, obstacle.pos) <= obstacle.r);
}

function calcCloseByParticles(obstacle, boids, predators) {
	const allParticles = [...boids, ...predators];

	return allParticles.filter(p => dist(obstacle.pos.x, obstacle.pos.y, p.pos.x, p.pos.y) <= obstacle.r).length;
}

function calcNewObstacleAlpha(obstacle, boids, predators) {
	const numOfCloseByParticles = calcCloseByParticles(obstacle, boids, predators);
	const allParticlesLength = boids.length + predators.length;

	const alpha = map(numOfCloseByParticles, 0, allParticlesLength / 10, 0, 255);
	return alpha;
}