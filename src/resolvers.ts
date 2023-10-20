import { Resolvers } from "./@types/schema.generated";

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    example: () => {
      return 'Hello world!';
    },

    pokemon: (_source: any, { id } :any, { dataSources }: any) => {
      return dataSources.pokemonAPI.getPokemon(id);
    },
  }
}

export default resolvers;
