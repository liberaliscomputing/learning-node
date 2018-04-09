const express = require('express');
const bodyParser = require('body-parser');
const User = require('./User');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// create a new user
router.post('/', (req, res) => {
	const { name, email, password } = req.body;
	User.create({
		name,
		email,
		password
	}, (err, user) => {
		if (err) {
			return res.status(500).send('500 Internal Server Error'); 
		}

		res.status(200).send(user);
	});
});

// find all users
router.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			return res.status(500).send('500 Internal Server Error');
		}

		res.status(200).send(users);
	});
});

// find a single user by id
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).send('500 Internal Server Error');
		}
		if (user === null) {
			return res.status(404).send("No user found.");
		}

		res.status(200).send(user);
	});
});

// update a single user by id
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).send('500 Internal Server Error');
		}
		if (user === null) {
			return res.status(404).send('No user found.');
		}

		res.status(200).send(user);
	})
});

// delete a single user by id
router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if (err) {
			return res.status(500).send('500 Internal Server Error');
		}
		if (user === null) {
			return res.status(404).send('No user found.');
		}
		
		res.status(200).send(`User ${user.name} deleted.`);
	});
});

module.exports = router;