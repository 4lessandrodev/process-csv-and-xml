// import { XMLParser } from "fast-xml-parser";
import { xml2json } from 'xml-js';

describe('xml-converter', () => {

	const specResult = {
		"Transactions": {
			"Transaction": [
				{
				"_attributes": {
					"id": "Inv00001"
				},
				"TransactionDate": {
					"value": "2019-01-23T13:45:10"
					},
					"PaymentDetails": {
					"Amount": {
						"value": "200.00"
					}, "CurrencyCode": {
						"value": "USD"
					}
					},
					"Status": {
					"value": "Done"
				}
			}, {
				"_attributes": {
					"id": "Inv00002"
					},
					"TransactionDate": {
					"value": "2019-01-24T16:09:15"
					},
					"PaymentDetails": {
					"Amount": {
						"value": "10000.00"
						},
						"CurrencyCode": {
						"value": "EUR"
					}
					}, "Status": {
						"value": "Rejected"
					}
				}
			]
		}
	}

	it('should convert', () => {
		const xml = `
		<Transactions>
			<Transaction id="Inv00001">
					<TransactionDate>2019-01-23T13:45:10</TransactionDate>
					<PaymentDetails>
							<Amount>200.00</Amount>
							<CurrencyCode>USD</CurrencyCode>
					</PaymentDetails>
					<Status>Done</Status>
			</Transaction>
			<Transaction id="Inv00002">
					<TransactionDate>2019-01-24T16:09:15</TransactionDate>
					<PaymentDetails>
							<Amount>10000.00</Amount>
							<CurrencyCode>EUR</CurrencyCode>
					</PaymentDetails>
					<Status>Rejected</Status>
			</Transaction>
		</Transactions>
		`;

		const result = xml2json(xml, { compact: true, trim: true, textKey: 'value' })

		const json = JSON.parse(result);

		expect(json).toEqual(specResult);
	})
});
