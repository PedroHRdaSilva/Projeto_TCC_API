import type { ObjectId } from "mongodb";
import { Collections } from "../../../infra/types/Collections";

export default async function getCategoriesByGroupId(
  collections: Collections,
  transactionGroupId: ObjectId | undefined
) {
  const [defaultCategories, customCategories] = await Promise.all([
    collections.transactions.categories.defaults.find().toArray(),
    collections.transactions.categories.custom
      .find({
        transactionGroupId,
        deletedAt: { $exists: false },
      })
      .toArray(),
  ]);

  const defaultCategoriesCustomized = customCategories.filter(
    (node) => node.categoryDefaultId
  );

  const defaultCategoriesFiltred = defaultCategories
    .filter(
      (category) =>
        !defaultCategoriesCustomized.find((node) =>
          node.categoryDefaultId?.equals(category._id)
        )
    )
    .map((node) => ({
      ...node,
      isDefault: true,
    }));

  return [
    ...defaultCategoriesFiltred,
    ...customCategories
      .filter((node) => !node.isHidden)
      .map((node) => ({
        ...node,
        isDefault: false,
      })),
  ];
}
