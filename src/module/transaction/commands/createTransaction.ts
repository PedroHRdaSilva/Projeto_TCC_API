import { addMonths } from "date-fns/addMonths";
import { ObjectId } from "mongodb";
import { ITransactionInput, ITransactionStatus } from "~/graphql/types/graphql";
import { Collections } from "~/infra/types/Collections";
import { Transaction } from "~/module/transaction/models/Transaction";

export default async function createTransaction(
  collections: Collections,
  input: ITransactionInput
) {
  const {
    transactionGroupId,
    installmentCount,
    categoryId,
    amount,
    description,
    creditCardId,
    isRecurringPayment,
  } = input;

  if (!installmentCount) {
    const Transaction: Transaction = {
      _id: new ObjectId(),
      transactionGroupId,
      categoryId,
      amount,
      description,
      isRecurringPayment,
      date: input.date,
      creditCardId: creditCardId || undefined,
      status: ITransactionStatus.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collections.transactions.detail.insertOne(Transaction);

    return [Transaction];
  }

  const installmentsGroupId = new ObjectId();

  const transactions: Transaction[] = Array.from({
    length: installmentCount,
  }).map((_, index) => ({
    _id: new ObjectId(),
    transactionGroupId,
    categoryId,
    amount,
    description,
    isRecurringPayment,
    date: addMonths(input.date, index),
    creditCardId: creditCardId || undefined,
    status: ITransactionStatus.Pending,
    installments: {
      installmentsGroupId,
      total: installmentCount,
      current: index + 1,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await collections.transactions.detail.insertMany(transactions);

  return transactions;
}
