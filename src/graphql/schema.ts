import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import modules from "../module";

const resolvers = Object.assign(
  {},
  ...modules.map((m) => m.resolvers).filter(Boolean)
);

const schema = makeExecutableSchema({
  typeDefs: [...modules.map(({ typeDefs }) => typeDefs), ...scalarTypeDefs],
  resolvers,
  resolverValidationOptions: {},
});

export default schema;
