const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/DBConfig');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri).then(() => { 
	console.log('Successfully connected to the database'); 
}).catch((err) => {
	console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.get('/', (req, res) => {
	const message = [
		'Welcome to EasyNotes application.',
		'Take notes quickly.',
		'Organize and keep track of all your notes.'
	].join(' ');
	res.status(200).json({ message });
});

require('./app/routes/Note.js')(app);

app.listen(port, (err) => {
	if (err) {
		return err;
	}

	console.log(`Express server is listening on port ${port}`);
});