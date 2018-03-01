// Import an http module
var http = require('http');

// Get a url
var url = process.argv[2],
		data = [];

// Get an http response
http.get(url, function (res) {
	res.setEncoding('utf8');
	res.on('error', console.error);
	res.on('data', function (chunk) {
		data.push(chunk);
	});
	res.on('end', function () {
		var str = data.join('');
		console.log(str.length);
		console.log(str);
	});
}).on('error', console.error);
