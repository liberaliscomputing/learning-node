// Create a numetic variable
var sum = 0;

// loop command-line arguments
for (var i = 2; i < process.argv.length; i++) {
	sum += Number(process.argv[i]);
}

/***
process.argv.slice(2).forEach(function (str) {
	sum += Number(str);
});
 */

// Print the sum
console.log(sum);
