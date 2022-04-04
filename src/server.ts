import express, { Request, Response } from 'express';
import { ReadStream } from 'fs';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

import multer from 'multer';
import { Duplex } from 'stream';

import mongo, { Mongo, MONGO_DB_COLLECTION, MONGO_DB_NAME } from './db/mongo';

import { processFileService } from './process-file.service';
const upload = multer();

server.post('/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
	
	const stream = new Duplex();
	stream.push(req.file?.buffer);
	stream.push(null);
	
	const result = await processFileService(stream as unknown as ReadStream, req.body.destination);
	
	console.log('success to process file');
	
	res.json({ success: result });
});

server.get('/upload', async (req: Request<any, any, any, { limit?: string }>, res: Response): Promise<void> => {
	
	const limit = req.query?.limit ? parseInt(req.query.limit) : 10;

	const conn = await Mongo.init();

	const collection = conn.db(MONGO_DB_NAME).collection(MONGO_DB_COLLECTION);
	
	const docs = await collection.find({},{ limit }).toArray();
	
	const count = await collection.countDocuments();
	
	res.json({ docs, count });
});

server.listen(3000);

const payload = console.log('running on localhost:3000');

server.on('listening',() => payload);

mongo.init();
