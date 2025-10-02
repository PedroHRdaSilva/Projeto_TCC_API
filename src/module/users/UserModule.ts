import gql from "graphql-tag";
import createUser from "~/module/users/commands/createUser";
import forgotPassword from "~/module/users/commands/forgotPassword";
import resetPassword from "~/module/users/commands/resetPassword";
import authenticateUser from "~/module/users/commands/authenticateUser";
import { GraphQLModule } from "~/graphql/module";
import getUserById from "~/module/users/queries/getUserById";

const UserModule: GraphQLModule = {
  typeDefs: gql`
    type Viewer {
      _id: ObjectID!
      name: String!
      email: String!
    }

    type AuthenticatedUser {
      email: String!
      accessToken: String!
    }

    input CreateUserInput {
      name: String!
      email: String!
      password: String!
    }

    extend type Query {
      viewer: Viewer
    }

    extend type Mutation {
      loginWithCredentials(
        email: String!
        password: String!
      ): AuthenticatedUser!

      createUser(input: CreateUserInput!): Boolean!
      forgotPassword(email: String!): Boolean!
      resetPassword(token: String!, password: String!): Boolean!
    }
  `,
  resolvers: {
    Query: {
      viewer: async (_source, _args, ctx) => {
        if (!ctx.viewer) {
          return null;
        }

        return getUserById(ctx.collections, ctx.viewer._id);
      },
    },

    Mutation: {
      createUser: async (_source, args, ctx) => {
        return createUser(ctx.collections, args.input);
      },
      forgotPassword: async (_source, args, ctx) => {
        return forgotPassword(ctx.collections, args.email);
      },
      resetPassword: async (_source, args, ctx) => {
        return resetPassword(ctx.collections, args.token, args.password);
      },
      loginWithCredentials: async (_source, args, ctx) => {
        return authenticateUser(ctx.collections, args.email, args.password);
      },
    },
  },
};

export default UserModule;
