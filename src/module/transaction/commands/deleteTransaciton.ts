import type { ObjectId } from "mongodb";
import { NotFoundError } from "~/infra/GraphQLErrors";
import type { Collections } from "~/infra/types/Collections";
import type { Viewer } from "~/infra/types/Viewer";

export default async function deleteTransaction(
  collections: Collections,
  viewer: Viewer,
  _id: ObjectId
) {
  const transaction = await collections.transactions.detail.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!transaction) {
    throw new NotFoundError();
  }

  if (transaction.installments) {
    const { installmentsGroupId } = transaction.installments;

    await collections.transactions.detail.updateMany(
      {
        "installments.installmentsGroupId": installmentsGroupId,
        deletedAt: { $exists: false },
      },
      {
        $set: {
          deletedBy: viewer._id,
          deletedAt: new Date(),
        },
      }
    );
  }

  await collections.transactions.detail.updateOne(
    { _id },
    {
      $set: {
        deletedBy: viewer._id,
        deletedAt: new Date(),
      },
    }
  );

  return true;
}
