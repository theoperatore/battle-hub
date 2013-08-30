window.requestAnimFrame = (function() {
	return  window.requestAnimationFrame       ||
			window.webkitREquestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			function( callback ) {
				window.setTimeout(callback, 1000 / 60);
			};
})();

window.addEventListener('load', function(ev) {
	var canvas       = document.getElementById('c_logo'),
		ctx          = canvas.getContext('2d'),
		center       = { x : (canvas.width / 2), y : (canvas.height / 2) },
		x = center.x,
		y = center.y,
		startAngle = (3*Math.PI/2),
		anticlockwise = false,
		radiusMillis = 10,
		radius = 130,
		radiusMin = 90,
		radiusHr = 50,
		millis,
		seconds,
		degsMin,
		degsHr,
		radsMillis,
		currRads,
		radsMin,
		radsHr,
		endAngleMillis,
		endAngle,
		endAngleMin,
		endAngleHr,
		timeNow,
		anim;

	canvas.addEventListener('click', function(ev) {
		cancelAnimationFrame(anim);
		asteroids();
	}, false);

	function polar(time) {

		//variables used by all arcs
		timeNow = new Date();
		
		ctx.clearRect(0,0,1000,400);
		//ctx.lineCap = "round";
		ctx.font = "20pt";
		ctx.lineWidth = 40;
		//ctx.strokeStyle = '#2CDB00';

		//milliseconds arc
		millis = 0.36 * (timeNow.getMilliseconds());
		radsMillis = Math.PI * (millis/180);
		endAngleMillis = radsMillis - Math.PI / 2;

		ctx.beginPath();
		ctx.strokeStyle = '#333333';
		ctx.arc(x,y,radiusMillis,startAngle,endAngleMillis,anticlockwise);
		ctx.stroke();

		//seconds arc
		seconds = 6 * (timeNow.getSeconds() + (timeNow.getMilliseconds() / 1000));
		currRads = Math.PI*(seconds/180);
		endAngle = currRads - Math.PI/2;
		
		ctx.beginPath();
		ctx.strokeStyle = '#57FF52';
		ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise);
		ctx.stroke();
		
		//minutes arc
		degsMin = 6 * (timeNow.getMinutes() + (timeNow.getSeconds() / 60) + (timeNow.getMilliseconds() / 1000 / 60));
		radsMin = Math.PI*(degsMin/180);
		endAngleMin = radsMin - Math.PI/2;

		ctx.beginPath();
		ctx.strokeStyle = '#DD4E22';
		ctx.arc(x,y,radiusMin,startAngle,endAngleMin,anticlockwise);
		ctx.stroke();

		//hours arc
		degsHr = 15 * ((timeNow.getHours()) + (timeNow.getMinutes() / 60) + (timeNow.getSeconds() / 60 / 60) + (timeNow.getMilliseconds() / 1000 / 60 / 60));
		radsHr = Math.PI*(degsHr/180);
		endAngleHr = radsHr - Math.PI/2;
		
		ctx.beginPath();
		ctx.strokeStyle = '#FFFF5D';
		ctx.arc(x,y,radiusHr,startAngle,endAngleHr,anticlockwise);
		ctx.stroke();

		anim = requestAnimFrame(polar);
	}
	
	anim = requestAnimFrame(polar);

}, false);