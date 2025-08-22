import type { DocumentNode } from "graphql";
import { IResolvers } from "./types/graphql";

export type GraphQLModule = {
  typeDefs: DocumentNode | string;
  resolvers: IResolvers;
};
