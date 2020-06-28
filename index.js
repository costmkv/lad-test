const db = require('./db');
const googleDrive = require('./googleDrive');

(async () => {
	try {
		const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testMovies';
		await db.init(uri);

		await googleDrive.auth();
	}catch (e) {
		throw new Error(e);
	}finally {
		db.close();
	}
})();
