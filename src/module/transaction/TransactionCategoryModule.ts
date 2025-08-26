import gql from "graphql-tag";
import { GraphQLModule } from "../../graphql/module";
import { ForbiddenError, NotFoundError } from "../../infra/GraphQLErrors";
import createCategory from "./commands/createCategory";
import updateCategory from "./commands/updateCategory";
import deleteCategory from "./commands/deleteCategory";
import getCategoryById from "./queires/getCategoriesById";
import getCategoriesByGroupId from "./queires/getCategoriesByGroupId";

const TransactionCategoryModule: GraphQLModule = {
  typeDefs: gql`
    enum TransactionCategoryTypeEnum {
      EARNINGS
      EXPENSES
    }

    type TransactionCategory {
      _id: ObjectID!
      description: String!
      iconProperties: IconProperties!
      type: TransactionCategoryTypeEnum!
      isDefault: Boolean!
    }

    input CreateCategoryDefaultInput {
      description: String!
      iconProperties: IconPropertiesInput!
      type: TransactionCategoryTypeEnum!
    }

    input CreateCategoryCustomInput {
      transactionGroupId: ObjectID!
      categoryDefaultId: ObjectID
      description: String!
      iconProperties: IconPropertiesInput!
      type: TransactionCategoryTypeEnum!
    }

    input UpdateCustomInput {
      transactionGroupId: ObjectID!
      categoryDefaultId: ObjectID
      description: String!
      iconProperties: IconPropertiesInput!
      type: TransactionCategoryTypeEnum!
    }

    extend type Query {
      categoriesByGroupId(
        transactionGroupId: ObjectID!
      ): [TransactionCategory!]!
      categoryById(categoryId: ObjectID!): TransactionCategory
    }

    extend type Mutation {
      createCategory(input: CreateCategoryCustomInput!): TransactionCategory!
      updateCategory(
        _id: ObjectID!
        input: UpdateCustomInput!
      ): TransactionCategory!
      deleteCategory(_id: ObjectID!, groupId: ObjectID!): Boolean
    }
  `,
  resolvers: {
    TransactionCategory: {
      isDefault: (_source) => {
        return _source.categoryDefaultId ? false : true;
      },
    },
    Query: {
      categoryById: async (_source, args, ctx) => {
        if (!ctx.viewer) throw new ForbiddenError();
        return getCategoryById(ctx.collections, args.categoryId);
      },
      categoriesByGroupId: async (_source, args, ctx) => {
        if (!ctx.viewer) throw new ForbiddenError();
        return getCategoriesByGroupId(ctx.collections, args.transactionGroupId);
      },
    },
    Mutation: {
      createCategory: async (_source, args, ctx) => {
        if (!ctx.viewer) throw new ForbiddenError();
        return createCategory(ctx.collections, args.input);
      },
      updateCategory: async (_source, args, ctx) => {
        if (!ctx.viewer) throw new ForbiddenError();
        return updateCategory(ctx.collections, args._id, args.input);
      },
      deleteCategory: async (_source, args, ctx) => {
        if (!ctx.viewer) throw new ForbiddenError();
        return deleteCategory(
          ctx.collections,
          ctx.viewer,
          args._id,
          args.groupId
        );
      },
    },
  },
};

export default TransactionCategoryModule;
