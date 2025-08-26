import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { InputMaybe } from "../../../graphql/types/graphql";

export default async function getTransactionGroupById(
  collections: Collections,
  _id: InputMaybe<ObjectId> | undefined
) {
  if (_id == undefined) {
    return null;
  }
  const transactionGroup = await collections.transactionGroup.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  return transactionGroup;
}
