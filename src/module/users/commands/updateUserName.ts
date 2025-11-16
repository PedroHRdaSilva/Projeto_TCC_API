import { Collections } from "~/infra/types/Collections";
import { UserNotFoundError } from "~/infra/GraphQLErrors";

import { Viewer } from "~/infra/types/Viewer";

export default async function updateUserName(
  collections: Collections,
  viewer: Viewer,
  name: string
) {
  const user = await collections.users.findOne({ _id: viewer._id });

  if (!user) {
    throw new UserNotFoundError("Usuário não encontrado");
  }

  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        name: name,
      },
    }
  );

  return true;
}
