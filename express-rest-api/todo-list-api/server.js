const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const uri = [
	[
		'mongodb',
		'//' + DB_HOST,
		DB_PORT
	].join(':'),
	DB_NAME
].join('/')

mongoose.Promise = global.Promise;
mongoose.connect(uri);

const routes = require('./app/routes/Task');
routes(app);

app.listen(port, (err) => {
	if (err) {
		return err;
	}

	console.log(`Server is listening on ${port}`);
});