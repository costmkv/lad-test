const { models } = require('./db');
const { importData } = require('./import');
const config = require('./config');

const transformer = ({ id, original_title }) =>
	({ _id: Number(id), original_title });

exports.importMovies = async() => {
	await importData({
		fileId: config.movieId,
		Model: models.movie,
		maxCounter: 19700,
		transformer
	});
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
	}, {
		$lookup: {
			from: 'movies',
			localField: '_id',
			foreignField: '_id',
			as: 'movieInfo'
		}
	}])
};

exports.printBestMovies = (movies) => {
	for (let movie of movies) {
		const title = movie.movieInfo.length ?
			movie.movieInfo[0].original_title : '';

		console.log(`${title} ${movie.rating}`);
	}
};
