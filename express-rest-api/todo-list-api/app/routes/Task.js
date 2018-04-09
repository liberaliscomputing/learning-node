'use strict';
module.exports = (app) => {
	const task = require('../controllers/Task');

	app.route('/tasks')
		.get(task.findAll)
		.post(task.create);

	app.route('/tasks/:id')
		.get(task.findOne)
		.put(task.update)
		.delete(task.delete);
};