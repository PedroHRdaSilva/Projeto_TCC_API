import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { NotFoundError } from "../../../infra/GraphQLErrors";
import stripUndefined from "../../../utils/stripUndefined";
import { IUpdateTransactionGroupInput } from "../../../graphql/types/graphql";

export default async function updateTransactionGroup(
  collections: Collections,
  _id: ObjectId,
  input: IUpdateTransactionGroupInput
) {
  const transactionGroup = await collections.transactions.group.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!transactionGroup) {
    throw new NotFoundError();
  }

  const newValues = stripUndefined({
    iconProperties: {
      background: input.iconProperties.background,
      color: input.iconProperties.color,
      icon: input.iconProperties.icon,
    },
    description: input.description || undefined,
  });

  await collections.transactions.group.updateOne(
    { _id },
    {
      $set: {
        ...newValues,
        updatedAt: new Date(),
      },
    }
  );

  return {
    ...transactionGroup,
    ...newValues,
  };
}
