const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(db.uri, (err) => {
	if (err) {
		return err;
	}

	console.log(`Connected to ${db.uri}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./app/routes')(app);

const server = app.listen(port, (err) => {
	if (err) {
		return err;
	}

	console.log(`Server is listening on ${port}`);
});