import { resolve } from 'path';
import readFile from '../file-processor/read-file';

describe('read-file', () => {
	it('should read a csv file with success', async () => {
		const path = resolve(__dirname, '..', 'data', 'sample.csv');

		const file = await readFile(path);
		
		expect(file.readableEncoding).toBe('utf-8');
	});

	it('should read a xml file with success', async () => {
		const path = resolve(__dirname, '..', 'data', 'sample.xml');

		const file = await readFile(path);
		
		expect(file.readableEncoding).toBe('utf-8');
	});
});
