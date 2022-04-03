import { MongoClient } from "mongodb";

export const MONGO_DB_USER = process.env.MONGO_DB_USER;
export const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
export const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME ?? 'test';
export const MONGO_DB_COLLECTION = process.env.MONGO_DB_COLLECTION ?? 'transactions';
export const MONGO_DB_PREFIX = process.env.MONGO_DB_PREFIX ?? 'mongodb:';
export const MONGO_DB_PARAMS = MONGO_DB_PREFIX === 'mongodb:+srv' ? process.env.MONGO_DB_PARAMS : '';

export class Mongo {
	protected static conn: MongoClient | null = null;

	protected static readonly URI = `${MONGO_DB_PREFIX}//${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?${MONGO_DB_PARAMS}`;
	
	public static async init(): Promise<MongoClient> {
		console.log('connecting to mongodb ...');
		
		if (!Mongo.conn) {
			
			const client = new MongoClient(Mongo.URI, {
				rejectUnauthorized: false,
				loggerLevel: 'debug',
				keepAlive: true
			});
			
			const conn = await client.connect();

			console.log('connected!');
			Mongo.conn = conn;
			
		}
		return Mongo.conn;
	}
}

export default Mongo;
