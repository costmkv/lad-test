const { models } = require('./db');
const { importData } = require('./import');
const config = require('./config');

const transformer = ({ movieId, rating }) => ({ movieId, rating });

exports.importRatings = async() => {
	await importData({ fileId: config.ratingId, Model: models.rating, transformer });
};
