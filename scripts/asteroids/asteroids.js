function asteroids() {
	var canvas = document.getElementById('c_logo'),
		planet = new Particle(500,200,10),
		asteroid = new Particle(500,200,30),
		tx,
		ty,
		level = 250,
		particles = [],
		asteroidAnim;

	//initialize particles
	for (var i = 0; i < level; i++) {
		tx = Math.floor(Math.random() * 1000);
		ty = Math.floor(Math.random() * 400);

		particles.push(new Particle(tx,ty,7));
	}

	function update(time) {
		

		draw();
		requestAnimFrame(update);
	}

	function draw() {
		
	}

	asteroidAnim = requestAnimFrame(update);
}