const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
	movieId: Number,
	rating: Number
}, {
	versionKey: false,
});

ratingsSchema.index({ rating: -1 });

mongoose.model('rating', ratingsSchema);
