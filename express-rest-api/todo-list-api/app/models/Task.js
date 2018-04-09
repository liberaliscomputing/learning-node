'use strict';
const mongoose = require('mongoose');

const TaskScema = mongoose.Schema({
	name: {
		type: String,
		required: 'Kindly enter the task\'s name.'
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	}
});
mongoose.model('Task', TaskScema);

module.exports = mongoose.model('Task');