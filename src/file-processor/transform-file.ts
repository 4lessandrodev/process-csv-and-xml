import { Transform, TransformCallback } from "stream";
import convertCsvToJson from "../utils/convert-csv-to-json";
import convertXmlToJson from "../utils/convert-xml-to-json";

export const transformFile = new Transform({
	async transform(chunk: string, _encoding: BufferEncoding, callback: TransformCallback): Promise<void> {

		const isXML = chunk.toString().includes('<Transactions>');
		
		if (isXML) {
			
			const xml = chunk.toString();

			const result = await convertXmlToJson(xml);
			
			return callback(null, JSON.stringify(result));
			
		} else {

			const result = await convertCsvToJson(chunk.toString())
			
			return callback(null, JSON.stringify(result));
		}

	}
});
