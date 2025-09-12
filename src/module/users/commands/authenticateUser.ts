import { compareSync } from "bcryptjs";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { UserNotFoundError } from "~/infra/GraphQLErrors";
import { Collections } from "~/infra/types/Collections";

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
      extensions: { code: "NOT_FOUND" },
    });
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    email: user.email,
    accessToken,
  };
}
