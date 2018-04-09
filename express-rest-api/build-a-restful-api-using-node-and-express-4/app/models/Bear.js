const mongoose = require('mongoose');

const BearSchema = mongoose.Schema({
	name: String
});
mongoose.model('BearSchema', BearSchema);

module.exports = mongoose.model('BearSchema');