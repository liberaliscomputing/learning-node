// Import a filesystem module
var fs = require('fs');

// Read in syncronously and type-cast
var buf = fs.readFileSync(process.argv[2]);
var str = buf.toString();

/*** lines above could be re-written as:
var str = fs.readFileSync(process.argv[2], 'utf8')
 */

// Print the number of newlines
var lines = str.split('\n');
console.log(lines.length - 1);
