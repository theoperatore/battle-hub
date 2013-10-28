window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

window.cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame       ||
		   window.webkitCancelAnimationFrame ||
		   window.mozCancelAnimationFrame
})();

window.addEventListener('load', function(ev) {
	var //spd = new Spiral(),
		//canvas_spiral = document.getElementById('demo_spiral'),
		asd = new Asteroids(),
		canvas_asteroid = document.getElementById('demo_asteroids');
/*
	canvas_spiral.addEventListener('mouseenter',function(ev) {
		spd.engage(true);
	}, false);

	canvas_spiral.addEventListener('mouseleave', function(ev) {
		spd.engage(false);
	}, false);
*/
	canvas_asteroid.addEventListener('mouseenter',function(ev) {
		asd.engage(true);
	}, false);

	canvas_asteroid.addEventListener('mouseleave', function(ev) {
		asd.engage(false);
	}, false);

	polar();



}, false);