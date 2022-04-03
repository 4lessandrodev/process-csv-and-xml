import { MongoClient } from "mongodb";

export const MONGO_DB_USER = process.env.MONGO_DB_USER;
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
export const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? 'test';
export const MONGO_DB_COLLECTION = process.env.MONGO_DB_COLLECTION ?? 'transactions';

export class Mongo {
	protected static conn: MongoClient | null = null;
	
	public static async init(): Promise<MongoClient> {
		console.log('connecting to mongodb ...');
		
		if (Mongo.conn === null) {
			
			const client = new MongoClient(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?ssl=true&authSource=admin&w=majority`, { rejectUnauthorized: false, loggerLevel: 'debug' });
			
			const conn = await client.connect();

			console.log('connected!');
			Mongo.conn = conn;
			
		}
		return Mongo.conn;
	}
}

export default Mongo;
