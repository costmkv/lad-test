const db = require('./db');
const googleDrive = require('./googleDrive');

const { MONGODB_URI } = process.env;
const { importRatings } = require('./ratings');
const { importMovies, getBestMovies, printBestMovies } = require('./movies');

(async () => {
	try {
		if (!MONGODB_URI) {
			throw new Error('MONGODB_URI is required');
		}

		await db.init(MONGODB_URI);

		await googleDrive.auth();
		await Promise.all([importRatings(), importMovies()]);

		const movies = await getBestMovies();
		printBestMovies(movies);
	} catch (e) {
		throw e;
	} finally {
		db.close();
	}
})();
