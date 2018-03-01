// Import a custom module
var mymodule = require('./mymodule.js');

// Create variables
var dir = process.argv[2],
		ext = process.argv[3],
		callback = function (err, files) {
			if (err) throw err;

			files.forEach(function (file) {
				console.log(file);
			});
		};

// Execute the custom module
mymodule(dir, ext, callback);
