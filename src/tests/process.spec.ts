import { resolve } from "path";
import { main } from "../main"
import readFile from "../read-file";

describe('process', () => {
	it('should process file xml to local with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.xml'));

		const result = await main(file, 'Local');
		expect(result).toBeTruthy();
	});

	it.only('should process file csv to mongo with success', async () => {
		
		const file = await readFile(resolve(__dirname, '..', 'data', 'sample.csv'));
		
		const result = await main(file, 'Mongo');		
		expect(result).toBeTruthy();
	});
});
