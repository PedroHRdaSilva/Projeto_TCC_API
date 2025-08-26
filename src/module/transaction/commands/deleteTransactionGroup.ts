import { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { Viewer } from "../../../infra/types/Viewer";
import { NotFoundError } from "../../../infra/GraphQLErrors";

export default async function deleteTransactionGroup(
  collections: Collections,
  viewer: Viewer,
  _id: ObjectId
) {
  const transaction = await collections.transactions.group.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!transaction) {
    throw new NotFoundError();
  }

  await collections.transactions.group.updateOne(
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
