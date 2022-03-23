import csv from "csvtojson";
import { IResult, ITransactionModel } from "../interfaces";
import { translateCsvFields } from "./translate-fields";

export const convertCsvToJson = async (chunk: string): Promise<IResult> => {
	const converter = csv({ noheader: true });

	const result:ITransactionModel[] = []

	converter.on('data', (data)=>{
		const transaction = translateCsvFields(JSON.parse(data.toString()));
		result.push(transaction);
	});

	await converter.fromString(chunk);

	return { data : result }
}

export default convertCsvToJson;
