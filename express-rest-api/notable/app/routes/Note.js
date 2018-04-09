module.exports = (app) => {
	const Note = require('../models/Note');

	app.route('/notes')
		.post((req, res) => {
			const { title, content } = req.body;
			if (title === undefined
				|| content === undefined) {
				return res.status(400).send({
					message: 'Neither title nor content cannot be empty.'
				});
			}

			Note.create({
				title,
				content
			}, (err, note) => {
				if (err) {
					return res.status(500).send({
						message: err. message
					});
				}

				res.status(200).send({
					message: `Note ${title} successfully created.`,
					note
				});
			});
		})
		.get((req, res) => {
			Note.find({}, (err, notes) => {
				if (err) {
					return res.status(500).send({
						message: err.message
					});
				}
				if (!notes.length) {
					return res.status(404).send({
						message: 'No note found.'
					});
				}
				res.status(200).send(notes);
			});
		});

	app.route('/notes/:id')
		.get((req, res) => {
			const id = req.params.id;
			Note.findById(id, (err, note) => {
				if (err) {
					return res.status(500).send({
						message: err.message
					});
				}
				if (note === null) {
					return res.status(404).send({
						message: `Note ${id} not found.`
					});
				}

				res.status(200).send(note);
			});

		})
		.put((req, res) => {
			const { title, content } = req.body;
			if (title === undefined
				|| content === undefined) {
				return res.status(400).send({
					message: 'Neither title nor content cannot be empty.'
				})
			}

			const id = req.params.id;
			Note.findByIdAndUpdate(id, {
				title,
				content
			}, {new: true}, (err, note) => {
				if (err) {
					return res.status(500).send({
						message: err.message
					});
				}
				if (note === null) {
					return res.status(404).send({
						message: `Note ${id} not found.`
					});
				}

				res.status(200).send({
					message: `Note ${id} successfully updated.`,
					note
				});
			});
		})
		.delete((req, res) => {
			const id = req.params.id;
			Note.findByIdAndRemove(id, (err, note) => {
				if (err) {
					return res.status(500).send({
						message: err.message
					});
				}
				if (note === null) {
					return res.status(404).send({
						message: `Note ${id} not found.`
					});
				}

				res.status(200).send({
					message: `Note ${id} successfully deleted.`,
					note
				});
			});
		});
};