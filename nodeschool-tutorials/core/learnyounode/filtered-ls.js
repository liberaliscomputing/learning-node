// Import modules
var fs = require('fs'),
		path = require('path');

// Get file path and extension
var dir = process.argv[2],
		ext = process.argv[3];

// Print files filtered by the extension
fs.readdir(dir, function (err, files) {
	if (err) throw err;
	
	files.forEach(function (file) {
		if (path.extname(file) === '.' + ext) {
			console.log(file);
		}
	});
});
