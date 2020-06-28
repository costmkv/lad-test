const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const path = require('path');

const drive = google.drive('v3');

exports.auth = async() => {
	const localAuth = await authenticate({
		keyfilePath: path.join(__dirname, './credentials.json'),
		scopes: ['https://www.googleapis.com/auth/drive'],
	});

	google.options({ auth: localAuth });
};

exports.getFileStream = async(fileId) => {
	const response = await drive.files
		.get({fileId, alt: 'media'}, {responseType: 'stream'});

	return response.data;
};
