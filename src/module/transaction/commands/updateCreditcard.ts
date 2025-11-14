import type { ObjectId } from "mongodb";
import type { ICreditCardInput } from "~/graphql/types/graphql";
import { NotFoundError } from "~/infra/GraphQLErrors";
import type { Collections } from "~/infra/types/Collections";
import stripUndefined from "~/utils/stripUndefined";

export default async function updateCreditCard(
  collections: Collections,
  _id: ObjectId,
  input: ICreditCardInput
) {
  const creditCard = await collections.creditCard.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!creditCard) {
    throw new NotFoundError();
  }

  const newValues = stripUndefined({
    transactionGroupId: input.transactionGroupId,
    description: input.description,
    limit: input.limit,
    validity: input.validity,
  });

  await collections.creditCard.updateOne(
    { _id },
    {
      $set: {
        ...newValues,
        updatedAt: new Date(),
      },
    }
  );

  return {
    ...creditCard,
    ...newValues,
  };
}
