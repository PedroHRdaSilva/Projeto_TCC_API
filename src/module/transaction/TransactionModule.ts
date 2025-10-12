import gql from "graphql-tag";
import { GraphQLModule } from "~/graphql/module";
import { ForbiddenError, NotFoundError } from "~/infra/GraphQLErrors";
import createTransaction from "~/module/transaction/commands/createTransaction";
import deleteTransaction from "~/module/transaction/commands/deleteTransaciton";
import transactionStatus from "~/module/transaction/commands/transactionStatus";
import updateTransaction from "~/module/transaction/commands/updateTransaction";
import getCategoryById from "~/module/transaction/queires/getCategoriesById";
import getCreditCardById from "~/module/transaction/queires/getCreditCardById";

const TransactionModule: GraphQLModule = {
  typeDefs: gql`
    enum TransactionStatus {
      PENDING
      PAID
    }
    type Installments {
      total: Int!
      current: Int!
    }
    type Transaction {
      _id: ObjectID!
      transactionGroupId: ObjectID!
      category: TransactionCategory!
      date: Date!
      description: String!
      amount: Float!
      installments: Installments
      creditCard: CreditCard
      isRecurringPayment: Boolean!
      status: TransactionStatus
    }

    extend type Query {
      transactionById(_id: ObjectID!): Transaction
    }

    input TransactionInput {
      transactionGroupId: ObjectID!
      categoryId: ObjectID!
      date: Date!
      amount: Float!
      description: String!
      isRecurringPayment: Boolean!
      creditCardId: ObjectID
      installmentCount: Int
    }
    extend type Mutation {
      createTransaction(input: TransactionInput!): [Transaction!]!

      updateTransaction(_id: ObjectID!, input: TransactionInput!): Transaction

      deleteTransaction(_id: ObjectID!): Boolean!
      transactionStatus(_id: [ObjectID!]!, status: TransactionStatus!): Boolean!
    }
  `,
  resolvers: {
    Transaction: {
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
      creditCard: async (source, _args, ctx) => {
        if (!source.creditCardId) {
          return null;
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
    },
    Mutation: {
      transactionStatus: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return transactionStatus(ctx.collections, args._id, args.status);
      },
      createTransaction: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return createTransaction(ctx.collections, args.input);
      },
      updateTransaction: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return updateTransaction(
          ctx.collections,
          ctx.viewer,
          args._id,
          args.input
        );
      },
      deleteTransaction: async (_source, args, ctx) => {
        if (!ctx.viewer) {
          throw new ForbiddenError();
        }
        return deleteTransaction(ctx.collections, ctx.viewer, args._id);
      },
    },
  },
};

export default TransactionModule;
