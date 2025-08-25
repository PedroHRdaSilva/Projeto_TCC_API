import { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { Viewer } from "../../../infra/types/Viewer";

import { TransactionGroup } from "../models/TransactionGroup";
import { ICreateTransactionGroupInput } from "../../../graphql/types/graphql";

export default async function createTransactionGroup(
  collections: Collections,
  viewer: Viewer,
  input: ICreateTransactionGroupInput
) {
  const transactionGroup: TransactionGroup = {
    _id: new ObjectId(),
    iconProperties: {
      background: input.iconProperties.background,
      color: input.iconProperties.color,
      icon: input.iconProperties.icon,
    },
    description: input.description,
    ownerId: viewer._id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collections.transactionGroup.insertOne(transactionGroup);

  return transactionGroup;
}
