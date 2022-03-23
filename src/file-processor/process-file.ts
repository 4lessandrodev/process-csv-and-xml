import { ReadStream } from "fs";
import { transformFile } from "./transform-file";
import { promisify } from 'util';
import { pipeline } from 'stream';
import writeOnLocal from "../db/write-on-local";
import writeOnMongo from "../db/write-on-mongo";

const pipelineAsync = promisify(pipeline);

export const processFile = async (fileStream: ReadStream, destination: 'Local' | 'Mongo'): Promise<boolean> => {
	try {
		
		const isLocal = destination === 'Local';
		const save = isLocal ? writeOnLocal : writeOnMongo;

		pipelineAsync(
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
