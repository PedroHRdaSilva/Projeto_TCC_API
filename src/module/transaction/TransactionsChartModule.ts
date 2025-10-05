import gql from "graphql-tag";
import type { GraphQLModule } from "~/graphql/module";
import { ForbiddenError, NotFoundError } from "~/infra/GraphQLErrors";
import getCardCategorySpending from "~/module/transaction/queires/getCardCategorySpending";
import getCategoryById from "~/module/transaction/queires/getCategoriesById";
import getCreditCardById from "~/module/transaction/queires/getCreditCardById";
import getMonthlyRevenueVsExpenses from "~/module/transaction/queires/getMonthlyRevenueVsExpenses";
import getMonthlySpendingByCategory from "~/module/transaction/queires/getMonthlySpendingByCategory";

const TransactionsChartModule: GraphQLModule = {
  typeDefs: gql`
    type TransactionsChart {
      reportDate: Date!
      revenue: Float!
      expense: Float!
      transactions: [Transaction!]!
    }
    type TransactionsByCategoryChart {
      reportDate: Date!
      amount: Float!
      category: TransactionCategory!
      transactions: [Transaction!]
    }
    type TransactionsCardCategorySpending {
      reportDate: Date!
      amount: Float!
      category: TransactionCategory!
      transactions: [Transaction!]
      creditCard: CreditCard!
    }

    type Query {
      monthlyRevenueVsExpenses(
        groupId: ObjectID!
        filterByStartMonth: Date
        filterByEndMonth: Date
      ): [TransactionsChart!]!
      monthlySpendingByCategory(
        groupId: ObjectID!
        filterByStartMonth: Date
        filterByEndMonth: Date
      ): [TransactionsByCategoryChart!]!
      cardCategorySpending(
        groupId: ObjectID!
        filterByStartMonth: Date
        filterByEndMonth: Date
      ): [TransactionsCardCategorySpending!]!
    }
  `,
  resolvers: {
    TransactionsByCategoryChart: {
      category: async (source, _args, ctx) => {
        const category = await getCategoryById(
          ctx.collections,
          source.categoryId
        );

        if (!category) {
          throw new NotFoundError();
        }

        return category;
      },
    },
    TransactionsCardCategorySpending: {
      creditCard: async (source, _args, ctx) => {
        if (!source.creditCardId) {
          throw new NotFoundError();
        }

        const creditCard = await getCreditCardById(
          ctx.collections,
          source.creditCardId
        );

        if (!creditCard) {
          throw new NotFoundError();
        }

        return creditCard;
      },
      category: async (source, _args, ctx) => {
        const category = await getCategoryById(
          ctx.collections,
          source.categoryId
        );

        if (!category) {
          throw new NotFoundError();
        }

        return category;
      },
    },
    Query: {
      monthlyRevenueVsExpenses: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return getMonthlyRevenueVsExpenses(
          ctx.collections,
          args.groupId,
          args.filterByStartMonth,
          args.filterByEndMonth
        );
      },
      monthlySpendingByCategory: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return getMonthlySpendingByCategory(
          ctx.collections,
          args.groupId,
          args.filterByStartMonth,
          args.filterByEndMonth
        );
      },
      cardCategorySpending: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return getCardCategorySpending(
          ctx.collections,
          args.groupId,
          args.filterByStartMonth,
          args.filterByEndMonth
        );
      },
    },
    Mutation: {},
  },
};

export default TransactionsChartModule;
