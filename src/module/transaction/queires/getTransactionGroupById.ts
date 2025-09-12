import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { InputMaybe } from "../../../graphql/types/graphql";
import { Viewer } from "~/infra/types/Viewer";

export default async function getTransactionGroupById(
  collections: Collections,
  viewer: Viewer,
  _id: InputMaybe<ObjectId> | undefined
) {
  const transactionGroupIdResolved = await getActiveGroupId(
    collections,
    viewer,
    _id
  );
  const transactionGroup = await collections.transactions.group.findOne({
    _id: transactionGroupIdResolved,
    deletedAt: { $exists: false },
  });

  return transactionGroup;
}
async function getActiveGroupId(
  collections: Collections,
  viewer: Viewer,
  transactionGroupId: InputMaybe<ObjectId> | undefined
) {
  if (transactionGroupId) {
    return transactionGroupId;
  }

  // if (viewer.settings.defaults.transactionGroupId) {
  //   return viewer.settings.defaults.transactionGroupId;
  // }

  const activeGroup = await collections.transactions.group
    .find({
      ownerId: viewer._id,
      deletedAt: {
        $exists: false,
      },
    })
    .sort({
      createdAt: -1,
    })
    .limit(1)
    .toArray();

  const [group] = activeGroup;

  return group?._id;
}
