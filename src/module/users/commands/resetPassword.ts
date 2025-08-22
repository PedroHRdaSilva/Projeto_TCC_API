import { Collections } from "../../../infra/types/Collections";
import { UserNotFoundError } from "../../../infra/GraphQLErrors";
import bcrypt from "bcryptjs";

export default async function resetPassword(
  collections: Collections,
  token: string,
  password: string
) {
  const user = await collections.users.findOne({
    passwordResetToken: token,
  });

  if (!user) {
    throw new UserNotFoundError("Token inválido ou usuário não encontrado");
  }

  if (!user.passwordResetExpiress || user.passwordResetExpiress < new Date()) {
    throw new Error("Token expirado. Solicite um novo reset de senha.");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await collections.users.updateOne(
    { _id: user._id },
    {
      $set: {
        password: hashedPassword,
        passwordResetExpiress: null,
        passwordResetToken: null,
      },
    }
  );

  return true;
}
