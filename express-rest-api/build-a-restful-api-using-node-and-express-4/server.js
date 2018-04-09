const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bear = require('./app/models/Bear');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const uri = [
	[
		'mongodb',
		'//'+ DB_HOST,
		DB_PORT
	].join(':'),
	DB_NAME
].join('/');
mongoose.connect(uri);

var router = express.Router();
router.use((req, res, next) => {
	console.log('Something is happening.');
	next();
});
router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Hooray! Welcome to the Bear API!'
	});
});
router.route('/bears')
	.post((req, res) => {
		const name = req.body.name;

		if (name === undefined) {
			return res.status(400).send({
				message: 'Bear name can not be empty.'
			});
		}

		const bear = new Bear({
			name
		});
		bear.save((err) => {
			if (err) {
				return res.status(500).send({
					message: err.message
				});
			}

			res.status(200).send({
				message: `Bear ${name} created!`
			});
		});
	})
	.get((req, res) => {
		Bear.find({}, (err, bears) => {
			if (err) {
				res.status(500).send({
					message: err.message
				});
			}
			if (!bears.length) {
				return res.status(404).send({
					message: 'No bear found.'
				});
			}

			res.status(200).send(bears);
		});
	});
router.route('/bears/:id')
	.get((req, res) => {
		Bear.findById(req.params.id, (err, bear) => {
			if (err) {
				return res.status(500).send({
					message: err.message
				});
			}
			if (bear === null) {
				return res.status(404).send({
					message: 'No bear found.'
				});
			}

			res.status(200).send(bear);
		});
	})
	.put((req, res) => {
		const id = req.params.id;
		const name = req.body.name;

		if (name === undefined) {
			return res.status(400).send({
				message: 'Bear name cannot be empty.'
			});
		}

		Bear.findByIdAndUpdate(id, { name }, {new: true}, (err, bear) => {
			if (err) {
				return res.status(500).send({
					message: err.message
				});
			}
			if (bear === null) {
				return res.status(404).send({
					message: `Bear ${id} not found.`
				});
			}

			res.status(200).send(bear);
		});

	})
	.delete((req, res) => {
		const id = req.params.id;
		Bear.findByIdAndRemove(id, (err, bear) => {
			if (err) {
				return res.status(500).send({
					message: err.message
				});
			}
			if (bear === null) {
				return res.status(404).send({
					message: `Bear ${id} not found.`
				});
			}

			res.status(200).send({
				message: `Bear ${id} successfully deleted.`
			});
		});
	});
app.use('/api', router);

app.listen(port, (err) => {
	if (err) {
		return err;
	}

	console.log(`Server is listening on ${port}`);
});