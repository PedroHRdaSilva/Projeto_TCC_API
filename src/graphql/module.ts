import type { DocumentNode } from "graphql";
import { IResolvers } from "~/graphql/types/graphql";

export type GraphQLModule = {
  typeDefs: DocumentNode | string;
  resolvers: IResolvers;
};
