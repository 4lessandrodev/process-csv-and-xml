
export interface IXMLFields {
	_attributes: {
		id: string
	},
	TransactionDate: {
		value: string
	},
	PaymentDetails: {
		Amount: {
			value: string
		},
		CurrencyCode: {
			value: string
		}
	},
	Status: {
		value: string
	}
}

export interface ITransactionModel {
	Transaction: string;
	Amount: string;
	CurrencyCode: string;
	TransactionDate: string;
	Status: string;
}

export interface IResult {
	data: ITransactionModel[]
}

export interface IXmlToJsonPayload {
	Transactions: {
		Transaction: IXMLFields[]
	} 
}

export interface ICSVFields {
	field1: string;
	field2: string;
	field3: string;
	field4: string;
	field5: string;
}
