import { Writable } from "stream";
import { IResult } from "./interfaces";
import Mongo from "./mongo";

export const writeOnMongo = new Writable({
	async write(chunk: any, encoding?: BufferEncoding, callback?: any): Promise<boolean> {

		const result: IResult = JSON.parse(chunk);

		const command = result.data.map((doc) => ({
			insertOne: {
				document: doc
			}
		}))

		const conn = await Mongo.init();
		
		conn
			.db(process.env.MONGO_DB_NAME)
			.collection('transactions')
			.bulkWrite(command);
		
		this.end();
		callback && callback();
		return true;
	}
});

export default writeOnMongo;
