import type { ObjectId } from "mongodb";
import type { ITransactionStatus } from "~/graphql/types/graphql";
import { NotFoundError } from "~/infra/GraphQLErrors";
import type { Collections } from "~/infra/types/Collections";

export default async function transactionStatus(
  collections: Collections,
  _ids: ObjectId[],
  status: ITransactionStatus
) {
  const transactions = await collections.transactions.detail
    .find({ _id: { $in: _ids }, deletedAt: { $exists: false } })
    .toArray();

  if (transactions.length === 0) {
    throw new NotFoundError();
  }

  await collections.transactions.detail.updateMany(
    { _id: { $in: _ids } },
    { $set: { status } }
  );

  return true;
}
