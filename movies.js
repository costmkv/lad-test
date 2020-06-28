const { models } = require('./db');
const { importData } = require('./import');
const config = require('./config');

const transformer = ({ id, original_title }) =>
	({ id: Number(id), original_title });

exports.importMovies = async() => {
	await importData({ fileId: config.movieId, Model: models.movie, transformer });
};

exports.getBestMovies = async() => {
	const Rating = models.rating;

	return await Rating.aggregate([{
		$group: {
			_id: '$movieId',
			count: { $sum: 1 },
			ratingCount: { $sum: '$rating' }
		}
	}, {
		$project: { _id: 1, rating: { $divide: [ '$ratingCount', '$count' ] } }
	}, {
		$sort: { rating: -1 }
	}, {
		$limit: 10
	}])
};

exports.printMovies = (movies) => {
	for (let movie of movies) {
		console.log(`${movie._id} ${movie.rating}`);
	}
};
