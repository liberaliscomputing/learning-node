// Import an http module
var http = require('http');

// Get a url
var url = process.argv[2];

// Get an http response
http.get(url, function(res) {
	res.setEncoding('utf8');
	res.on('error', console.error);
	res.on('data', console.log);
}).on('error', console.error);

/***
http.get(url, function(res) {
	res.on('data', function (data) {
		console.log(data.toString());
	});
	res.on('error', function (err) {
		console.error(err.toString());
	});
}).on('error', function (err) {
	console.error(err.toString());
});
 */
