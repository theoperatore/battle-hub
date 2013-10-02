var fs   = require('fs'),
	url  = require('url'),
	http = require('http'),
	qs   = require('querystring'),
	os   = require('os'),
	path,
	date = new Date();



var server = http.createServer(function(req, res) {

	//the pathname including the '/'
	path   = url.parse(req.url).pathname;
	date   = new Date();	

	//if the path isn't sepecified, then try index.html
	if (path === '/') {
		fs.readFile(__dirname + '/index.html', function(err, data) {
			if (err) {
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.end('Error reading file: ' + path);
				console.log(date,req.connection.remoteAddress,err.message);
			}
			else {

				console.log(date,'Serving', path ,'to ip:',req.connection.remoteAddress);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.end(data);
			}
		});
	}

	//if we are serving a css file...
	else if (req.url.indexOf('.css') != -1) {

		//...look for it...
		fs.readFile(__dirname + path, function(err, data)  {
			
			//..throw error if not found..
			if (err) {
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.end('Error reading file: ' + path);
				console.log(date,req.connection.remoteAddress,err.message);
			}

			//...otherwise serve the file
			else {
				res.writeHead(200, {'Content-Type' : 'text/css'});
				res.end(data);
				console.log(date,'Serving', path ,'to ip:',req.connection.remoteAddress);
			}
		});
	}

	//js file
	else if(req.url.indexOf('.js') != -1) {

		fs.readFile(__dirname + path, function(err, data) {

			if (err) {
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.end('Error reading file: ' + path);
				console.log(date,req.connection.remoteAddress,err.message);
			}
			else {
				res.writeHead(200, {'Content-Type': 'text/javascript'});
				res.end(data);
				console.log(date,'Serving', path ,'to ip:',req.connection.remoteAddress);
			}

		});
	}

	else if (path.indexOf('.cache') != -1) {
		fs.readFile(__dirname + path, function(err, data) {
			if (err) {
				res.writeHead(404);
				res.end('Error serving: ' + path);
				console.log(date,req.connection.remoteAddress,err.message);
			}
			else {
				res.writeHead(200, { 'Content-Type' : 'text/chache-manifest' });
				res.end(data);
				console.log(date,'Serving', path ,'to ip:',req.connection.remoteAddress);
			}
		});
	}

	else {
		//handle a plain request
		fs.readFile(__dirname + path, function(err,data) {
			if (err) {
				//send out a 404 error with a messages
				res.writeHead(404, {'Content-Type' : 'text/html'});
				res.end('Error reading file: ' + path);
				console.log(date,err.message);
			}
			else {
				
				console.log(date,'Serving', path ,'to ip:',req.connection.remoteAddress);
				res.writeHead(200, {'Content-Type' : 'text/html'});
				res.end(data);
			}	
		});
	}
});

server.listen(8080);

if( os.networkInterfaces().en1) {
	console.log(date,'Server running at -- ', os.networkInterfaces().en1[1].address, 'on Port 8080');
}
else if (os.networkInterfaces().en0) {
	console.log(date,'Server running at -- ', os.networkInterfaces().en0[1].address, 'on Port 8080');
}
