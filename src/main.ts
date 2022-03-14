import { ReadStream } from "fs";
import Mongo from "./mongo";
import processFile from "./process-file";

export const main = async (file: ReadStream, destination: 'Local' | 'Mongo'): Promise<boolean> => {
	try {
		const isLocal = destination === 'Local';

		if (!isLocal) {
			await Mongo.init();
		}

		return processFile(file, destination);
	
	} catch (error) {
		
		return false;	
	}
}
