import { ObjectId } from "mongodb";
import { ITransactionInput } from "~/graphql/types/graphql";
import { NotFoundError } from "~/infra/GraphQLErrors";
import { Collections } from "~/infra/types/Collections";
import { Viewer } from "~/infra/types/Viewer";
import createTransaction from "~/module/transaction/commands/createTransaction";

import stripUndefined from "~/utils/stripUndefined";

export default async function updateTransaction(
  collections: Collections,
  viewer: Viewer,
  _id: ObjectId,
  input: ITransactionInput
) {
  const transaction = await collections.transactions.detail.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!transaction) {
    throw new NotFoundError();
  }

  if (!transaction.installments) {
    const newValues = stripUndefined({
      transactionGroupId: input.transactionGroupId,
      categoryId: input.categoryId,
      date: input.date,
      amount: input.amount,
      description: input.description,
      isRecurringPayment: input.isRecurringPayment,
      creditCardId: input.creditCardId || undefined,
    });

    await collections.transactions.detail.updateOne(
      { _id },
      {
        $set: {
          ...newValues,
          updatedAt: new Date(),
        },
      }
    );

    return {
      ...transaction,
      ...newValues,
    };
  }

  collections.transactions.detail.updateMany(
    {
      transactionGroupId: transaction.transactionGroupId,
      "installments.installmentsGroupId":
        transaction.installments.installmentsGroupId,
    },
    {
      $set: {
        deletedAt: new Date(),
        deletedBy: viewer._id,
      },
    }
  );

  const [transactions] = await createTransaction(collections, input);

  return transactions;
}
