import gql from "graphql-tag";
import type { GraphQLModule } from "~/graphql/module";
import { ForbiddenError } from "~/infra/GraphQLErrors";
import getGroupTransactionTotals from "~/module/transaction/queires/getTansactionTotals";

const TransactionTotalsModule: GraphQLModule = {
  typeDefs: gql`
    type TransactionsTotalize {
      total: Float!
      percentageVariation: Float!
    }

    type TransactionsTotals {
      revenue: TransactionsTotalize!
      expense: TransactionsTotalize!
      balance: TransactionsTotalize!
    }

    extend type Query {
      transactionTotals(
        groupId: ObjectID!
        filterByPeriod: Date!
        filterByCategoryId: ObjectID
        filterBySearch: String
      ): TransactionsTotals
    }
  `,
  resolvers: {
    Query: {
      transactionTotals: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return getGroupTransactionTotals(
          ctx.collections,
          args.groupId,
          args.filterByPeriod,
          args.filterByCategoryId,
          args.filterBySearch
        );
      },
    },
  },
};

export default TransactionTotalsModule;
