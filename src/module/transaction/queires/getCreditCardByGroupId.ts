import type { ObjectId } from "mongodb";
import type { Collections } from "~/infra/types/Collections";

export default async function getCreditCardByGroupId(
  collections: Collections,
  transactionGroupId: ObjectId | undefined
) {
  const creditCard = await collections.creditCard
    .find({ transactionGroupId, deletedAt: { $exists: false } })
    .toArray();

  return creditCard;
}
