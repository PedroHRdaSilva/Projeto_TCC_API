import gql from "graphql-tag";
import { GraphQLModule } from "~/graphql/module";
import { ForbiddenError } from "~/infra/GraphQLErrors";

import createTransactionGroup from "~/module/transaction/commands/createTransactionGroup";
import updateTransactionGroup from "~/module/transaction/commands/updateTransactionGroup";
import deleteTransactionGroup from "~/module/transaction/commands/deleteTransactionGroup";
import getTransactionGroupById from "~/module/transaction/queires/getTransactionGroupById";
import getTransactionsGroup from "~/module/transaction/queires/getTransactionsGroup";
import userLoader from "~/graphql/loaders/userLoader";

const TransactionGroupModule: GraphQLModule = {
  typeDefs: gql`
    type TransactionGroup {
      _id: ObjectID!
      owner: User!
      iconProperties: IconProperties!
      description: String!
    }
    type User {
      _id: ObjectID!
      name: String!
      email: String!
    }
    type IconProperties {
      background: String!
      color: String!
      icon: String!
    }

    input IconPropertiesInput {
      background: String!
      color: String!
      icon: String!
    }

    input CreateTransactionGroupInput {
      iconProperties: IconPropertiesInput!
      description: String!
    }

    input UpdateTransactionGroupInput {
      iconProperties: IconPropertiesInput!
      description: String!
    }

    extend type Query {
      transactionsGroup(search: String): [TransactionGroup!]!
      transactionGroupById(_id: ObjectID): TransactionGroup
    }

    extend type Mutation {
      createTransactionGroup(
        input: CreateTransactionGroupInput!
      ): TransactionGroup!
      updateTransactionGroup(
        _id: ObjectID!
        input: UpdateTransactionGroupInput!
      ): TransactionGroup!
      deleteTransactionGroup(_id: ObjectID!): Boolean!
    }
  `,
  resolvers: {
    TransactionGroup: {
      owner: async (_source, _args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return userLoader(ctx.viewer._id, ctx.collections);
      },
    },
    Query: {
      transactionsGroup: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return getTransactionsGroup(ctx.collections, ctx.viewer, args.search);
      },
      transactionGroupById: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return getTransactionGroupById(ctx.collections, ctx.viewer, args._id);
      },
    },

    Mutation: {
      createTransactionGroup: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return createTransactionGroup(ctx.collections, ctx.viewer, args.input);
      },
      updateTransactionGroup: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return updateTransactionGroup(ctx.collections, args._id, args.input);
      },
      deleteTransactionGroup: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return deleteTransactionGroup(ctx.collections, ctx.viewer, args._id);
      },
    },
  },
};
export default TransactionGroupModule;
