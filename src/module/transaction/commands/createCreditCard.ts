import { ObjectId } from "mongodb";
import type { ICreditCardInput } from "~/graphql/types/graphql";
import type { Collections } from "~/infra/types/Collections";
import { CreditCard } from "~/module/transaction/models/CreditCard";

export default async function createCreditCard(
  collections: Collections,
  input: ICreditCardInput
) {
  const creditCard: CreditCard = {
    _id: new ObjectId(),
    transactionGroupId: input.transactionGroupId,
    description: input.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collections.creditCard.insertOne(creditCard);

  return creditCard;
}
