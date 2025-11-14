import type { ObjectId } from "mongodb";
import { NotFoundError } from "~/infra/GraphQLErrors";
import type { Collections } from "~/infra/types/Collections";
import type { Viewer } from "~/infra/types/Viewer";

export default async function deleteTransaction(
  collections: Collections,
  viewer: Viewer,
  _ids: ObjectId[]
) {
  console.log("chegou aquii");
  const transactions = await collections.transactions.detail
    .find({ _id: { $in: _ids }, deletedAt: { $exists: false } })
    .toArray();

  if (transactions.length === 0) {
    throw new NotFoundError();
  }

  const installmentGroupIds = transactions
    .filter((t) => t.installments?.installmentsGroupId)
    .map((t) => t.installments?.installmentsGroupId);

  if (installmentGroupIds.length > 0) {
    await collections.transactions.detail.updateMany(
      {
        "installments.installmentsGroupId": { $in: installmentGroupIds },
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

  await collections.transactions.detail.updateMany(
    { _id: { $in: _ids } },
    {
      $set: {
        deletedBy: viewer._id,
        deletedAt: new Date(),
      },
    }
  );

  return true;
}
