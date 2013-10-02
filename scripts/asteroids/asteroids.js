function asteroids() {
	var canvas = document.getElementById('c_logo'),
		ctx = canvas.getContext('2d'),
		planet = new Particle(500,200,10),
		asteroid = new Particle(500,200,30),
		tx,
		ty,
		level = 500,
		particles = [],
		asteroidAnim,
		start = null;

	//initialize particles
	for (var i = 0; i < level; i++) {
		tx = Math.floor(Math.random() * 1000);
		ty = Math.floor(Math.random() * 450);

		particles.push(new Particle(tx,ty,5));
	}

	canvas.addEventListener('mousemove', function(e) {
		var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        var y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		planet.x = x;
		planet.y = y;


	},false);


	function update(time) {
		var dt;
		
		//if this is the first loop, initialize starting time
		if (start === null) start = time;

		//calculate the change in time from the last call
		dt    = time - start;

		//reset the starting time
		start = time;

		//update all particles
		for (var i = 0; i < particles.length; i++) {
			particles[i].update(dt,asteroid,planet,i);

			if (particles[i].x >= canvas.width || particles[i].x <= 0) {
				particles[i].dx = -(particles[i].ddx * 0.55);
			}
			
			if (particles[i].y >= canvas.height || particles[i].y <= 0) {
				particles[i].dy = -(particles[i].ddy * 0.55);	
			}
		}

		//draw new updates
		draw();

		//continue the animation
		requestAnimFrame(update);
	}

	function draw() {
		ctx.clearRect(0,0,1000,450);

		//draw the asteroid
		ctx.beginPath();
		ctx.fillStyle = "grey";
		ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, 2*Math.PI, true);
		ctx.fill();

		//draw the planet
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.arc(planet.x, planet.y, planet.radius, 0, 2*Math.PI, true);
		ctx.fill();

		//draw the particles
		for (var i = 0; i < particles.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.arc(particles[i].x,particles[i].y,particles[i].radius,0,2*Math.PI,true);
			ctx.fill();
		}
	}

	asteroidAnim = requestAnimFrame(update);
}