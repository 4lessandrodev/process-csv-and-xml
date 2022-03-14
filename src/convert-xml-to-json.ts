import { xml2json } from "xml-js";
import { IResult, IXmlToJsonPayload } from "./interfaces";
import { translateXmlFields } from "./translate-fields";

export const convertXmlToJson = async (chunk: string): Promise<IResult> => {

	const resultString = xml2json(chunk, { compact: true, trim: true, textKey: 'value' });

	const jsonData: IXmlToJsonPayload = JSON.parse(resultString);

	const values = jsonData.Transactions.Transaction;

	const result = values.map((data) => translateXmlFields(data));

	return { data : result }
}

export default convertXmlToJson;
