import { ConflictError } from "../../../infra/GraphQLErrors";
import { Collections } from "../../../infra/types/Collections";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { ObjectId } from "mongodb";
import { ICreateUserInput } from "../../../graphql/types/graphql";

export default async function createUser(
  collections: Collections,
  input: ICreateUserInput
) {
  const userExists = await collections.users.findOne({ email: input.email });
  console.log("CreateUser called with input:", input);
  if (userExists) {
    throw new ConflictError("User already exists");
  }

  const salt = bcrypt.genSaltSync(12);
  const hashedPassword = bcrypt.hashSync(input.password, salt);

  const user: User = {
    _id: new ObjectId(),
    email: input.email,
    name: input.name,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordResetToken: null,
    passwordResetExpiress: null,
  };

  await collections.users.insertOne(user);

  return true;
}
