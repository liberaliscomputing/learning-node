// Import built-in modules
var fs = require('fs'),
		path = require('path');

// Create a filtering function
module.exports = function (dir, ext, callback) {
	fs.readdir(dir, function (err, files) {
		if (err) return callback(err);

		files = files.filter(function (file) {
			return path.extname(file) === '.' + ext;
		});

		callback(null, files);
	});
};
