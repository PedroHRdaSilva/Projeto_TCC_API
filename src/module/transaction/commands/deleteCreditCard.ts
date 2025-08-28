import { GraphQLError } from "graphql";
import type { ObjectId } from "mongodb";
import { NotFoundError } from "~/infra/GraphQLErrors";
import type { Collections } from "~/infra/types/Collections";
import type { Viewer } from "~/infra/types/Viewer";

export default async function deleteCreditCard(
  collections: Collections,
  viewer: Viewer,
  _id: ObjectId
) {
  const creditCard = await collections.creditCard.findOne({
    _id,
    deletedAt: { $exists: false },
  });

  if (!creditCard) {
    throw new NotFoundError();
  }

  const transactions = await collections.transactions.detail
    .find({
      creditCardId: _id,
      deletedAt: { $exists: false },
    })
    .toArray();

  if (transactions.length > 0) {
    throw new GraphQLError("There are transactions linked to this card");
  }

  await collections.creditCard.updateOne(
    { _id },
    {
      $set: {
        deletedBy: viewer._id,
        deletedAt: new Date(),
      },
    }
  );

  return true;
}
