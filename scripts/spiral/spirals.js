var Spiral = function() {
	var canvas = document.getElementById('demo_spiral'),
		ctx    = canvas.getContext('2d'),
		anim,
		particles = [],
		num    = 200,
		startAngle   = 0,
		particleDist = 500,
		sp = this;

	this.go = false;


	//initialize particles
	for (var i = 0; i < num; i++) {

		particles.push(new Particle((canvas.width / 2),(canvas.height / 2),5));
	}

	function update(time) {

		if (sp.go) {
			for (var i = 0; i < particles.length; i++) {
				var radius = particleDist * i / particles.length;
				var theta  = startAngle * i;

				var x = (canvas.width / 2) + radius * Math.sin(theta);
				var y = (canvas.height / 2) + radius * Math.cos(theta);

				particles[i].x = x;
				particles[i].y = y;
			}

			//makes each particle move along path
			startAngle += 0.00035;

		}

		draw();
		anim = requestAnimFrame(update,canvas);
	}

	function draw() {
		ctx.clearRect(0,0,950,450);
		for (var i = 0; i < particles.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = (i === 0 || i === 50 || i === 100 || i === 150 || i === 199)? "red" : "blue";
			ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, 2*Math.PI, false);
			ctx.fill();
		}
	}

	anim = requestAnimFrame(update,canvas);
}

Spiral.prototype.engage = function(bool) {
	this.go = bool;
};