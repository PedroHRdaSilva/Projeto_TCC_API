import { Collections } from "~/infra/types/Collections";
import { UserNotFoundError } from "~/infra/GraphQLErrors";
import bcrypt from "bcryptjs";
import { Viewer } from "~/infra/types/Viewer";

export default async function updateUserPassword(
  collections: Collections,
  viewer: Viewer,
  password: string
) {
  const user = await collections.users.findOne({
    _id: viewer._id,
  });

  if (!user) {
    throw new UserNotFoundError("Token inválido ou usuário não encontrado");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  return true;
}
