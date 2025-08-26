import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";

export default async function getCategoryById(
  collections: Collections,
  categoryId: ObjectId | undefined
) {
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

  return { ...customCategory, isDefault: false };
}
