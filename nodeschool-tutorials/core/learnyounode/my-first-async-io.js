// Import a filesystem module
var fs = require('fs');

// Read in asyncronously and print the number of newlines
fs.readFile(process.argv[2], function(err, buf) {
	if (err) throw err;
	var str = buf.toString();
	var lines = str.split('\n');
	console.log(lines.length - 1);
});

/***
fs.readFile(process.argv[2], 'utf8', function (err, str) {
	if (err) throw err;
	var lines = str.split('\n');
	console.log(lines.length - 1);
});
 */
