require('dotenv').config()
const mongoose = require('mongoose');

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const uri = [
	[
		'mongodb',
		'//' + DB_HOST,
		DB_PORT
	].join(':'), 
	DB_NAME
].join('/');

mongoose.connect(uri);