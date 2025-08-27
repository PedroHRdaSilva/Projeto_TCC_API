import type { ObjectId } from "mongodb";
import { Collections } from "~/infra/types/Collections";

export default async function getUserById(
  collections: Collections,
  userId: ObjectId
) {
  const user = await collections.users.findOne({ _id: userId });

  return user;
}
