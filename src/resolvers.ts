import { Resolvers } from "./@types/schema.generated";

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    example: () => {
      return 'Hello world!';
    }
  }
}

export default resolvers;
