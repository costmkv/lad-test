const mongoose = require('mongoose');

exports.models = {};

exports.init = async (uri) => {
	mongoose.connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	});

	const models = {};

	['movie', 'rating'].forEach((modelName) => {
		require(`./models/${modelName}`);
		exports.models[modelName] = mongoose.model(modelName);
	});

	return models;
};

exports.close = async() => {
	mongoose.disconnect();
};
