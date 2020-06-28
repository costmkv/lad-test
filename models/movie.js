const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
	_id: Number,
	original_title: {
		type: String,
		required: true,
	}
}, {
	versionKey: false,
});

mongoose.model('movie', moviesSchema);
