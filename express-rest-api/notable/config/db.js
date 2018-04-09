const dotenv = require('dotenv');

dotenv.config();
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const uri = [
	[
		'mongodb',
		'//' + DB_HOST,
		DB_PORT
	].join(':'),
	DB_NAME
].join('/');

module.exports = { uri };