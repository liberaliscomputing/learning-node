// Import modules
var http = require('http'),
		url = require('url');

// Create functions
function parsetime (date) {
	return {
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds()
	};
}

function unixtime (date) {
	return { unixtime: date.getTime() };
}

// Create a server
var port = process.argv[2];
var server = http.createServer(function (req, res) {
	if (req.method !== 'GET') {
		return res.end('Send a GET request\n');
	}

	var data = url.parse(req.url, true),
			date = new Date(data.query.iso),
			result;

	if (data.pathname === '/api/parsetime') {
		result = parsetime(date);
	} else if (data.pathname === '/api/unixtime') {
		result = unixtime(date);
	}

	if (result) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(result));
	} else {
		res.writeHead(404);
		res.end();
	}
}).on('error', console.error);
server.listen(port);
