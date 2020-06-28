const { getFileStream } = require('./googleDrive');
const { parse } = require('csv');

exports.importData = async({ fileId, Model, transformer }) => {
	try {
		const dataStream = await getFileStream(fileId);
		const parser = dataStream.pipe(parse({ columns: true }));

		for await (const record of parser) {
			await Model.create(transformer(record));
		}
	} catch (e) {
		throw new Error(e);
	}
};
