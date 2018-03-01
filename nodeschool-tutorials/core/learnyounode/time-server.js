// Import a net module
var net = require('net');

// Create a function
function checkDigit (num) {
	return (num < 10 ? '0' : '') + num;
}

// Create a server
var port = process.argv[2];
var server = net.createServer(function (socket) {
	var date = new Date();

	socket.end(date.getFullYear() + '-' +
		checkDigit(date.getMonth() + 1) + '-' +
		checkDigit(date.getDate()) + ' ' +
		checkDigit(date.getHours()) + ':' +
		checkDigit(date.getMinutes()) + '\n');

	/***
	var datetime = new Date();

	var YYYY = datetime.getFullYear();
	var MM = checkDigit(datetime.getMonth() + 1);
	var DD = checkDigit(datetime.getDate());
	var hh = checkDigit(datetime.getHours());
	var mm = checkDigit(datetime.getMinutes());

	var date = [YYYY, MM, DD].join('-');
	var time = [hh, mm].join(':');

	socket.end([date, time].join(' ') + '\n');
	 */
}).on('error', console.error);
server.listen(Number(port));
