class Particle {
	constructor(x, y, size) {
		this.pos = createVector(x, y);
		this.size = size;
		this.acc = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.angle = 0;
		this.aAcc = 0;
		this.aVel = 0;
		this.shake = 0;
	}

	display() {
		const shakeVector = p5.Vector.random2D().mult(this.shake);
		push();
		fill(50, 80);
		translate(this.pos.x + shakeVector.x, this.pos.y + shakeVector.y);
		rotate(this.angle);
		rect(0, 0, this.size, this.size);
		pop();
		this.shake -= 0.2;
		if (this.shake < 0) {
			this.shake = 0;
		}
	}

	applyForce(force) {
		this.acc.add(force);
	}

	applyRotation(aForce) {
		this.aAcc += aForce;
	}

	shakeIt() {
		this.shake = 3;
	}

	hovered() {
		if (mouseX >= this.pos.x - this.size / 2 && mouseX <= this.pos.x + this.size / 2 && 
				mouseY >= this.pos.y - this.size / 2 && mouseY <= this.pos.y + this.size / 2) {
			return true;
		} else {
			return false;
		}
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.vel.mult(1.05);

		this.aVel += this.aAcc;
		this.angle += this.aVel;
	}
}