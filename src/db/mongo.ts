import { MongoClient } from "mongodb";

const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export class Mongo {
	protected static conn: MongoClient | null = null;
	
	public static async init(): Promise<MongoClient> {
		if (Mongo.conn === null) {
			
			const client = new MongoClient(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?ssl=true&authSource=admin&w=majority`, { rejectUnauthorized: false, loggerLevel: 'debug' });
			
			const conn = await client.connect();

			console.log('connected');
			Mongo.conn = conn;
			
		}
		return Mongo.conn;
	}
}

export default Mongo;
