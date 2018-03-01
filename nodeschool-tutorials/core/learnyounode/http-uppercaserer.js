// Import an http module
var http = require('http');

// Create a server
var port = process.argv[2];
var server = http.createServer(function (req, res) {
	if (req.method !== 'POST') {
		return res.end('Send a POST request\n');
	}

	res.writeHead(200, { 'Content-Type' : 'text/plain' });
	req.on('data', function (chunk) {
		res.write(chunk.toString().toUpperCase());
	});
}).on('error', console.error);
server.listen(port);
