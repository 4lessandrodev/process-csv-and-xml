import { createWriteStream, ReadStream } from "fs";
import { promisify } from 'util';
import { pipeline, Transform, TransformCallback, Writable } from 'stream';
import convertXmlToJson from "../utils/convert-xml-to-json";
import convertCsvToJson from "../utils/convert-csv-to-json";
import { IResult } from "../interfaces";
import Mongo, { MONGO_DB_COLLECTION, MONGO_DB_NAME } from "../db/mongo";
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
					.db(MONGO_DB_NAME)
					.collection(MONGO_DB_COLLECTION)
					.bulkWrite(command);
				
				callback && callback();
				return true;
			}
		});

		const transformFile = new Transform({
			async transform(chunk: string, _encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
		
				const bufferAsString = chunk.toString();
				const isXML = bufferAsString.includes('<Transactions>');
				const isCSV = bufferAsString.includes('","')
				
				if (isXML) {
					
					const xml = bufferAsString;
		
					const result = await convertXmlToJson(xml);
					
					callback(null, JSON.stringify(result));
					
				} else if (isCSV){
					
					const csv = bufferAsString;

					const result = await convertCsvToJson(csv);
					
					callback(null, JSON.stringify(result));
				}
		
			}
		});
		
		const isLocal = destination.toUpperCase() === 'LOCAL';
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
