// Import an http module
var http = require('http');

// Create variables
var urls = process.argv.slice(2),
		queue = [],
		count = 0;

// Get an http response
urls.forEach(function (url, idx) {
	http.get(url, function(res) {
		var data = '';
		res.setEncoding('utf-8');
		res.on('error', console.error);
		res.on('data', function (chunk) {
			data += chunk;	
		});
		res.on('end', function () {
			queue[idx] = data;
			count++;
			
			if (count === urls.length) {
				queue.forEach(function (data) {
					console.log(data);
				});
			}
		});
	}).on('error', console.error);
});
