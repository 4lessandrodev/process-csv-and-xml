import express, { Request, Response } from 'express';
import { ReadStream } from 'fs';
import { Document } from 'mongodb';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

import multer from 'multer';
import { Duplex } from 'stream';

import mongo, { Mongo, MONGO_DB_COLLECTION, MONGO_DB_NAME } from './db/mongo';

import { processFileService } from './process-file.service';
const upload = multer();
mongo.init();

server.post('/upload', upload.single('file'), async (req: Request, res: Response) => {

	const stream = new Duplex();
	stream.push(req.file?.buffer);
	stream.push(null);
	
	await processFileService(stream as unknown as ReadStream, req.body.destination);

	console.log('success to process file');
	
	res.json({ success: true });
});

server.get('/upload', async (req: Request, res: Response) => {
	
	const conn = await Mongo.init();

	const collection = conn.db(MONGO_DB_NAME).collection(MONGO_DB_COLLECTION);

	const findCursor = collection.find({})

	const docs: Document[] = [];

	await findCursor.forEach((col) => { docs.push(col) });

	const count = await collection.countDocuments();
	
	res.json({ docs, count });
});

server.listen(3000);

const payload = console.log('running on localhost:3000');

server.on('listening',() => payload);
