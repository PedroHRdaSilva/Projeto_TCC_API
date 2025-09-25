import gql from "graphql-tag";
import type { GraphQLModule } from "~/graphql/module";
import { ForbiddenError } from "~/infra/GraphQLErrors";
import getTransactionsGroupById from "~/module/transaction/queires/getTransactionsGroupById";

const TransactionsModule: GraphQLModule = {
  typeDefs: gql`
    type TransactionDetailsPagination {
      nodes: [Transaction!]!
      pageInfo: PageInfo!
      totalCount: Int!
    }

    type TransactionGrouped {
      groupBy: ObjectID!
      nodes: [Transaction!]!
    }

    type TransactionGroupedDetailsPagination {
      groups: [TransactionGrouped!]!
      pageInfo: PageInfo!
      totalCount: Int!
    }

    type TransactionsGroupedByCategoryPagination {
      groupBy: ObjectID!
      nodes: [Transaction!]!
      pageInfo: PageInfo!
      totalCount: Int!
    }

    extend type Query {
      transactions(
        groupId: ObjectID!
        filterByPeriod: Date!
        filterByCategoryId: ObjectID
        filterBySearch: String
        cursor: Cursor
        limit: Int = 50
      ): TransactionDetailsPagination!

      #   transactionsGrouped(
      #     groupId: ObjectID!
      #     filterByPeriod: Date!
      #     filterBySearch: String
      #     cursor: Cursor
      #     limit: Int = 50
      #   ): TransactionGroupedDetailsPagination!

      #   transactionsGroupedByCategoryId(
      #     groupId: ObjectID!
      #     filterByPeriod: Date!
      #     filterByCategoryId: ObjectID!
      #     filterBySearch: String
      #     cursor: Cursor
      #     limit: Int = 15
      #   ): TransactionsGroupedByCategoryPagination!
    }
  `,
  resolvers: {
    Query: {
      transactions: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }

        return getTransactionsGroupById(
          ctx.collections,
          args.limit,
          args.groupId,
          args.filterByPeriod,
          args.filterByCategoryId,
          args.filterBySearch,
          args.cursor
        );
      },
    },
  },
};

export default TransactionsModule;
