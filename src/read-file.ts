import { createReadStream, ReadStream } from 'fs';

export const readFile = async (path: string): Promise<ReadStream> => createReadStream(path, { encoding: 'utf-8' });

export default readFile;
