const db = require('./db');

(async () => {
	try {
		const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testMovies';
		await db.init(uri);

	}catch (e) {
		throw new Error(e);
	}finally {
		db.close();
	}
})();
