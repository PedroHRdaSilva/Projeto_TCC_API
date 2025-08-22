// FUTURE REFACTOR
import { ObjectId } from "mongodb";
import type { ValueNode } from "graphql";
import { GraphQLError, GraphQLScalarType, Kind } from "graphql";

const MONGODB_OBJECTID_REGEX = /^[A-Fa-f0-9]{24}$/;

const ObjectIDScalar = new GraphQLScalarType({
  name: "ObjectID",

  description:
    "A field whose value conforms with the standard MongoDB ObjectID as described here: " +
    "https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c",

  // @ts-ignore
  serialize(value: string) {
    if (!MONGODB_OBJECTID_REGEX.test(value)) {
      throw new TypeError(
        `Value is not a valid MongoDB ObjectID of form: ${value}`
      );
    }

    return value;
  },

  // @ts-ignore
  parseValue(value: string) {
    if (!MONGODB_OBJECTID_REGEX.test(value)) {
      throw new TypeError(
        `Value is not a valid MongoDB ObjectID of form: ${value}`
      );
    }

    return ObjectId.createFromHexString(value);
  },

  // @ts-ignore
  parseLiteral(ast: ValueNode) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as MongoDB ObjectID. Got: ${ast.kind}`
      );
    }

    if (!MONGODB_OBJECTID_REGEX.test(ast.value)) {
      throw new TypeError(
        `Value is not a valid MongoDB ObjectID of form: ${ast.value}`
      );
    }

    return ObjectId.createFromHexString(ast.value);
  },
});

export default ObjectIDScalar;
