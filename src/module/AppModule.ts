import gql from "graphql-tag";

const AppModule = {
  typeDefs: gql`
    type Query {
      now: BigInt
    }

    type Mutation {
      now: BigInt
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `,
  resolvers: {
    Query: {
      now: () => Date.now(),
    },
    Mutation: {
      now: () => Date.now(),
    },
  },
};

export default AppModule;
