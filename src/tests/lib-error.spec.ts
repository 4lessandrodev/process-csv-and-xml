import { XMLParser } from "fast-xml-parser";

describe('xml-converter', () => {

const specResult = {
    "Transactions": {
        "Transaction": [
            {
            "TransactionDate": "2019-01-23T13:45:10",
            "PaymentDetails": {
                "Amount": 200,
                "CurrencyCode": "USD"
            },
                "Status": "Done",
                "@_id": "Inv00001",
            },
            {
            "TransactionDate": "2019-01-24T16:09:15", 
            "PaymentDetails": {
                "Amount": 10000,
                "CurrencyCode": "EUR"
            },
                "Status": "Rejected",
                "@_id": "Inv00002"
            }
        ]
    }
}

it('should convert xml to json and get id attribute', () => {
    const xml = `
      <Transactions>
          <Transaction id=”Inv00001”>
          <TransactionDate>2019-01-23T13:45:10</TransactionDate>
              <PaymentDetails>
                  <Amount>200.00</Amount>
                  <CurrencyCode>USD</CurrencyCode>
              </PaymentDetails>
          <Status>Done</Status>
          </Transaction>
          <Transaction id=”Inv00002”>
          <TransactionDate>2019-01-24T16:09:15</TransactionDate>
              <PaymentDetails>
                  <Amount>10000.00</Amount>
                  <CurrencyCode>EUR</CurrencyCode>
              </PaymentDetails>
          <Status>Rejected</Status>
          </Transaction>
      </Transactions>
    `;

    const converter = new XMLParser({
	    ignoreAttributes: false,
	    parseAttributeValue: true
    });
    
    const result = converter.parse(xml);
    
    expect(result).toEqual(specResult);
    })
});