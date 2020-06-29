const { getFileStream } = require('./googleDrive');
const { parse } = require('csv');

exports.importData = async({ fileId, Model, transformer, maxCounter }) => {
	try {
		const dataStream = await getFileStream(fileId);
		const parser = dataStream.pipe(parse({ columns: true }));

		let index = 0;

		for await (const record of parser) {
			const entity = transformer(record);

			if (entity._id) {
				const existingEntity = await Model.findOne({_id: entity._id});
				if (existingEntity) {
					continue;
				}
			}

			await Model.create(transformer(record));

			++index;

			if (maxCounter && index >= maxCounter) {
				break;
			}
		}
	} catch (e) {
		throw e;
	}
};
