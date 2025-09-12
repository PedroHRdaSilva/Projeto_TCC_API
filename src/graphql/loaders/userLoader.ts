import type { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";
import type { Collections } from "~/infra/types/Collections";

export default async function userLoader(
  _id: ObjectId,
  collections: Collections
) {
  const user = await collections.users.findOne({ _id });

  if (!user) {
    throw new GraphQLError(`User with id ${_id} not found`, {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  return user;
}
