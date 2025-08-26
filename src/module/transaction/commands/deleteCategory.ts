import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { Viewer } from "../../../infra/types/Viewer";

export default async function deleteCategory(
  collections: Collections,
  viewer: Viewer,
  _id: ObjectId,
  groupId: ObjectId
) {
  //   const transactions = await collections.transactions.details
  //     .find({
  //       categoryId: _id,
  //       deletedAt: { $exists: false },
  //     })
  //     .toArray();

  //   if (transactions.length > 0) {
  //     throw new GraphQLError("There are transactions linked to this category");
  //   }
  const category = await collections.transactions.categories.custom.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!category) {
    throw new GraphQLError("Category custom not found");
  }
  await collections.transactions.categories.custom.updateOne(
    { _id },
    {
      $set: {
        isHidden: true,
        deletedBy: viewer._id,
        deletedAt: new Date(),
      },
    }
  );
  return true;
}
