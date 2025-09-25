import gql from "graphql-tag";
import type { GraphQLModule } from "~/graphql/module";
import { ForbiddenError } from "~/infra/GraphQLErrors";
import createCreditCard from "~/module/transaction/commands/createCreditCard";
import deleteCreditCard from "~/module/transaction/commands/deleteCreditCard";
import updateCreditCard from "~/module/transaction/commands/updateCreditcard";
import getCreditCardByGroupId from "~/module/transaction/queires/getCreditCardByGroupId";
import getCreditCardById from "~/module/transaction/queires/getCreditCardById";

const CreditCardModule: GraphQLModule = {
  typeDefs: gql`
    type CreditCard {
      _id: ObjectID!
      transactionGroupId: ObjectID!
      description: String!
    }

    input CreditCardInput {
      transactionGroupId: ObjectID!
      description: String!
    }

    extend type Query {
      creditCardById(_id: ObjectID!): CreditCard
      creditCardByGroupId(transactionGroupId: ObjectID!): [CreditCard!]!
    }

    extend type Mutation {
      createCreditCard(input: CreditCardInput!): CreditCard!
      updateCreditCard(_id: ObjectID!, input: CreditCardInput!): CreditCard!
      deleteCreditCard(_id: ObjectID!): Boolean
    }
  `,
  resolvers: {
    Query: {
      creditCardById: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return getCreditCardById(ctx.collections, args._id);
      },
      creditCardByGroupId: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return getCreditCardByGroupId(ctx.collections, args.transactionGroupId);
      },
    },
    Mutation: {
      createCreditCard: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return createCreditCard(ctx.collections, args.input);
      },
      updateCreditCard: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return updateCreditCard(ctx.collections, args._id, args.input);
      },
      deleteCreditCard: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return deleteCreditCard(ctx.collections, ctx.viewer, args._id);
      },
    },
  },
};

export default CreditCardModule;
