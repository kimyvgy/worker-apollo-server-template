import { gql } from "apollo-server-cloudflare";

const schema = gql`
  type Query {
    example: String!
  }
`;

export default schema;
