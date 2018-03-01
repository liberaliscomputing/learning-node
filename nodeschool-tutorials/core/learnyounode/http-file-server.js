// Import modules
var http = require('http'),
		fs = require('fs');

// Create variables
var port = process.argv[2],
		file = process.argv[3];

// Create a server
var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	fs.createReadStream(file).pipe(res);
}).on('error', console.error);
server.listen(port);
