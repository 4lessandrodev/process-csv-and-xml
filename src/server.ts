import express, { Request, Response } from 'express';
import { ReadStream } from 'fs';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
import multer from 'multer';
import { Duplex } from 'stream';
import mongo from './db/mongo';
import { processFileService } from './process-file.service';
const upload = multer();
mongo.init();

server.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
	console.log(req.file?.buffer.toString());

	const stream = new Duplex();
	stream.push(req.file?.buffer);
	stream.push(null);
	
	await processFileService(stream as unknown as ReadStream, req.body.destination);

	console.log('success to process file');
	
	res.json({ success: true });
})

server.listen(3000);

const payload = console.log('running on localhost:3000');

server.on('listening',() => payload);
