import { randomBytes } from "crypto";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { Writable } from "stream";

export const writeOnLocal = new Writable({
	write(chunk: any, encoding?: BufferEncoding, callback?: any): boolean {

		const fileName = randomBytes(3).toString('hex');
		
		const path = resolve(__dirname, '..', 'data', `result-${fileName}.json`);
		const local = createWriteStream(path, 'utf-8');
		
		local.write(chunk, 'utf-8');
		local.end();
		
		callback && callback();
		return true;
	}
});

export default writeOnLocal;
