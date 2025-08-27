import { GraphQLError } from "graphql";
import { Collections } from "~/infra/types/Collections";
import { compareSync } from "bcryptjs";
import { UserNotFoundError } from "~/infra/GraphQLErrors";

export default async function authenticateUser(
  collections: Collections,
  email: string,
  password: string
) {
  const user = await collections.users.findOne({ email });

  if (!user) {
    throw new UserNotFoundError();
  }

  if (!compareSync(password, user.password)) {
    throw new GraphQLError("Invalid credentials", {
      extensions: {
        code: "NOT_FOUND",
      },
    });
  }

  return true;
}
