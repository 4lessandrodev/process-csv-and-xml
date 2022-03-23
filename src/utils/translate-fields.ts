import { ICSVFields, ITransactionModel, IXMLFields } from "../interfaces"

export const translateCsvFields = (data: ICSVFields): ITransactionModel => {
	return {
		Transaction: data.field1,
		Amount: data.field2,
		CurrencyCode: data.field3,
		TransactionDate: data.field4,
		Status: data.field5,
	}
}

export const translateXmlFields = (data: IXMLFields): ITransactionModel => {
	return {
		Transaction: data._attributes.id,
		Amount: data.PaymentDetails.Amount.value,
		CurrencyCode: data.PaymentDetails.CurrencyCode.value,
		TransactionDate: data.TransactionDate.value,
		Status: data.Status.value,
	}
}
