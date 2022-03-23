import { ReadStream } from "fs";
import Mongo from "./db/mongo";
import processFile from "./file-processor/process-file";

export const processFileService = async (file: ReadStream, destination: 'Local' | 'Mongo'): Promise<boolean> => {
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
