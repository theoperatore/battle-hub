//Particle Object
/*
 * Params: 
 *         x,y:        integer initial position of particle
 *         mass:       integer initial mass of particle -- also component for the radius
 *         charge:     [1 || -1] -- signifying a positive or negative charge; default = positive
 *
 * Optional Params:
 *         dx,dy:      initial velocity of particle; default = 0
 *         ddx,ddy:    initial acceleration of particle; default = 0
 */
var Particle = function(x,y,mass,charge,dx,dy,ddx,ddy) {
	this.x    = x;
	this.y    = y;
	this.mass = mass;

	//Universal Constants!
	this.G = 0.0000006674; //Newton's Gravitational Constant -- 6.67*10^(-11)
	this.K = 89900000;     //Coulomb's Constant -- 8.99*10^(9) 
	this.e = 0.0001602;    //Elementary Charge on a Proton -- 1.602*10^(-19)

	//compute the adjusted radius of particle
	this.radius = mass*1.35;
	
	//default charge is positive
	this.charge = (typeof charge === 'undefined')? 1*this.e : charge*this.e;

	//optional initial parameters
	this.dx  = (typeof dx  === 'undefined')? 0 : dx;
	this.dy  = (typeof dy  === 'undefined')? 0 : dy;
	this.ddx = (typeof ddx === 'undefined')? 0 : ddx;
	this.ddy = (typeof ddy === 'undefined')? 0 : ddy;

	//accel vars
	this.gravX = 0;
	this.gravY = 0;
	this.elecX = 0;
	this.elecY = 0;

	//other vars
	this.inverse = false;
}

/* Given the calling particle and another particle, 
 * computes the electrostatic force between the two objects
 * and adds in the resulting accelerations to the calling particle
 *
 * Params:
 *        p - Particle
 *        
 */
Particle.prototype.electrostaticForce = function(p) {
	var x   = this.x - p.x,
		y   = this.y - p.y,
		mag = Math.sqrt((x*x)+(y*y));

	//Consider: allowing ddx/ddx += will make ddx/ddy hold a running total of all accels on the calling particle
	this.elecX = ((this.K*this.charge*p.charge)/(mag*mag))*(x/mag);
	this.elecY = ((this.K*this.charge*p.charge)/(mag*mag))*(y/mag);
}

/*
 * Given this calling particle and another particle,
 * computes the acceleration due to gravity between the two 
 * and adds it to the calling particle's acceleration
 * 
 * Params:
 *         p       - Particle
 */
Particle.prototype.gravitationalForce = function(p) {
	var x   = p.x - this.x,
		y   = p.y - this.y,
		mag = Math.sqrt((x*x) + (y*y));
	
	this.gravX = 2*this.G*((this.mass*p.mass)/mag*mag)*(x/mag);
	this.gravY = 2*this.G*((this.mass*p.mass)/mag*mag)*(y/mag);
	
}

/*
 * Allow gravity to work in the inverse direction
 *
 * Params:
 *         p        - Particle
*/
Particle.prototype.inverseGraviticForce = function(p) {
	var x   = p.x - this.x,
		y   = p.y - this.y,
		mag = Math.sqrt((x*x) + (y*y));
	
	this.gravX = -this.G*((this.mass*p.mass)/mag*mag)*(x/mag);
	this.gravY = -this.G*((this.mass*p.mass)/mag*mag)*(y/mag);

	console.log("Using InverseGravity");
}

/*
 * Update the particle's position based on accelerations due to other particles.
 *
 * Params:
 *         time        - The difference in time between updates
 *         particles   - array of particles this particle should feel force from
 */
Particle.prototype.update = function(time,graviticCenter,repulsionCenter,index) {
	//for all particles, perform force calculations

	//this only allows for one graviticCenter
	this.gravitationalForce(graviticCenter);

	//and only one repulsionCenter -- use electrostatic if not using inverse gravity
	if (this.inverse) {
		this.inverseGraviticForce(repulsionCenter);	
	}
	else {
		this.electrostaticForce(repulsionCenter);
	}
	

	this.ddx = this.gravX + this.elecX;
	this.ddy = this.gravY + this.elecY;

	//update veloctiy
	this.dx += this.ddx*time;
	this.dy += this.ddy*time;

	//update position
	this.x += (1/2)*this.ddx*time*time + this.dx*time;
	this.y += (1/2)*this.ddy*time*time + this.dy*time;
}

/*

Simple Update for low number of particles.
 */
Particle.prototype.simpleUpdate = function(time,p) {
	this.electrostaticForce(p);
	this.gravitationalForce(p);

	//update current accels based on force functions
	this.ddx = this.gravX + this.elecX;
	this.ddy = this.gravY + this.elecY;

	//update veloctiy
	this.dx += this.ddx*time;
	this.dy += this.ddy*time;

	//update position
	this.x += (1/2)*this.ddx*time*time + this.dx*time;
	this.y += (1/2)*this.ddy*time*time + this.dy*time;
}

/* 
 * Checks to see if this particle has collided with another particle
 *
 * Params:
 *        p - other particle
 *
 * Returns: 
 *        true  - if collision
 *        false - otherwise
 */
Particle.prototype.collides = function(p) {
	var r    = (this.radius)*(this.radius),
		r2   = (p.radius)*(p.radius),
		i    = p.x - this.x,
		j    = p.y - this.y,
		dis2 = i*i + j*j;

	return (dis2 <= (r+r2)) ? true : false;
};









