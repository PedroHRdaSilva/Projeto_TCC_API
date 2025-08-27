import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import modules from "~/module";
import { merge } from "immutable";

const schema = makeExecutableSchema({
  typeDefs: [...modules.map(({ typeDefs }) => typeDefs), ...scalarTypeDefs],
  resolvers: merge(modules.map(({ resolvers }) => resolvers)),
  resolverValidationOptions: {},
});

export default schema;
