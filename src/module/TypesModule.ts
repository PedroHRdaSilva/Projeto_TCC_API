import gql from "graphql-tag";
import { GraphQLModule } from "~/graphql/module";

const TypesModule: GraphQLModule = {
  typeDefs: gql`
    type PageInfo {
      cursor: Cursor
      hasNextPage: Boolean!
      totalCount: Int!
    }

    type ObjectKeyValue {
      key: String!
      value: String!
    }

    input ObjectKeyValueInput {
      key: String!
      value: String!
    }
  `,
  resolvers: {},
};

export default TypesModule;
