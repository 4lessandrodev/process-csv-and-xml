import { ReadStream } from "fs";
import processFile from "./file-processor/process-file";

export const processFileService = async (file: ReadStream, destination: 'Local' | 'Mongo'): Promise<boolean> => {
	try {

		return processFile(file, destination);
	
	} catch (error) {
		
		return false;	
	}
}
