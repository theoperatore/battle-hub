window.addEventListener('load', function(ev) {
	var isPolarClock = true,
		canvas       = document.getElementById('c_logo'),
		ctx          = canvas.getContext('2d'),
		center       = { x : (canvas.width / 2), y : (canvas.height / 2) },
		interval     = setInterval(polar,1);

    function polar() {
    	//variables used by all arcs
        var timeNow = new Date(),
        	x = center.x,
        	y = center.y,
        	startAngle = (3*Math.PI/2),
        	anticlockwise = false,
        	radius,
        	radiusMin,
        	radiusHr,
        	seconds,
        	degsMin,
        	degsHr,
        	currRads,
        	radsMin,
        	radsHr,
        	endAngle,
        	endAngleMin,
        	endAngleHr;
        
        if (canvas.getContext) {
            ctx.clearRect(0,0,1000,400);
            ctx.lineCap = "round";
            ctx.font = "20pt";
            ctx.lineWidth = 5;

            //seconds arc
            seconds = 6 * (timeNow.getSeconds() + (timeNow.getMilliseconds() / 1000));
            radius = 140;
            currRads = Math.PI*(seconds/180);
            endAngle = currRads - Math.PI/2;
            
            ctx.beginPath();
            ctx.arc(x,y,radius,startAngle,endAngle,anticlockwise);
            ctx.stroke();
            
            //minutes arc
            radiusMin = 110;
            degsMin = 6 * (timeNow.getMinutes() + (timeNow.getSeconds() / 60) + (timeNow.getMilliseconds() / 1000 / 60));
            radsMin = Math.PI*(degsMin/180);
            endAngleMin = radsMin - Math.PI/2;
            
            ctx.beginPath();
            ctx.arc(x,y,radiusMin,startAngle,endAngleMin,anticlockwise);
            ctx.stroke();
            
            //hours arc
            radiusHr = 80;
            degsHr = 10.5 * ((timeNow.getHours() - 12) + (timeNow.getMinutes() / 60) + (timeNow.getSeconds() / 60 / 60) + (timeNow.getMilliseconds() / 1000 / 60 / 60));
            radsHr = Math.PI*(degsHr/180);
            endAngleHr = radsHr - Math.PI/2;
            
            ctx.beginPath();
            ctx.arc(x,y,radiusHr,startAngle,endAngleHr,anticlockwise);
            ctx.stroke();
        }
        else {
            document.write("Canvas element unsupported...Gargantua-1 eats you.");
        }
    }
}, false);