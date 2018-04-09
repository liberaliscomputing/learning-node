const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
	title: String,
	content: String
}, {
	timestamps: true
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note')