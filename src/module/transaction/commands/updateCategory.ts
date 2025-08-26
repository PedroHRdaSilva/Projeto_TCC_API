import { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { IUpdateCustomInput } from "../../../graphql/types/graphql";
import { TransactionCategoryCustom } from "../models/TransactionCategory";
import { NotFoundError } from "../../../infra/GraphQLErrors";
import stripUndefined from "../../../utils/stripUndefined";

export default async function updateCategory(
  collections: Collections,
  _id: ObjectId,
  input: IUpdateCustomInput
) {
  const category = await collections.transactions.categories.custom.findOne({
    _id,
    deletedAt: {
      $exists: false,
    },
  });

  if (!category) {
    throw new NotFoundError();
  }

  const newValues = stripUndefined({
    iconProperties: {
      background: input.iconProperties.background,
      color: input.iconProperties.color,
      icon: input.iconProperties.icon,
    },
    categoryDefaultId: input.categoryDefaultId || undefined,
    transactionGroupId: input.transactionGroupId,
    description: input.description,
    type: input.type,
  });

  await collections.transactions.categories.custom.updateOne(
    { _id },
    {
      $set: {
        ...newValues,
        updatedAt: new Date(),
      },
    }
  );

  return {
    ...category,
    ...newValues,
  };
}
