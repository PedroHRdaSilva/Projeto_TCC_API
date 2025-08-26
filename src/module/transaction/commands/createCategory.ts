import { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { TransactionCategoryCustom } from "../models/TransactionCategory";
import { ICreateCategoryCustomInput } from "../../../graphql/types/graphql";

export default async function createCategory(
  collections: Collections,
  input: ICreateCategoryCustomInput
) {
  const transactionCategory: TransactionCategoryCustom = {
    _id: new ObjectId(),
    iconProperties: {
      background: input.iconProperties.background,
      color: input.iconProperties.color,
      icon: input.iconProperties.icon,
    },
    categoryDefaultId: input.categoryDefaultId || undefined,
    transactionGroupId: input.transactionGroupId,
    description: input.description,
    type: input.type,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collections.transactions.categories.custom.insertOne(
    transactionCategory
  );

  return transactionCategory;
}
