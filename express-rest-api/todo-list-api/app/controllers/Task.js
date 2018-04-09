'use strict';
const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.create = (req, res) => {
	const name = req.body.name;
	if (name === undefined) {
		return res.status(400).send({
			message: 'Task name can not be empty.'
		});
	}

	Task.create({
		name
	}, (err, task) => {
		if (err) {
			return res.status(500).send({
				message: err.message
			});
		}

		res.status(200).send({
			message: `Note ${name} created!`
		});
	});
};

exports.findAll = (req, res) => {
	Task.find({}, (err, tasks) => {
		if (err) {
			return res.status(500).send({
				message: err.message
			});
		}
		if (!tasks.length) {
			return res.status(404).send({
				message: 'No task found.'
			});
		}

		res.status(200).send(tasks);
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Task.findById(id, (err, task) =>  {
		if (err) {
			return res.status(500).send({
				message: err.message
			});
		}
		if (task === null) {
			return res.status(404).send({
				message: `Task ${id} not found.`
			});
		}

		res.status(200).send(task);
	});
};

exports.update = (req, res) => {
	const id = req.params.id;
	const name = req.body.name;

	if (name === undefined) {
		return res.status(400).send({
			message: 'Task name can not be empty.'
		});
	}

	Task.findByIdAndUpdate(id, { name }, {new: true}, (err, task) => {
		if (err) {
			return res.status(500).send({
				message: err.message
			});
		}
		if (task === null) {
			return res.status(404).send({
				message: `Task ${id} not found;`
			});
		}

		res.status(200).send(task);
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Task.findByIdAndRemove(id, (err, task) => {
		if (err) {
			return res.status(500).send({
				message: err.message
			});
		}
		if (task === null) {
			return res.status(404).send({
				message: `Task ${id} not found.`
			});
		}

		res.status(200).send({
			message: `Task ${id} successfully deleted.`
		})
	});
};