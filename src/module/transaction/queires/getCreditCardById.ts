import type { ObjectId } from "mongodb";
import type { Collections } from "~/infra/types/Collections";

export default async function getCreditCardById(
  collections: Collections,
  creditCardId: ObjectId | undefined
) {
  const creditCard = await collections.creditCard.findOne({
    _id: creditCardId,
  });

  return creditCard;
}
