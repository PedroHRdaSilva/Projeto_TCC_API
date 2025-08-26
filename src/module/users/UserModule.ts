import gql from "graphql-tag";
import createUser from "./commands/createUser";
import forgotPassword from "./commands/forgotPassword";
import resetPassword from "./commands/resetPassword";
import authenticateUser from "./commands/authenticateUser";
import { GraphQLModule } from "../../graphql/module";

const UserModule: GraphQLModule = {
  typeDefs: gql`
    type Viewer {
      _id: ObjectID!
      name: String!
      email: String!
      isAdmin: Boolean!
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
      loginWithCredentials(email: String!, password: String!): Boolean!

      createUser(input: CreateUserInput!): Boolean!
      forgotPassword(email: String!): Boolean!
      resetPassword(token: String!, password: String!): Boolean!
    }
  `,
  resolvers: {
    Query: {},

    Mutation: {
      createUser: async (_source, args, ctx) => {
        console.log("CTX dentro do resolver:", ctx);
        console.log("Args recebidos:", args);
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
