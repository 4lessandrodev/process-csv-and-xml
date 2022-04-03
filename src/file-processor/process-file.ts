import { createWriteStream, ReadStream } from "fs";
import { promisify } from 'util';
import { pipeline, Transform, TransformCallback, Writable } from 'stream';
import convertXmlToJson from "../utils/convert-xml-to-json";
import convertCsvToJson from "../utils/convert-csv-to-json";
import { IResult } from "../interfaces";
import Mongo from "../db/mongo";
import { randomBytes } from "crypto";
import { resolve } from "path";

const pipelineAsync = promisify(pipeline);

export const processFile = async (fileStream: ReadStream, destination: 'Local' | 'Mongo'): Promise<boolean> => {
	try {

		const conn = await Mongo.init();

		const writeOnLocal = new Writable({
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

		const writeOnMongo = new Writable({
			write(chunk: any, encoding?: BufferEncoding, callback?: any): boolean {
		
				const result: IResult = JSON.parse(chunk);
		
				const command = result.data.map((doc) => ({
					insertOne: {
						document: doc
					}
				}))
				
				conn
					.db(process.env.MONGO_DB_NAME)
					.collection('transactions')
					.bulkWrite(command);
				
				callback();
				return true;
			}
		});

		const transformFile = new Transform({
			async transform(chunk: string, _encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
		
				const isXML = chunk.toString().includes('<Transactions>');
				
				if (isXML) {
					
					const xml = chunk.toString();
		
					const result = await convertXmlToJson(xml);
					
					callback(null, JSON.stringify(result));
					
				} else {
					
					const result = await convertCsvToJson(chunk.toString());
					
					callback(null, JSON.stringify(result));
				}
		
			}
		});
		
		const isLocal = destination === 'Local';
		const save = isLocal ? writeOnLocal : writeOnMongo;

		await pipelineAsync(
			fileStream,
			transformFile,
			save
		);

		return true;

	} catch (error: any) {
		return false;
	}
}

export default processFile;
