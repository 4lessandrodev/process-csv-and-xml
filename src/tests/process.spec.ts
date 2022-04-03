import { resolve } from "path";
import { processFileService } from "../process-file.service"
import readFile from "../file-processor/read-file";

describe('process', () => {
	it('should process file xml to local with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.xml'));

		const result = await processFileService(file, 'Local');
		expect(result).toBeTruthy();
	});

	it('should process file csv to local with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.csv'));

		const result = await processFileService(file, 'Local');
		expect(result).toBeTruthy();
	});

	it('should process file csv to mongo with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.csv'));
		
		const result = await processFileService(file, 'Mongo');		
		expect(result).toBeTruthy();
	});

	it('should process file xml to mongo with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.xml'));
		
		const result = await processFileService(file, 'Mongo');		
		expect(result).toBeTruthy();
	});
});
