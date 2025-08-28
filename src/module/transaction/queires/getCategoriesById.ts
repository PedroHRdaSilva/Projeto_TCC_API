import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";
import { NotFoundError } from "~/infra/GraphQLErrors";

export default async function getCategoryById(
  collections: Collections,
  categoryId: ObjectId | undefined
) {
  if (!categoryId) throw new NotFoundError();

  const [defaultCategory, customCategory] = await Promise.all([
    collections.transactions.categories.defaults.findOne({
      _id: categoryId,
      deletedAt: { $exists: false },
    }),
    collections.transactions.categories.custom.findOne({
      _id: categoryId,
      deletedAt: { $exists: false },
    }),
  ]);

  if (defaultCategory) {
    return {
      ...defaultCategory,
      isDefault: true,
    };
  }

  if (customCategory) {
    return {
      ...customCategory,
      isDefault: false,
    };
  }

  throw new NotFoundError();
}
